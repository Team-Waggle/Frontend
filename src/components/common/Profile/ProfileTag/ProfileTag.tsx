import { memo } from 'react';
import ProfileIcon from '../ProfileIcon/BaseProfileIcon';
import { ProfileTagProps } from '../../../../types/ProfileTag';

/**
 * 프로필 태그 컴포넌트
 *
 * type: default, creator
 * size: extraSmall(360), medium(768), extraLarge(1200)
 *
 * name, jobRole, yearCount 값을 넣어 사용할 수 있습니다.
 * 
 * 특이사항: 서버 프로필 이미지 api 연결 X
**/

const ProfileTag = memo(
  ({ 
    type = 'default',
    size = 'extraLarge', 
    name, 
    jobRole, 
    yearCount,
  }: ProfileTagProps) => {
    const baseStyles =
      'flex items-center justify-center h-[6.4rem] gap-[1rem] pr-[2.2rem] pl-[1.2rem] border-solid border-[1px] rounded-[0.8rem] bg-black-10';

    const sizeStyles: Record<string, string> = {
      extraSmall: '28rem',
      medium: 'w-[25.6rem]',
      extraLarge: 'w-[24.6rem]',
    };

    return (
      <div className={`${baseStyles} ${sizeStyles[size]} ${type === 'creator' ? 'border-primary-70' : 'border-black-50'}`.trim()}>
        <div className="flex items-center gap-[1.8rem]">
        <ProfileIcon size="medium" type="default" />
        <div className="flex flex-col w-[12.8rem] items-start">
          <div className="flex items-center gap-[0.2rem] self-stretch">
            <p className="text-subtitle-14_Sb600 text-black-130">
              {name}
            </p>
          </div>
          <div className="flex items-center gap-[0.4rem] self-stretch text-caption-13_M500 text-black-70">
            <span>{jobRole}</span>
            <span>|</span>
            <span className="truncate max-w-full">{yearCount}년차 이상</span>
          </div>
        </div>
        </div>
      </div>
    );
  },
);

export default ProfileTag;
