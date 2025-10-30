import { useEffect, useMemo, useState } from 'react';
import {
  getUserProjects,
  getProjectApplicantsCount,
} from '../services/projects.service';
import type { ProjectPayload } from '../types/api/response/payload/project';
import type { PostRow } from '../constants/ProfilePostColumns';
import { formatYYMMDDKST, isClosedKST } from '../utils/dateKST';

import { industries, skills } from '../constants/formOptions';

export function useUserProjectRows() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projects, setProjects] = useState<ProjectPayload[]>([]);
  const [counts, setCounts] = useState<Record<number, number>>({});

  const industryMap = useMemo(
    () => new Map(industries.map(o => [o.id, o.label])),
    []
  );
  const skillMap = useMemo(
    () => new Map(skills.map(o => [o.id, o.label])),
    []
  );
  const toIndustryLabel = (code?: string) =>
    (code && industryMap.get(code)) ?? (code ?? '');
  const toSkillLabels = (codes?: string[]) =>
    (codes ?? []).map(c => skillMap.get(c) ?? c);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const list = await getUserProjects();
        if (!alive) return;
        setProjects(list);

        const results = await Promise.allSettled(
          list.map(async (p) => [p.id, await getProjectApplicantsCount(p.id)] as const),
        );
        if (!alive) return;

        const map: Record<number, number> = {};
        for (const r of results) {
          if (r.status === 'fulfilled') {
            const [id, cnt] = r.value;
            map[id] = cnt ?? 0;
          }
        }
        setCounts(map);
      } catch (e: any) {
        if (alive) setError(e?.message || '불러오기에 실패했습니다.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const rows: PostRow[] = useMemo(() => {
    return projects.map((p) => {
      const status = isClosedKST(p.recruitment_end_date) ? '마감' : '진행 중';
      const applicantsCount = counts[p.id] ?? 0;

      return {
        id: String(p.id),
        title: p.title,
        industry: toIndustryLabel(p.industry),
        deadline: formatYYMMDDKST(p.recruitment_end_date),
        skills: toSkillLabels(p.skills as string[] | undefined),
        status,
        applicantsCount,
      } as PostRow;
    });
  }, [projects, counts, industryMap, skillMap]);

  return { loading, error, rows, raw: projects };
}
