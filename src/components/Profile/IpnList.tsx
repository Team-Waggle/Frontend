import { Link } from "react-router-dom";
import InPageNavigation from '../common/InPageNavigation/InPageNavigation';

// path 추가 예정
const ProfileNavItems = [
  { label: "내 프로필", path: "/profile" },
  { label: "관심 목록", path: "" },
  { label: "지원 현황", path: "" },
  { label: "내 작성글", path: "" },
];

const IpnList = () => {
  return (
    <nav
      className="flex w-[25.2rem] flex-col items-start gap-[45rem]"
    >
      <ul className="flex w-[25.2rem] flex-col items-start gap-[0.6rem]">
        {ProfileNavItems.map(({ label, path }) => (
          <li key={path}>
            <Link to={path}>
              <InPageNavigation items={label} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default IpnList;