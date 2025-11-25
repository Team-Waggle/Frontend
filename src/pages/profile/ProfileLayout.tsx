import { Outlet, useLocation } from "react-router-dom";
import IpnList from "../../components/Profile/IpnList";
import { useUserStore } from "../../stores/userStore";

const ProfileLayout = () => {
  const userId = useUserStore((s) => s.user?.id);
  const location = useLocation();

  const hiddenPaths = ['likes', 'applications', 'posts'];

  const shouldHideIpnList = hiddenPaths.some(path => location.pathname.includes(path));

  return (
    <div className="mt-[4.2rem] flex h-[102.4rem] w-[32rem] sm:w-[76.8rem] md:w-[120rem] justify-center flex-shrink-0 flex-row md:gap-[2.6rem]">
      <div className={`${shouldHideIpnList && 'hidden md:block'}`}>
        <IpnList />
      </div>
      <div>
        <Outlet context={{ currentUserId: String(userId ?? "") }} />
      </div>
    </div>
  );
};

export default ProfileLayout;
