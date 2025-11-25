import { useState } from 'react';
import HeartFillIcon from '../../assets/icons/ic_heart_fill_large.svg?react';
import HeartStrokeIcon from '../../assets/icons/ic_heart_stroke_large.svg?react';
import { useFollow } from '../../hooks/useFollow';

const base_style = 'h-[4.4rem] w-[4.4rem] flex items-center justify-center mt-[3.6rem] border border-solid border-l-0 border-t-0 border-b-0 sm:border-r-0 rounded-tl-[0.4rem] rounded-bl-[0.4rem] sm:rounded-tl-[0rem] sm:rounded-bl-[0rem] sm:rounded-tr-[0.4rem] sm:rounded-br-[0.4rem]';

const BUTTON_STYLES = {
  default:
    `${base_style} border-primary-50 bg-black-40 text-black-60`,
  hover:
    `${base_style} border-right-primary-0 border-primary-50 bg-primary-70 text-black-10`,
  active:
    `${base_style} border-right-primary-0 border-primary-50 bg-primary-70 text-black-10`,
};


interface FollowBtnProps {
  userId: string;
}

const FollowBtn = ({ userId }: FollowBtnProps) => {
  const { isFollowed, toggleFollow } = useFollow(userId);
  const [isHover, setIsHover] = useState(false);

  const currentStyle = isFollowed
    ? isHover
      ? BUTTON_STYLES.hover
      : BUTTON_STYLES.active
    : isHover
    ? BUTTON_STYLES.hover
    : BUTTON_STYLES.default;

  return (
    <div
      className={currentStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={toggleFollow}
    >
      {isFollowed ? <HeartFillIcon /> : <HeartStrokeIcon />}
    </div>
  );
};

export default FollowBtn;
