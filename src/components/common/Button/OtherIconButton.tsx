import BellIcon from '../../../assets/icons/ic_bell.svg?react';
import ProfileIcon from '../../../assets/icons/ic_profile.svg?react';
import HeartFillIcon from '../../../assets/icons/ic_heart_fill_large.svg?react';
import HeartStrokeIcon from '../../../assets/icons/ic_heart_stroke_large.svg?react';
import BookmarkIcon from '../../../assets/icons/nav/ic_nav_bookmark_large.svg?react';
import PlusIcon from '../../../assets/icons/ic_plus_large.svg?react';
import MinusIcon from '../../../assets/icons/ic_minus.svg?react';
import { useState } from 'react';
import { useAccessTokenStore } from '../../../stores/authStore';
import LoginSuggestionModal from '../../Modal/LoginSuggestionModal';

// props가 아닌 children을 받는 아이콘들은 해당 아이콘 파일에서 fill이나 stroke의 색상을 currentColor로 변경 후에
// text, fill, stroke의 색상을 주시면 됩니다.

interface IconProps {
  onClick?: () => void;
  children?: React.ReactNode;
}

interface NavigationButtonProps extends IconProps {
  type: 'bell' | 'profile';
  hasNotification?: boolean;
}

interface IconButtonProps extends IconProps {
  type?: 'outline' | 'filled' | 'join' | 'link';
}

interface BookmarkButtonProps {
  projectId?: number;
  isBookmarked?: boolean;
  disabled?: boolean;
}

interface PlusMinusButtonProps extends IconProps {
  type: 'plus' | 'minus';
}

interface ShadowButtonProps extends IconProps {
  color: 'point' | 'white';
  disabled?: boolean;
  onClick?: () => void;
}

export const NavigationButton = ({
  type,
  hasNotification = false,
  onClick,
}: NavigationButtonProps) => {
  return (
    <button
      className="relative flex h-[4.4rem] w-[4.4rem] items-center justify-center hover:bg-black-30"
      onClick={onClick}
    >
      {type === 'bell' ? <BellIcon /> : <ProfileIcon />}
      {hasNotification && (
        <div className="absolute right-[1.2rem] top-[1.2rem] h-[0.6rem] w-[0.6rem] rounded-full border border-solid border-black-10 bg-primary" />
      )}
    </button>
  );
};

export const IconButton = ({ type, children }: IconButtonProps) => {
  return (
    <button
      className={`group flex items-center justify-center rounded-[0.6rem] ${type === 'join' ? '' : 'hover:bg-black-40'} ${type === 'link' ? 'h-[2.4rem] w-[2.4rem]' : 'h-[3.2rem] w-[3.2rem]'} ${type === 'filled' ? 'bg-black-30' : ''}`}
    >
      {children}
    </button>
  );
};

export const FollowingButton = ({ onClick }: IconProps) => {
  return (
    <button
      className="group flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-r-[0.4rem] bg-black-40 hover:bg-primary-70"
      onClick={onClick}
    >
      <HeartStrokeIcon className="text-black-60 group-hover:hidden" />
      <HeartFillIcon className="hidden text-black-10 group-hover:block" />
    </button>
  );
};

export const BookmarkButton = ({
  isBookmarked,
  disabled,
}: BookmarkButtonProps) => {
  // const updateBookmark = usePostBookmarkQuery(projectId);
  const [_isActive, setIsActive] = useState(isBookmarked);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);

  const token = useAccessTokenStore.getState().accessToken;

  const handleClick = () => {
    if (disabled) return;
    if (!token) {
      setIsLoginSuggestionModalOpen(true);
      return;
    }
    // updateBookmark.mutate();
    setIsActive((prev) => !prev);
  };

  return (
    <>
      <button
        className="group flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-b-[0.4rem] bg-black-40 hover:bg-primary-10"
        onClick={handleClick}
      >
        <BookmarkIcon className="fill-transparent stroke-black-70 group-hover:fill-primary group-hover:stroke-transparent" />
      </button>
      <LoginSuggestionModal
        size="large"
        isOpen={isLoginSuggestionModalOpen}
        onClose={() => setIsLoginSuggestionModalOpen(false)}
      />
    </>
  );
};

export const PlusMinusButton = ({ type, onClick }: PlusMinusButtonProps) => {
  return (
    <button
      className="flex h-[4.6rem] w-[4.6rem] items-center justify-center"
      onClick={onClick}
    >
      <div
        className={`flex h-[3.6rem] w-[3.6rem] items-center justify-center rounded-[0.6rem] ${type === 'plus' ? 'bg-primary hover:bg-primary-80' : 'border border-solid border-black-60 bg-black-10 hover:bg-black-30'}`}
      >
        {type === 'plus' ? (
          <PlusIcon className="text-black-10" />
        ) : (
          <MinusIcon className="text-black-130" />
        )}
      </div>
    </button>
  );
};

export const ShadowButton = ({
  color,
  disabled,
  children,
  onClick
}: ShadowButtonProps) => {
  return (
    <button className="group flex h-[3.8rem] w-[3.8rem] items-center justify-center">
      <div
        className={`flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-[0.4rem] ${disabled ? 'bg-black-50' : color === 'point' ? 'bg-primary group-hover:bg-primary-80' : 'bg-black-10 group-hover:bg-black-30'} shadow-applicant`}
        onClick={onClick}
      >
        {children}
      </div>
    </button>
  );
};