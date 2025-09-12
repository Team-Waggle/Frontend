import {
  useQuery,
  keepPreviousData,
  useQueryClient,
  useMutation,
} from '@tanstack/react-query';
import {
  getProjectDetail,
  getProjects,
  GetProjectsParams,
  postProject,
  PostProjectParams,
} from '../api/projectPost';
import { ProjectPayload } from '../types/project';
import { PageResponse } from '../types/pageResponse';

// 프로젝트 모집글 목록 조회
export const useProjectsGetQuery = (
  page: number,
  sort: string,
  filters: Record<string, string[]>,
) => {
  const params: GetProjectsParams = {
    page,
    size: 10,
    sort,
    ...Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value.join(',')]),
    ),
  };
  return useQuery<PageResponse<ProjectPayload>, Error>({
    queryKey: ['projectPost', page, sort, filters],
    queryFn: () => getProjects(params),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
    placeholderData: keepPreviousData,
  });
};

// 프로젝트 모집글 생성
export const useProjectsPostQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostProjectParams) => postProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectPost'] });
    },
    onError: (error) => {
      console.error('Error posting bookmark:', error);
    },
  });
};

// 프로젝트 모집글 조회
export const useProjectsPostDetailQuery = (projectId: number) => {
  return useQuery<ProjectPayload, Error>({
    queryKey: ['projectPost', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};
