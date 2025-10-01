import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/route';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    toMain: () => navigate(ROUTES.MAIN),
    toLogin: () => navigate(ROUTES.LOGIN),
    toProfile: () => navigate(ROUTES.PROFILE),
    toProfileFORM: () => navigate(ROUTES.PROFILE_FORM),
    toProfileById: (id: string) => navigate(`${ROUTES.PROFILE}/${id}`),
  };
};
