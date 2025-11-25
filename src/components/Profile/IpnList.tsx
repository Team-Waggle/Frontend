import { NavLink } from "react-router-dom";
import InPageNavigation from "../common/InPageNavigation/InPageNavigation";
import { ROUTES } from "../../constants/route";

const ProfileNavItems = [
  { label: "내 프로필", path: "" },
  { label: "관심 목록", path: "likes" },
  { label: "지원 현황", path: "applications" },
  { label: "내 작성글", path: "posts" },
];

const IpnList = () => {
  return (
    <nav className="hidden sm:flex w-[25.2rem] flex-col items-start gap-[45rem]">
      <ul className="flex w-[25.2rem] flex-col items-start gap-[0.6rem]">
        {ProfileNavItems.map(({ label, path }) => (
          <li key={label}>
            <NavLink
              end={path === ""}
              to={`${ROUTES.PROFILE}${path ? `/${path}` : ""}`}
              children={({ isActive }) => (
                <InPageNavigation items={label} isActive={isActive} />
              )}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default IpnList;
