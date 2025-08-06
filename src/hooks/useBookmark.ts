import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postBookmark } from '../api/bookmark';

export const usePostBookmarkQuery = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => postBookmark(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projectId', projectId] });
    },
    onError: (error) => {
      console.error('Error posting bookmark:', error);
    },
  });
};
