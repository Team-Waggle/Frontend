import ProfileIcon from '../../assets/icons/nav/ic_nav_profile_small.svg?react';
import BookmarkIcon from '../../assets/icons/nav/ic_nav_bookmark_small.svg?react';
import MyApplyIcon from '../../assets/icons/nav/ic_nav_myapply_small.svg?react';
import MyPostIcon from '../../assets/icons/nav/ic_nav_mypost_small.svg?react';
import LogoutIcon from '../../assets/icons/nav/ic_nav_logout_small.svg?react';
import { useLogoutQuery } from '../../hooks/useAuth';
import {
  useAccessTokenStore,
  useRefreshTokenStore,
} from '../../stores/authStore';
import { Link } from 'react-router-dom';

interface HeaderListProps {
  onClose: () => void;
}

const HeaderList = ({ onClose }: HeaderListProps) => {
  const { mutate } = useLogoutQuery(
    useRefreshTokenStore((state) => state.refreshToken!),
  );
  return (
    <div className="absolute right-0 top-[5rem] flex h-[23rem] w-[18.3rem] flex-col gap-[1rem] rounded-[1.2rem] border border-solid border-black-40 bg-black-10 pt-[0.6rem] shadow-pop">
      <div className="gap-[0.2rem] px-[0.8rem]">
        <Link
          to="/profile"
          onClick={onClose}
          className="flex gap-[0.6rem] rounded-[0.6rem] px-[1.2rem] py-[0.8rem]"
        >
          <ProfileIcon />
          <span className="text-caption-16_M500">내 프로필</span>
        </Link>
        <Link
          to="/profile/likes"
          onClick={onClose}
          className="flex gap-[0.6rem] rounded-[0.6rem] px-[1.2rem] py-[0.8rem]"
        >
          <BookmarkIcon className="fill-black-10 stroke-black-70" />
          <span className="text-caption-16_M500">관심 목록</span>
        </Link>
        <Link
          to="/profile/applications"
          onClick={onClose}
          className="flex gap-[0.6rem] rounded-[0.6rem] px-[1.2rem] py-[0.8rem]"
        >
          <MyApplyIcon />
          <span className="text-caption-16_M500">지원 현황</span>
          <div className="h-[0.6rem] w-[0.6rem] rounded-full bg-primary" />
        </Link>
        <Link
          to="/profile/posts"
          onClick={onClose}
          className="flex gap-[0.6rem] rounded-[0.6rem] px-[1.2rem] py-[0.8rem]"
        >
          <MyPostIcon />
          <span className="text-caption-16_M500">내 작성글</span>
        </Link>
      </div>
      <div className="border-t border-solid border-black-40 px-[0.8rem] py-[0.4rem]">
        <button className="flex gap-[0.6rem] rounded-[0.6rem] px-[1.2rem] py-[0.8rem]">
          <LogoutIcon />
          <span
            className="text-caption-16_M500"
            onClick={() => {
              mutate();
              useAccessTokenStore.getState().clearAccessToken();
              useRefreshTokenStore.getState().clearRefreshToken();
              window.location.href = '/';
            }}
          >
            로그아웃
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeaderList;
