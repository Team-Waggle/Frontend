import type { PostRow } from '../constants/ProfilePostColumns';
import { industries } from '../constants/formOptions';
import { isClosedKST } from './dateKST';

export type TabKey = 'postManagement' | 'applicantManagement' | 'memberManagement';
export type SortKey = 'status' | 'deadline' | 'industry' | 'applicants';

export type SortItem = { id: SortKey; label: string };

export const sortItemsByTab: Record<TabKey, SortItem[]> = {
  postManagement: [
    { id: 'status',   label: '진행 상태' },
    { id: 'deadline', label: '마감일' },
    { id: 'industry', label: '산업 분야' },
  ],
  applicantManagement: [
    { id: 'deadline',   label: '마감일' },
    { id: 'applicants', label: '지원자 수' },
    { id: 'industry',   label: '산업 분야' },
  ],
  memberManagement: [
    { id: 'status',   label: '진행 상태' },
    { id: 'deadline', label: '마감일' },
    { id: 'industry', label: '산업 분야' },
  ],
};

const KO = 'ko-KR';
const industryMap: Map<string, string> = new Map(industries.map(o => [o.id, o.label]));

function parseDateLoose(input: unknown): Date | null {
  if (input == null) return null;

  if (input instanceof Date) {
    return Number.isFinite(input.valueOf()) ? input : null;
  }

  if (typeof input === 'number') {
    const d = new Date(input);
    return Number.isFinite(d.valueOf()) ? d : null;
  }

  const s = String(input).trim();
  if (!s) return null;

  const direct = new Date(s);
  if (Number.isFinite(direct.valueOf())) return direct;

  const cleaned = s.replace(/[^\d./-]/g, '');
  const norm = cleaned.replace(/[\/.]/g, '-');
  const m = norm.match(/(\d{2,4})-(\d{1,2})-(\d{1,2})/);
  if (!m) return null;

  let year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);

  if (year < 100) {
    year = year >= 70 ? 1900 + year : 2000 + year;
  }
  // 월/일 보정
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;

  const d2 = new Date(year, month - 1, day, 12);
  return Number.isFinite(d2.valueOf()) ? d2 : null;
}

// 날짜(ms) 계산
function getDeadlineMs(row: any): number {
  const raw = row?.deadline ?? row?.dueDate ?? row?.endDate ?? row?.closingDate;
  const d = parseDateLoose(raw);
  return d ? d.getTime() : Number.POSITIVE_INFINITY;
}

// 마감 여부 계산
export function isClosedByRow(row: any, nowMs = Date.now()): boolean {
  const ms = getDeadlineMs(row);
  return ms < nowMs;
}

// 화면상의 제목
export function toTitle(row: any): string {
  return String(row?.title ?? row?.name ?? '').trim();
}

// 지원자 수 숫자
export function toApplicantsCount(row: any): number {
  const raw =
    row?.applicantsCount ??
    row?.candidateCount ??
    (Array.isArray(row?.applicants) ? row.applicants.length : row?.applicants);
  if (typeof raw === 'number') return raw;
  const n = String(raw ?? '').replace(/[^\d]/g, '');
  return n ? parseInt(n, 10) : 0;
}

// 산업 분야
export function toDisplayIndustry(v: unknown): string {
  if (Array.isArray(v)) {
    const labels = v.map(x => toDisplayIndustry(x)).filter(Boolean);
    return Array.from(new Set(labels)).sort((a, b) => a.localeCompare(b, KO)).join(', ');
  }
  if (typeof v === 'string') return industryMap.get(v) ?? v;
  return '';
}

// 진행 상태
export function toDisplayStatus(row: any, nowMs = Date.now()): '진행중' | '마감' {
  return isClosedByRow(row, nowMs) ? '마감' : '진행중';
}

/*

정렬 함수

*/

// 마감일 오름차순 정렬
export function compareByDeadlineAsc(a: PostRow, b: PostRow): number {
  return getDeadlineMs(a) - getDeadlineMs(b);
}

// 마감일 내림차순 정렬
export function compareByDeadlineDesc(a: PostRow, b: PostRow): number {
  const ma = getDeadlineMs(a);
  const mb = getDeadlineMs(b);
  const AINF = ma === Number.POSITIVE_INFINITY;
  const BINF = mb === Number.POSITIVE_INFINITY;
  if (AINF && BINF) return 0;
  if (AINF) return 1;
  if (BINF) return -1;
  return mb - ma;
}

// 산업 분야 가나다순
export function compareByIndustryLabel(a: PostRow, b: PostRow): number {
  return toDisplayIndustry((a as any).industry).localeCompare(
    toDisplayIndustry((b as any).industry),
    KO,
  );
}

// 지원자 수 내림차순
export function compareByApplicantsDesc(a: PostRow, b: PostRow): number {
  return toApplicantsCount(b) - toApplicantsCount(a);
}

// 진행 순서 정렬
export function compareByStatusOpenFirst(a: PostRow, b: PostRow): number {
  const aOpen = !isClosedByRow(a);
  const bOpen = !isClosedByRow(b);
  if (aOpen === bOpen) return 0;
  return aOpen ? -1 : 1;
}

export function processPosts(rows: PostRow[], sortKey: SortKey, searchText: string): PostRow[] {
  const term = (searchText ?? '').trim();

  let list = rows.filter((row) => {
    if (!term) return true;
    return toTitle(row).includes(term);
  });

  switch (sortKey) {
    case 'deadline':
      list = list.slice().sort(
        (a, b) =>
          compareByDeadlineDesc(a, b) ||
          compareByIndustryLabel(a, b) ||
          toTitle(a).localeCompare(toTitle(b), KO),
      );
      break;

    case 'industry':
      list = list.slice().sort(
        (a, b) =>
          compareByIndustryLabel(a, b) ||
          compareByDeadlineAsc(a, b) ||
          toTitle(a).localeCompare(toTitle(b), KO),
      );
      break;

    case 'applicants':
      list = list.slice().sort(
        (a, b) =>
          compareByStatusOpenFirst(a, b) ||
          compareByApplicantsDesc(a, b) ||
          compareByDeadlineAsc(a, b),
      );
      break;

    case 'status':
    default:
      list = list.slice().sort(
        (a, b) =>
          compareByStatusOpenFirst(a, b) ||
          compareByDeadlineAsc(a, b) ||
          compareByIndustryLabel(a, b),
      );
      break;
  }

  return list;
}

export function isRowClosedForUI(row: { deadline?: string; status?: string }) {
    if (row.status === '마감') return true;

    if (!row.deadline) return false;
    return isClosedKST(row.deadline);
}
export function normalizeDeadline(input: unknown): string | undefined {
  const d = parseDateLoose(input);
  return d ? d.toISOString() : undefined;
}