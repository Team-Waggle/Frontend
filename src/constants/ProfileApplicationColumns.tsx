import type { ColumnDef, CellCtx } from '../types/table';
import BaseTag from '../components/common/Tag/BaseTag';
import SkillIcons from '../components/SkillIcons';
import { IconActions } from '../components/common/Table/cells/IconActions';

import EmailIc from '../assets/icons/profile/ic_email.svg?react';
import LinkIc from '../assets/icons/profile/ic_link.svg?react';
import TrashIc from '../assets/icons/profile/ic_trashcan.svg?react';
import CheckIc from '../assets/icons/ic_check.svg?react';
import { skillIconMapper } from '../utils/skillIconMapper';
import { isClosedKST } from '../utils/dateKST';
import { industries } from './formOptions';
import { Link } from 'react-router-dom';

export type AppliedRow = {
  id: string;
  status?: string;
  deadline?: string;
  industry?: string | string[];
  title?: string;
  skills?: string[];
};
export type JoinProposalRow = Omit<AppliedRow, 'status'>;
export type JoinedRow = Omit<AppliedRow, 'status'>;

const industryLabelMap: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  industries.forEach((it: any) => {
    const k = String(it?.id ?? it?.value ?? it?.key ?? it?.code ?? '')
      .trim()
      .toUpperCase();
    const label = String(it?.label ?? it?.name ?? '').trim();
    if (k && label) map[k] = label;
  });
  return map;
})();

const toIndustryLabel = (raw?: string | string[]): string | string[] => {
  if (!raw) return '';
  const toLabel = (s: string) => {
    const key = String(s).trim().toUpperCase();
    return industryLabelMap[key] ?? s;
  };
  return Array.isArray(raw) ? raw.map(toLabel) : toLabel(raw);
};

const renderIndustry = (value: any) => (
  <span>{Array.isArray(value) ? value.join(', ') : String(value ?? '')}</span>
);

export const isClosedPost = (deadline?: string) => isClosedKST(deadline);

// 지원 완료
export const appliedColumns: ColumnDef<AppliedRow>[] = [
  {
    key: 'status',
    header: '진행 상태',
    variant: 'fixed',
    accessor: (r) => {
      const expired = isClosedPost(r.deadline);
      return {
        label: expired ? '마감' : String(r.status ?? ''),
        color: expired ? 'disabled' : 'blue',
      };
    },
    cell: ({ value }: CellCtx<AppliedRow, any>) => (
      <BaseTag
        size="sm"
        type="filled"
        color={value?.color}
        shape="circle"
        hasLeftIcon
      >
        {value?.label}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    accessor: (r) => toIndustryLabel(r.industry),
    cell: ({ value }: CellCtx<AppliedRow, any>) => renderIndustry(value),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<AppliedRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <Link
          to={`/post/${encodeURIComponent(row.id)}`}
          className="block truncate"
          title={row.title}
        >
          {row.title}
        </Link>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => (r.skills ?? []).map((s) => skillIconMapper[s] ?? s),
    cell: ({ value }: CellCtx<JoinedRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '',
    headerVariant: 'icon3',
    cellVariant: 'icon3',
    accessor: (r) => r,
    cell: (ctx: CellCtx<JoinedRow, any>) => <IconActions {...ctx} />,
    meta: {
      size: 28,
      round: true,
      actions: [
        { key: 'email', icon: EmailIc, ariaLabel: 'email', title: '이메일' },
        { key: 'link', icon: LinkIc, ariaLabel: 'link', title: '링크' },
        {
          key: 'delete',
          icon: TrashIc,
          ariaLabel: 'delete',
          title: '삭제',
          onClick: (row: AppliedRow) => {
            window.dispatchEvent(
              new CustomEvent('applied:delete:open', {
                detail: { id: row.id },
              }),
            );
          },
        },
      ],
    },
  },
];

// 합류 제안
export const joinProposalColumns: ColumnDef<JoinProposalRow>[] = [
  { key: 'deadline', header: '마감일', variant: 'default' },
  { key: 'industry', header: '산업 분야', variant: 'fixed' },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<JoinProposalRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <Link
          to={`/post/${encodeURIComponent(row.id)}`}
          className="block truncate"
          title={row.title}
        >
          {row.title}
        </Link>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => r.skills ?? [],
    cell: ({ value }: CellCtx<JoinedRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '참여',
    headerVariant: 'icon1',
    cellVariant: 'icon',
    accessor: (r) => r,
    cell: (ctx: CellCtx<JoinedRow, any>) => <IconActions {...ctx} />,
    meta: {
      round: true,
      actions: [
        {
          key: 'check',
          icon: CheckIc,
          ariaLabel: 'check',
          onClick: (row: AppliedRow) => {
            window.dispatchEvent(
              new CustomEvent('approved:open', { detail: { id: row.id } }),
            );
          },
        },
      ],
    },
  },
];

// 합류 완료
export const joinedColumns: ColumnDef<JoinedRow>[] = [
  { key: 'deadline', header: '마감일', variant: 'default' },
  { key: 'industry', header: '산업 분야', variant: 'fixed' },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<JoinedRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <span className="block truncate">{row.title}</span>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => r.skills ?? [],
    cell: ({ value }: CellCtx<JoinedRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
];
