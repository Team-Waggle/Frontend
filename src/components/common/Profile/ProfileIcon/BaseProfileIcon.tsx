import { forwardRef, memo, useRef, useState, useEffect } from 'react';
import {
  BaseProfileIconProps,
  ProfileIconSize,
  ProfileIconType,
} from '../../../../types/profileIcon';

import IconLargeDefault from '../../../../assets/profile/profileIcon/ic_profile_default_circle_large.svg?react';
import IconLargeEdit from '../../../../assets/profile/profileIcon/ic_profile_edit_circle_large.svg?react';
import IconMedium from '../../../../assets/profile/profileIcon/ic_profile_default_circle_medium.svg?react';
import IconSmall from '../../../../assets/profile/profileIcon/ic_profile_default_circle_small.svg?react';
import IconCamera from '../../../../assets/profile/profileIcon/ic_profile_camera_circle_grey_all.svg?react';

import { PROFILE_IMAGE_SIZE, 
  PROFILE_IMAGE_PADDING, 
  PROFILE_ICON_BASE_STYLE, 
  PROFILE_ICON_BLUR_STYLE 
} from './styles';

/**
 * 프로필 아이콘 컴포넌트
 *
 * type: default, edit
 * size: small, medium, large
 *
 * 사용예시:
 * 1. <ProfileIcon size="large" type="edit" />
 * 2. medium blur 사용 시 
 *  <ProfileIcon size="medium" type="edit" blur/> 
 * 
 * 특이사항: 서버 프로필 이미지 api 연결 X
**/

const BaseProfileIcon = memo(
  forwardRef<HTMLButtonElement, BaseProfileIconProps>(function BaseProfileIcon(
    {
      type = 'default', // 기본 상태: default
      size = 'medium', // 기본 크기는 medium으로 설정
      blur = false, // 기본: false 설정, 사이즈 medium(defulat, edit 모두 포함) 흐림 효과 적용 여부
      imageUrl,
      onFileSelect,
      className = '',
      ...rest
    },
    ref,
  ) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [tempProfileImageUrl, setProfileTempImageUrl] = useState<string | null>(null);

    // 외부에서 이미지 URL 변경 시, 이미지 URL 초기화
    useEffect(() => {
      setProfileTempImageUrl(null);
    }, [imageUrl]);

    const imageSrc = tempProfileImageUrl ?? imageUrl ?? '';
    const hasImage = Boolean(imageSrc);

    // 파일 선택 처리
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setProfileTempImageUrl(URL.createObjectURL(file));
        onFileSelect?.(file); // 이미지 파일 선택 시, 이미지 미리보기
      }
    };

    // type = edit, size = large 인 경우에만 이미지 변경 클릭 가능
    const triggerFileInput = () => {
      if (type === 'edit' && size === 'large') fileInputRef.current?.click();
    };

    /**
     * UI를 세 갈래로 나눠놓은 이유 
     * - UI 구조의 차이로 인해, 가독성 향상을 위해서 나눠놓음
     */

    // type = edit, size = large UI
    const LargeEditIcon = () => (
      <div
        className={`relative h-[15.8rem] w-[15.8rem] ${PROFILE_ICON_BASE_STYLE} ${PROFILE_IMAGE_PADDING[size]}`}
        onClick={triggerFileInput}
      >
        {imageSrc ? (
          <div
            style={{ backgroundImage: `url(${imageSrc})` }}
            className={`h-[14.6rem] w-[14.6rem] shrink-0 rounded-[10rem] bg-black-10 bg-cover bg-center ${PROFILE_ICON_BASE_STYLE}`}
          />
        ) : (
          <IconLargeEdit />
        )}
        <IconCamera className={`absolute bottom-4 right-[0.8rem] ${PROFILE_ICON_BASE_STYLE}`} />
      </div>
    );

    // type = defualt, size = large UI
    const LargeDefaultIcon = () => (
      <div className={`h-[15.8rem] w-[15.8rem] p-[0.2rem] ${PROFILE_ICON_BASE_STYLE} ${PROFILE_IMAGE_PADDING[size]}`}>
        <button>
          {imageSrc ? (
            <div
              style={{ backgroundImage: `url(${imageSrc})` }}
              className={`h-[14rem] w-[14rem] shrink-0 rounded-[10rem] bg-black-10 bg-cover bg-center ${PROFILE_ICON_BASE_STYLE}`}
            />
          ) : (
            <IconLargeDefault />
          )}
        </button>
      </div>
    );

    // small, medium UI
    const CompactIcon = () => (
      <button
        ref={ref}
        type="button"
        className={`${hasImage ? PROFILE_IMAGE_SIZE[size] : ''} flex justify-center items-center aspect-square shrink-0 ${className}`}
        onClick={triggerFileInput}
        {...rest}
      >
        {hasImage ? (
          <div
            style={{ backgroundImage: `url(${imageSrc})` }}
            className="relative flex h-full w-full rounded-[9.9rem] bg-cover bg-center"
          >
            {blur && size === 'medium' && (
              <div className={PROFILE_ICON_BLUR_STYLE} />
            )}
          </div>
        ) : (
          <div className="relative flex h-full w-full rounded-[9.9rem] bg-cover bg-center">
            {getDefaultProfileIcon(size, type)}
            {blur && size === 'medium' && (
              <div className={PROFILE_ICON_BLUR_STYLE} />
            )}
          </div>
        )}
      </button>
    );

    if (size === 'large') {
      return (
        <>
          {type === 'edit' ? LargeEditIcon() : LargeDefaultIcon()}
          {type === 'edit' && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          )}
        </>
      );
    }

    return CompactIcon();
  }),
);

// default : Profile Icon의 svg 반환하는 함수
function getDefaultProfileIcon(size: ProfileIconSize, type?: ProfileIconType) {
  if (size === 'small') return <IconSmall />;
  if (size === 'medium') return <IconMedium />;
  if (size === 'large') return type === 'edit' ? <IconLargeEdit /> : <IconLargeDefault />;
  return null;
}

export default BaseProfileIcon;
