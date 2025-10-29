import { Outlet } from "react-router-dom";
import IpnList from "../../components/Profile/IpnList";
import { useUserStore } from "../../stores/userStore";

const ProfileLayout = () => {
  const userId = useUserStore((s) => s.user?.id);

  return (
    <div className="mt-[4.2rem] flex h-[102.4rem] w-[120rem] justify-center flex-shrink-0 flex-row gap-[2.6rem]">
      <IpnList />
      <div>
        <Outlet context={{ currentUserId: String(userId ?? "") }}/>
      </div>
    </div>
  );
};

export default ProfileLayout;
