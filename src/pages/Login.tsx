import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Login = () => {
  const useQuery = (): URLSearchParams => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const isExist = query.get('is_exist_user');

  axios
    .get('https://waggle.o-r.kr/api/auth/token/reissue')
    .then((res) => console.log(res))
    .catch((err) => console.log(err.response.data.message));

  return <div>Loading...</div>;
};

export default Login;
