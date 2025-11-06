import { useQuery } from '@tanstack/react-query';
import { getProjectMember } from '../api/projectMember';
import { MemberPayload } from '../types/api/response/payload/member';

export const useProjectsMemberQuery = (projectId: number) => {
  return useQuery<MemberPayload[], Error>({
    queryKey: ['projectMember', projectId],
    queryFn: () => getProjectMember(projectId),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};
