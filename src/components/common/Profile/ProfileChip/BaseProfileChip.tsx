import React, { forwardRef, memo, useMemo } from 'react';
import { ProfileChipProps } from '../../../../types/profileChip';
import { PROFILE_CHIP_STYLES, PROFILE_CHIP_SIZE } from './styles';

import ProfileIcon from '../ProfileIcon/BaseProfileIcon';
import XGreyIcon from '../../../../assets/profile/profileChip/ic_profilechip_x_gray.svg?react';
import XRedIcon from '../../../../assets/profile/profileChip/ic_profilechip_x_red.svg?react';

/**
 * 프로필 칩 컴포넌트
 *
 * type: default, control
 * Default state: default, hover, active
 * Control state: default, hover, disable
 * size: extraSmall(360), medium(768), extraLarge(1200)
 *
 * 사용예시:
 * 1. <ProfileIcon size="large" type="edit" />
 * 2. medium blur 사용 시 
 *  <ProfileIcon size="medium" type="edit" blur/> 
 * 
 * 특이사항: 서버 프로필 이미지 api 연결 X
**/

const BaseProfileChip = memo(
  forwardRef<HTMLDivElement | HTMLButtonElement, ProfileChipProps>(
    (
      { size = 'medium',
        type = 'default',
        state = 'default',
        className = '',
        name,
        jobRole,
        yearCount,
        ...rest
      },
      ref,
    ) => {
      const isControl = type === 'control';
      const ComponentTag = isControl ? 'button' : 'div';

      const baseStyles = "flex items-center justify-center h-[6.4rem] truncate overflow-hidden min-w-0";
      const chipStyles = useMemo(() => {
        const styleByState = PROFILE_CHIP_STYLES[type]?.[state] || '';
        const sizeStyle = PROFILE_CHIP_SIZE[type]?.[size] || '';

        return `${baseStyles} ${styleByState} ${sizeStyle} ${className}`.trim();
      }, [type, state, size, className]);

      const ProfileChipContent = () => (
        <>
          {isControl && state === 'disabled' ? (
            <ProfileIcon size="medium" type="edit" blur />
          ) : (
            <ProfileIcon size="medium" type="default" />
          )}
          <div className={`w-auto flex flex-col items-start flex-1 min-w-0 gap-[0.2rem] ${isControl ? "w-[9.1rem] flex-shrink-0" : ""}`}>
            <div className="flex items-center gap-[0.2rem] self-stretch">
              <p className={`max-w-full line-clamp-1 truncate  ${isControl
                  ? `text-caption-12_Sb600 ${state === 'disabled' ? 'text-black-60' : 'text-black-130'}`
                  : "text-subtitle-14_Sb600 text-black-130"
                }`}
              >
                {name}
              </p>
            </div>
            <div className={`flex items-center gap-[0.4rem] self-stretch  ${isControl
                ? `text-caption-12_M500 ${state === 'disabled' ? 'text-black-50' : 'text-black-70'}`
                : "text-caption-13_M500 text-black-70"
              }`}
            >
              <span> {jobRole} </span>
              <span> | </span>
              <span className="truncate max-w-full"> {yearCount} </span>
            </div>
          </div>
        </>
      );

      const CloseButton = () => {
        if (type !== 'default') return null;

        const isRed = state === 'hover' || state === 'active';
        const Icon = isRed ? XRedIcon : XGreyIcon;

        return (
          <div className="flex flex-col items-end gap-4 self-stretch px-0 py-4">
            <Icon />
          </div>
        );
      };

      return (
        <ComponentTag
          ref={ref as React.Ref<HTMLButtonElement | HTMLDivElement>}
          className={chipStyles}
          type={isControl ? 'button' : undefined}
          {...(rest as any)}
        >
          <ProfileChipContent />
          <CloseButton />
        </ComponentTag>
      );
    },
  ),
);

export default BaseProfileChip;
