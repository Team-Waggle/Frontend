import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getProjectDetail, getProjects } from '../api/projectPost';
import { CardData } from '../types/card';
import { PageResponse } from '../types/pageResponse';

export const useProjectsPostQuery = (
  page: number,
  filters: Record<string, string[]>,
) => {
  const params = {
    page,
    size: 10,
    sort: 'createdAt,desc',
    ...Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value.join(',')]),
    ),
  };
  return useQuery<PageResponse<CardData>, Error>({
    queryKey: ['projectPost', page, filters],
    queryFn: () => getProjects(params),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
    placeholderData: keepPreviousData,
  });
};

export const useProjectsPostDetailQuery = (projectId?: number) => {
  return useQuery<CardData, Error>({
    queryKey: ['projectPost', projectId],
    queryFn: () => getProjectDetail(projectId || 0),
    // queryKey: ['projectPost', projectId || 'me'],
    // queryFn: () => {
    //   if (projectId) return getProjectDetail(projectId);
    //   // 내 모집글 보기 API 있는지 물어보기
    //   return getProjectDetail(projectId);
    // },
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};
