import { Navigate, useParams } from "react-router-dom";
import { useUserStore } from "../stores/userStore"; 
import { ROUTES } from "../constants/route";
import Profile from "../pages/profile/ProfileHome";

const ProfileRoute = () => {
  const { id } = useParams<{ id?: string }>();
  const user = useUserStore((state) => state.user);

  if (user && id && id === String(user.id)) {
    return <Navigate to={ROUTES.PROFILE} replace />;
  }

  if (!user && !id) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Profile />;
};

export default ProfileRoute;
