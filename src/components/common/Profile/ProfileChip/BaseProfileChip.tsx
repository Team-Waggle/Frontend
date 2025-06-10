import React, { forwardRef, memo, useMemo } from 'react';
import { ProfileChipProps } from '../../../../styles/types/profileChip';
import { PROFILE_CHIP_STYLES, PROFILE_CHIP_SIZE } from './styles';

import ProfileIcon from '../ProfileIcon/BaseProfileIcon';
import XGreyIcon from '../../../../assets/profile/icon/icon-x-gray.svg?react';
import XRedIcon from '../../../../assets/profile/icon/icon-x-red.svg?react';

const BaseProfileChip = memo(
  forwardRef<HTMLDivElement | HTMLButtonElement, ProfileChipProps>(
    (
      { size = 'md', type, state = 'default', className = '', ...rest },
      ref,
    ) => {
      const isControl = type === 'control';
      const ComponentTag = isControl ? 'button' : 'div';

      const baseStyles = "flex items-center justify-between h-[6.4rem]";
      const chipStyles = useMemo(() => {
        const styleByState = PROFILE_CHIP_STYLES[type]?.[state] || '';
        const sizeStyle = PROFILE_CHIP_SIZE[type]?.[size] || '';

        return `${baseStyles} ${styleByState} ${sizeStyle} ${className}`.trim();
      }, [type, state, size, className]);

      const ProfileChipContent = () => (
        <>
          <ProfileIcon size="md" type="default" />
          <div className={`flex flex-col items-start ${isControl ? "w-[9.1rem] flex-shrink-0" : ""}`}>
            <div className="flex items-center gap-[0.2rem] self-stretch">
              <p className={`line-clamp-1 truncate text-black-130 ${isControl ? "text-caption-12_Sb600" : "text-subtitle-14_Sb600"}`}>
                일이삼사오육칠팔구십
              </p>
            </div>
            <div className={`flex items-center gap-[0.4rem] self-stretch text-black-70 ${isControl ? "text-caption-12_M500" : "text-caption-13_M500"}`}>
              <span> 프론트엔드 </span>
              <span> | </span>
              <span> 10년차 이상 </span>
            </div>
          </div>
        </>
      );

      const ChangeButton = () =>
        !isControl && (
          <div className="flex flex-col items-end gap-4 self-stretch px-0 py-4">
            <XGreyIcon />
          </div>
        );

      return (
        <ComponentTag
          ref={ref as React.Ref<HTMLButtonElement | HTMLDivElement>}
          className={chipStyles}
          type={isControl ? 'button' : undefined}
          {...(rest as any)}
        >
          <ProfileChipContent />
          <ChangeButton />
        </ComponentTag>
      );
    },
  ),
);

export default BaseProfileChip;
