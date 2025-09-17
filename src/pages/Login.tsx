import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAccessTokenStore, useRefreshTokenStore } from '../stores/authStore';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const isSuccess = searchParams.get('success');
    const access_token = searchParams.get('access_token');
    const refresh_token = searchParams.get('refresh_token');

    if (isSuccess && access_token && refresh_token) {
      // 로그인 성공 시 토큰을 전역 상태에 저장하는 것으로 수정할 것
      // 전역 상태 관리 라이브러리 정하기
      useAccessTokenStore.getState().setAccessToken(access_token);
      useRefreshTokenStore.getState().setRefreshToken(refresh_token);
      navigate('/');
    }
  }, []);

  return <div>Loading...</div>;
};

export default Login;
