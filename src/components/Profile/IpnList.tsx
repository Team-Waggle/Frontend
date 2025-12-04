import { NavLink } from 'react-router-dom';
import InPageNavigation from '../common/InPageNavigation/InPageNavigation';
import { ROUTES } from '../../constants/route';
import { useIpnStore } from '../../stores/ipnStore';

const ProfileNavItems = [
  { label: '내 프로필', path: '' },
  { label: '관심 목록', path: 'likes' },
  { label: '지원 현황', path: 'applications' },
  { label: '내 작성글', path: 'posts' },
];

const IpnList = () => {
  const { close } = useIpnStore();
  return (
    <nav className="mx-[2rem] mt-[4.2rem] flex flex-col items-start gap-[45rem]">
      <ul className="flex flex-col items-start gap-[0.6rem]">
        {ProfileNavItems.map(({ label, path }) => (
          <li key={label}>
            <NavLink
              end={path === ''}
              to={`${ROUTES.PROFILE}${path ? `/${path}` : ''}`}
              children={({ isActive }) => (
                <InPageNavigation items={label} isActive={isActive} />
              )}
              onClick={close}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default IpnList;
