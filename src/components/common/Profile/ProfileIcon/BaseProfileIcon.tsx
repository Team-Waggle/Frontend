import { forwardRef, memo, useRef, useState, useEffect } from 'react';
import {
  BaseProfileIconProps,
  ProfileIconSize,
  ProfileIconType,
} from '../../../../styles/types/profileIcon';

import IconLargeDefault from '../../../../assets/profile/profileIcon/ic_profile_default_circle_large.svg?react';
import IconLargeEdit from '../../../../assets/profile/profileIcon/ic_profile_edit_circle_large.svg?react';
import IconMedium from '../../../../assets/profile/profileIcon/ic_profile_default_circle_medium.svg?react';
import IconSmall from '../../../../assets/profile/profileIcon/ic_profile_default_circle_small.svg?react';
import IconCamera from '../../../../assets/profile/profileIcon/ic_profile_camera_circle_grey_all.svg?react';

const getDefaultProfileIcon = (
  size: ProfileIconSize,
  mode?: ProfileIconType,
) => {
  if (size === 'sm') return <IconSmall />;
  if (size === 'md') return <IconMedium />;
  if (size === 'lg')
    return mode === 'edit' ? <IconLargeEdit /> : <IconLargeDefault />;
  return null;
};

const getProfileImageSizeClass = (size: ProfileIconSize) => {
  const sizes = {
    sm: 'w-[2.4rem] h-[2.4rem]',
    md: 'w-[3.2rem] h-[3.2rem]',
    lg: 'w-[14rem] h-[14rem]',
  };
  return sizes[size] || '';
};

// sm, md이 들어간 compact에는 padding 적용 아직 X
// 추후 사용하지 않으면 삭제할 예정
const getProfileImagePaddingClass = (size: ProfileIconSize) => {
  const sizes = {
    sm: 'px-[0.6rem] py-[0.4rem]',
    md: 'p-[0.4rem]',
    lg: 'p-[0.2rem]',
  };
  return sizes[size] || '';
};

const BaseProfileIcon = memo(
  forwardRef<HTMLButtonElement, BaseProfileIconProps>(function BaseProfileIcon(
    {
      size = 'md',
      blur = false,
      type,
      imageUrl,
      onFileSelect,
      className = '',
      ...rest
    },
    ref,
  ) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [tempProfileImageUrl, setProfileTempImageUrl] = useState<
      string | null
    >(null);

    useEffect(() => {
      setProfileTempImageUrl(null);
    }, [imageUrl]);

    const imageSrc = tempProfileImageUrl ?? imageUrl ?? '';
    const hasImage = Boolean(imageSrc);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setProfileTempImageUrl(URL.createObjectURL(file));
        onFileSelect?.(file);
      }
    };

    const triggerFileInput = () => {
      if (type === 'edit' && size === 'lg') fileInputRef.current?.click();
    };

    const renderLargeEdit = () => (
      <div
        className={`relative flex aspect-square h-[15.8rem] w-[15.8rem] items-center justify-center gap-4 ${getProfileImagePaddingClass(size)}`}
        onClick={triggerFileInput}
      >
        {imageSrc ? (
          <div
            style={{ backgroundImage: `url(${imageSrc})` }}
            className="flex aspect-square h-[14.6rem] w-[14.6rem] shrink-0 items-center justify-center gap-4 rounded-[10rem] bg-black-10 bg-cover bg-center"
          />
        ) : (
          <IconLargeEdit />
        )}
        <IconCamera className="absolute bottom-4 right-[0.8rem] flex aspect-square items-center justify-center gap-4" />
      </div>
    );

    const renderLargeDefault = () => (
      <div className={`flex aspect-square h-[15.8rem] w-[15.8rem] items-center justify-center gap-4 p-[0.2rem] ${getProfileImagePaddingClass(size)}`}>
        <button>
          {imageSrc ? (
            <div
              style={{ backgroundImage: `url(${imageSrc})` }}
              className="flex aspect-square h-[14rem] w-[14rem] shrink-0 items-center justify-center gap-4 rounded-[10rem] bg-black-10 bg-cover bg-center"
            />
          ) : (
            <IconLargeDefault />
          )}
        </button>
      </div>
    );

    const renderCompact = () => (
      <button
        ref={ref}
        type="button"
        className={`${hasImage ? getProfileImageSizeClass(size) : ''} flex justify-center items-center aspect-square shrink-0 ${className}`}
        onClick={triggerFileInput}
        {...rest}
      >
        {hasImage ? (
          <div
            style={{ backgroundImage: `url(${imageSrc})` }}
            className="relative flex h-full w-full rounded-[9.9rem] bg-cover bg-center"
          >
            {blur && size === 'md' && (
              <div className="absolute inset-0 rounded-[9.9rem] bg-[#f3f3f3]/80 backdrop-blur-[1px]" />
            )}
          </div>
        ) : (
          <div className="relative flex h-full w-full rounded-[9.9rem] bg-cover bg-center">
            {getDefaultProfileIcon(size, type)}
            {blur && size === 'md' && (
              <div className="absolute inset-0 rounded-[9.9rem] bg-[#f3f3f3]/80 backdrop-blur-[1px]" />
            )}
          </div>
        )}
      </button>
    );

    return (
      <>
        {type === 'edit' && size === 'lg'
          ? renderLargeEdit()
          : type === 'default' && size === 'lg'
            ? renderLargeDefault()
            : renderCompact()}

        {type === 'edit' && size === 'lg' && (
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
  }),
);

export default BaseProfileIcon;
