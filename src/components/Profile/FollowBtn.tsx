import { useState } from 'react';
import HeartFillIcon from '../../assets/icons/ic_heart_fill_large.svg?react';
import HeartStrokeIcon from '../../assets/icons/ic_heart_stroke_large.svg?react';
import { useFollow } from '../../hooks/useFollow';

const BUTTON_STYLES = {
  default:
    'h-[4.4rem] w-[4.4rem] flex items-center justify-center mt-[3.6rem] rounded-tr-[0.4rem] rounded-br-[0.4rem] bg-black-40 text-black-60',
  hover:
    'h-[4.4rem] w-[4.4rem] flex items-center justify-center mt-[3.6rem] rounded-tr-[0.4rem] rounded-br-[0.4rem] bg-primary-70 text-black-10',
  active:
    'h-[4.4rem] w-[4.4rem] flex items-center justify-center mt-[3.6rem] rounded-tr-[0.4rem] rounded-br-[0.4rem] bg-primary-70 text-black-10',
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
