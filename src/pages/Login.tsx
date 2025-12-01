import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccessTokenStore, useRefreshTokenStore } from '../stores/authStore';
import { useGetUserProfileCompleteQuery } from '../hooks/useUser';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetUserProfileCompleteQuery();

  const setAccessToken = useAccessTokenStore((state) => state.setAccessToken);
  const setRefreshToken = useRefreshTokenStore(
    (state) => state.setRefreshToken,
  );

  useEffect(() => {
    const isSuccess = searchParams.get('success');
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');

    if (isSuccess && access_token && refresh_token) {
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      if (isLoading) return;
      if (data?.isCompleted) {
        navigate('/');
      } else {
        navigate('/profile/new');
      }
    }
  }, [data]);

  return <div>Loading...</div>;
};

export default Login;
