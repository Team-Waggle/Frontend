import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../api/projectPost';
import { CardData } from '../types/card';
import { PageResponse } from '../types/pageResponse';
import { ProjectsFilters } from '../types/projectsFilters';

export const useProjectsPostQuery = (
  page: number,
  filters: ProjectsFilters,
) => {
  return useQuery<PageResponse<CardData>, Error>({
    queryKey: ['projectPost', page, filters],
    queryFn: () => getProjects(page, 10, 'createdAt,desc', filters),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};
