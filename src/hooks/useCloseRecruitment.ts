import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useProjectsPostDetailQuery,
  useProjectsUpdateQuery,
} from './useProjectPost';
import type { ProjectBody } from '../types/api/request/project';
import type { ProjectPayload } from '../types/api/response/payload/project';

function todayKST(): string {
  const fmt = (n: number) => String(n).padStart(2, '0');
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  return `${now.getFullYear()}-${fmt(now.getMonth() + 1)}-${fmt(now.getDate())}`;
}

function toProjectBody(p: ProjectPayload): ProjectBody {
  return {
    title: p.title,
    industry: p.industry,
    work_way: p.work_way,
    recruitment_end_date: p.recruitment_end_date,
    work_period: p.work_period,
    recruitments:
      p.recruitments?.map((r) => ({
        position: r.position,
        remaining_count: r.remaining_count,
        current_count: r.current_count,
      })) ?? [],
    skills: p.skills ?? [],
    detail: p.detail,
    contact_url: p.contact_url,
    reference_url: p.reference_url,
    memberEmails: [],
  };
}

export function useCloseRecruitment(
  projectId: number,
  options: { refreshAfter?: boolean } = { refreshAfter: true },
) {
  const queryClient = useQueryClient();

  const {
    data: detail,
    isLoading: isDetailLoading,
    refetch,
  } = useProjectsPostDetailQuery(projectId);

  const { mutateAsync: updateProject, isPending: isUpdating } =
    useProjectsUpdateQuery(projectId);

  const closeRecruitment = useCallback(async () => {
    let base = detail;
    if (!base) {
      const r = await refetch();
      base = r.data as ProjectPayload | undefined;
    }
    if (!base) {
      return;
    }

    const body = toProjectBody(base);
    const payload: ProjectBody = { ...body, recruitment_end_date: todayKST() };

    await updateProject(payload);

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['projectPost'] }),
      queryClient.invalidateQueries({ queryKey: ['projectPost', projectId] }),
    ]);

    if (options.refreshAfter && typeof window !== 'undefined') {
      window.location.reload();
    }
  }, [detail, refetch, updateProject, queryClient, projectId]);

  return { closeRecruitment, isUpdating, isDetailLoading };
}
