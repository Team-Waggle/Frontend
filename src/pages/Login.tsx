import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const isExist = query.get('is_exist_user');
  // console.log(isExist);

  axios
    .get('https://waggle.o-r.kr/api/auth/token/reissue')
    .then((res) => {
      const { access_token } = res.data.payload;
      // 로컬에 토큰을 저장하는 것은 보안상 좋지 않으므로 추후에 반드시 수정할 것!
      localStorage.setItem('AccessToken', access_token);
      // 기존 유저면 메인 페이지로
      if (isExist) {
        navigate('/');
        // 신규 유저면 프로필 설정 페이지로 -> 수정 필요
      } else {
        navigate('/edit_profile');
      }
    })
    .catch((err) => console.log(err.response.data.message));

  return <div>Loading...</div>;
};

export default Login;
