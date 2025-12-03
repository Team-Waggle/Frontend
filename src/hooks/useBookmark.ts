import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookmark, postBookmark } from '../api/bookmark';
import { ProjectPayload } from '../types/api/response/payload/project';

export const usePostBookmarkQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: number) => postBookmark(projectId),

    // 1) Optimistic Update (UI 먼저 반영)
    onMutate: async (projectId) => {
      await queryClient.cancelQueries({ queryKey: ['mybookmark'] });

      const previous = queryClient.getQueryData<ProjectPayload[]>([
        'mybookmark',
      ]);

      queryClient.setQueryData<ProjectPayload[]>(['mybookmark'], (old) => {
        if (!old) return [];

        // 해당 북마크를 목록에서 제거
        return old.filter((item) => String(item.id) !== String(projectId));
      });

      return { previous };
    },

    // 2) 실패 시 롤백
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['mybookmark'], context.previous);
      }
    },

    // 3) 성공 시 refetch 또는 그대로 유지
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['mybookmark'] });
    },
  });
};

export const useGetBookmarkQuery = () => {
  return useQuery<ProjectPayload[], Error>({
    queryKey: ['mybookmark'],
    queryFn: () => getBookmark(),
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청하지 않음
  });
};
