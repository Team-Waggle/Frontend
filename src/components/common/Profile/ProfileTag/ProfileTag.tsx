import { memo } from 'react';
import ProfileIcon from '../ProfileIcon/BaseProfileIcon';
import { ProfileTagProps } from '../../../../types/ProfileTag';
import { Link } from 'react-router-dom';

/**
 * 프로필 태그 컴포넌트
 *
 * type: default, creator
 * size: extraSmall(360), medium(768), extraLarge(1200)
 *
 * path, imageUrl, name, jobRole, yearCount 값을 넣어 사용할 수 있습니다.
 *
 * 로그인 유뮤에 따른 모달 오픈을 위해 token과 setIsLoginSuggestionModalOpen을 넣었습니다.
 *
 **/

const ProfileTag = memo(
  ({
    type = 'default',
    size = 'extraLarge',
    path,
    imageUrl,
    name,
    jobRole,
    yearCount,
    token,
    setIsLoginSuggestionModalOpen,
  }: ProfileTagProps) => {
    const baseStyles =
      'flex items-center justify-center h-[6.4rem] gap-[1rem] pr-[2.2rem] pl-[1.2rem] border-solid border-[1px] rounded-[0.8rem] bg-black-10';

    const sizeStyles: Record<string, string> = {
      extraSmall: 'w-[28rem]',
      medium: 'w-[25.6rem]',
      extraLarge: 'w-[24.6rem]',
    };

    const handleClick = (e: React.MouseEvent) => {
      if (!token) {
        e.preventDefault(); // 링크 클릭을 막고
        setIsLoginSuggestionModalOpen(true); // 모달을 열게 함
      }
    };

    return (
      <Link
        to={`/profile/${path}`}
        className={`${baseStyles} ${sizeStyles[size]} ${type === 'creator' ? 'border-primary-70' : 'border-black-50'}`.trim()}
        onClick={handleClick}
      >
        <div className="flex items-center gap-[1.8rem]">
          <ProfileIcon imageUrl={imageUrl} />
          <div className="flex w-[12.8rem] flex-col items-start">
            <div className="flex items-center gap-[0.2rem] self-stretch">
              <p className="text-subtitle-14_Sb600 text-black-130">{name}</p>
            </div>
            <div className="flex items-center gap-[0.4rem] self-stretch whitespace-nowrap text-caption-13_M500 text-black-70">
              <span>{jobRole}</span>
              <span>|</span>
              <span className="max-w-full">{yearCount}년차 이상</span>
            </div>
          </div>
        </div>
      </Link>
    );
  },
);

export default ProfileTag;
