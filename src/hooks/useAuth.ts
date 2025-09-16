import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout, reissue } from '../api/auth';

export const useLogoutQuery = (refresh_token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => logout(refresh_token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logout'] });
    },
    onError: (error) => {
      console.error('Error logout:', error);
    },
  });
};

export const useReissue = (refresh_token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => reissue(refresh_token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reissue'] });
    },
    onError: (error) => {
      console.error('Error reissue:', error);
    },
  });
};
