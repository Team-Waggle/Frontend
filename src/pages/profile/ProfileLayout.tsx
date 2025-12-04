import { Outlet, useLocation } from 'react-router-dom';
import IpnList from '../../components/Profile/IpnList';
import { useUserStore } from '../../stores/userStore';
import Drawer from '../../components/layout/Drawer';

const ProfileLayout = () => {
  const userId = useUserStore((s) => s.user?.id);

  return (
    <div className="mt-[4.2rem] flex h-[102.4rem] w-[32rem] flex-shrink-0 flex-row justify-center sm:w-[76.8rem] md:w-[120rem] md:gap-[2.6rem]">
      <div className="md:hidden">
        <Drawer>
          <IpnList />
        </Drawer>
      </div>
      <div className="hidden md:block">
        <IpnList />
      </div>
      <div>
        <Outlet context={{ currentUserId: String(userId ?? '') }} />
      </div>
    </div>
  );
};

export default ProfileLayout;
