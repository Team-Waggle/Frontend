import React, { forwardRef, memo, useMemo } from 'react';
import { ProfileChipProps } from '../../../../styles/types/profileChip';
import { PROFILE_CHIP_STYLES, PROFILE_CHIP_SIZE } from './styles';

import ProfileIcon from '../ProfileIcon/BaseProfileIcon';
import XGreyIcon from '../../../../assets/profile/icon/icon-x-gray.svg?react';
import XRedIcon from '../../../../assets/profile/icon/icon-x-red.svg?react';

const BaseProfileChip = memo(
  forwardRef<HTMLDivElement | HTMLButtonElement, ProfileChipProps>(
    (
      { size = 'md', type, state = 'default', className = '', name, jobRole, yearCount, ...rest },
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
          <ProfileIcon size="md" type="default" />
          <div className={`w-auto flex flex-col items-start flex-1 min-w-0 gap-[0.2rem] ${isControl ? "w-[9.1rem] flex-shrink-0" : ""}`}>
            <div className="flex items-center gap-[0.2rem] self-stretch">
              <p className={`max-w-full line-clamp-1 truncate text-black-130 ${isControl ? "text-caption-12_Sb600" : "text-subtitle-14_Sb600"}`}>
                {name}
              </p>
            </div>
            <div className={`flex items-center gap-[0.4rem] self-stretch text-black-70 ${isControl ? "text-caption-12_M500" : "text-caption-13_M500"}`}>
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
