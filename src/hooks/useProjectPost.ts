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
  updateProject,
  deleteProject
} from '../api/projectPost';
import { ProjectPayload } from '../types/api/response/payload/project';
import { PageResponse } from '../types/pageResponse';
import { ProjectBody } from '../types/api/request/project';
import { useNavigate } from 'react-router-dom';

// 프로젝트 모집글 목록 조회
export const useProjectsGetQuery = (
  page: number,
  sort: string,
  filters: Record<string, string[]>,
  query: string,
) => {
  const params: GetProjectsParams = {
    page,
    size: 10,
    sort,
    ...Object.fromEntries(
      Object.entries(filters).map(([key, value]) => [key, value.join(',')]),
    ),
    query,
  };
  return useQuery<PageResponse<ProjectPayload>, Error>({
    queryKey: ['projectPost', page, sort, filters, query],
    queryFn: () => getProjects(params),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
    placeholderData: keepPreviousData,
  });
};

// 프로젝트 모집글 생성
export const useProjectsPostQuery = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ProjectBody) => postProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectPost'] });
      localStorage.removeItem('tempPostForm');
      navigate('/');
    },
    onError: (error) => {
      console.error('Error posting:', error);
    },
  });
};

// 프로젝트 모집글 조회
export const useProjectsPostDetailQuery = (projectId: number) => {
  return useQuery<ProjectPayload, Error>({
    queryKey: ['projectPost', projectId],
    queryFn: () => getProjectDetail(projectId),
    enabled: !!projectId,
    staleTime: 0,
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};

// 프로젝트 모집글 수정
export const useProjectsUpdateQuery = (projectId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ProjectBody) => updateProject(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['updateProject', projectId] });
      localStorage.removeItem('tempPostForm');
      navigate(`/post/${projectId}`);
    },
    onError: (error) => {
      console.error('Error updating:', error);
    },
  });
};

// 프로젝트 모집글 삭제
export const useProjectsDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: number) => deleteProject(projectId),
    onSuccess: (_data, projectId) => {
      queryClient.invalidateQueries({ queryKey: ['projectPost'] });
      queryClient.removeQueries({ queryKey: ['projectPost', projectId] });
    },
    onError: (err) => {
      console.error('Error deleting:', err);
      const msg =
        (err as any)?.response?.data?.message ||
        (err as any)?.response?.data?.error ||
        (err as any)?.message ||
        '삭제에 실패했습니다.';
      alert(msg);
    },
  });
};