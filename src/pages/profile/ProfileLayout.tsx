import { Outlet } from "react-router-dom";
import IpnList from "../../components/Profile/IpnList";

const ProfileLayout = () => {
  return (
    <div className="mt-[4.2rem] flex h-[159.9rem] w-[120rem] justify-center flex-shrink-0 flex-row gap-[2.6rem]">
      <IpnList />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
