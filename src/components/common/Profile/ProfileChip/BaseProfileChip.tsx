import React, { forwardRef, memo, useMemo } from 'react';
import { ProfileChipProps } from '../../../../types/profileChip';
import { PROFILE_CHIP_STYLES, PROFILE_CHIP_SIZE } from './styles';
import ProfileIcon from '../ProfileIcon/BaseProfileIcon';

import PlusIcon from '../../../../assets/icons/profile/profileChip/ic_profileChip_plus.svg?react';
import DeleteIcon from '../../../../assets/icons/profile/profileChip/ic_profileChip_x.svg?react';
import { ShadowButton } from '../../Button/OtherIconButton';

type OverlayMode = 'hover' | 'always' | 'off';

type ExtendedProfileChipProps = ProfileChipProps & {
  overlayMode?: OverlayMode;
  overlayForcedVisible?: boolean | null;
  overlayDisabled?: boolean;
  showProfileAction?: boolean;
  showPlusAction?: boolean;
  showDeleteAction?: boolean;
  onProfileAction?: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => void;
  onPlusAction?: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => void;
  onDeleteAction?: (
    e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
  ) => void;
};

const BaseProfileChip = memo(
  forwardRef<HTMLDivElement | HTMLButtonElement, ExtendedProfileChipProps>(
    (
      {
        size = 'medium',
        type = 'default',
        state = 'default',
        className = '',
        name,
        jobRole,
        yearCount,
        overlayMode = 'hover',
        overlayForcedVisible = null,
        overlayDisabled = false,
        showProfileAction = true,
        showPlusAction = true,
        showDeleteAction = true,
        onProfileAction,
        onPlusAction,
        onDeleteAction,
        ...rest
      },
      ref,
    ) => {
      const isControl = type === 'control';
      // const ComponentTag = isControl ? 'button' : 'div';
      const ComponentTag = 'div';

      const baseStyles =
        'relative group/base flex items-center justify-center h-[6.4rem] truncate overflow-hidden min-w-0';

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
          <div
            className={`flex w-auto min-w-0 flex-1 flex-col items-start gap-[0.2rem] ${
              isControl ? 'w-[9.1rem] flex-shrink-0' : ''
            }`}
          >
            <div className="flex items-center gap-[0.2rem] self-stretch">
              <p
                className={`line-clamp-1 max-w-full truncate ${
                  isControl
                    ? `text-caption-12_Sb600 ${
                        state === 'disabled'
                          ? 'text-black-60'
                          : 'text-black-130'
                      }`
                    : 'text-subtitle-14_Sb600 text-black-130'
                }`}
              >
                {name}
              </p>
            </div>
            <div
              className={`flex items-center gap-[0.4rem] self-stretch ${
                isControl
                  ? `text-caption-12_M500 ${
                      state === 'disabled' ? 'text-black-50' : 'text-black-70'
                    }`
                  : 'text-caption-13_M500 text-black-70'
              }`}
            >
              <span>{jobRole}</span>
              <span>|</span>
              <span className="max-w-full truncate">{yearCount}년차 이상</span>
            </div>
          </div>
        </>
      );

      const forced = overlayForcedVisible;
      const modeShows =
        overlayMode === 'always'
          ? 'opacity-100 pointer-events-auto'
          : overlayMode === 'off'
            ? 'opacity-0 pointer-events-none'
            : 'opacity-0 group-hover/base:opacity-100 group-focus-within/base:opacity-100 pointer-events-none group-hover/base:pointer-events-auto group-focus-within/base:pointer-events-auto';

      const visibilityClass =
        forced === true
          ? 'opacity-100 pointer-events-auto'
          : forced === false
            ? 'opacity-0 pointer-events-none'
            : modeShows;

      const disabledOverlayClass = overlayDisabled ? 'pointer-events-none' : '';
      const showRightGroup = showPlusAction || showDeleteAction;

      const overlayLayoutClass = useMemo(() => {
        const hasPlus = !!showPlusAction;
        const hasX = !!showDeleteAction;

        // 기본(type='default')은 명세상 X만
        if (type === 'default') {
          switch (size) {
            case 'extraLarge':
              return 'flex pl-[1.45rem] items-center gap-[8.4rem]'; // 뭔가 이상해...
            case 'extraSmall':
              return 'flex pl-[0.3rem] items-center gap-[10.6rem]';
            case 'medium':
            default:
              return 'flex pl-[0.3rem] items-center gap-[5rem]';
          }
        }

        // 관리(type='control')
        if (type === 'control') {
          // X + Plus 둘 다
          if (hasX && hasPlus) {
            switch (size) {
              case 'extraLarge':
                return 'inline-flex pl-[1.6rem] items-center gap-[1.4rem]';
              case 'extraSmall':
                return 'inline-flex pl-[0.3rem] items-center gap-[3rem]';
              case 'medium':
              default:
                return 'inline-flex pl-[0.3rem] items-center gap-[3rem]';
            }
          }
          // X만
          if (hasX && !hasPlus) {
            switch (size) {
              case 'extraLarge':
                return 'flex pl-[1.6rem] items-center gap-[1.4rem]';
              case 'extraSmall':
                return 'flex pl-[0.3rem] items-center gap-[3rem]';
              case 'medium':
              default:
                return 'flex pl-[0.3rem] items-center gap-[3rem]';
            }
          }
        }

        // 안전 기본값 (명세 외 조합)
        return 'flex pl-[1.45rem] items-center gap-[1rem]';
      }, [type, size, showPlusAction, showDeleteAction]);

      const onlyX = !!showDeleteAction && !showPlusAction;
      const onlyXInControl = onlyX && type === 'control';

      return (
        <ComponentTag
          ref={ref as React.Ref<HTMLButtonElement | HTMLDivElement>}
          className={chipStyles}
          type={isControl ? 'button' : undefined}
          {...(rest as any)}
        >
          <ProfileChipContent />

          <div
            className={[
              'absolute inset-0 bg-black-60/80 transition-opacity duration-150 ease-out',
              overlayLayoutClass, // ← 사이즈/조합별 레이아웃 클래스
              visibilityClass, // 기존 그대로
              disabledOverlayClass, // 기존 그대로
            ].join(' ')}
          >
            {/* 프로필 이미지 */}
            {showProfileAction ? (
              <div
                className="pointer-events-auto flex items-center"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                <ShadowButton
                  color="white"
                  onClick={() => onProfileAction?.()}
                  disabled={overlayDisabled}
                >
                  <ProfileIcon size="small" type="default" />
                </ShadowButton>
              </div>
            ) : (
              <div />
            )}

            {/* 삭제/추가 버튼 */}
            {showRightGroup ? (
              <div
                className={
                  onlyXInControl
                    ? 'flex w-[8rem] items-center justify-center gap-[0.6rem]'
                    : 'flex items-center justify-center gap-[0.6rem]'
                }
              >
                {showDeleteAction && (
                  <div
                    className="pointer-events-auto"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShadowButton
                      color="white"
                      onClick={() => onDeleteAction?.()}
                      disabled={overlayDisabled}
                    >
                      <DeleteIcon />
                    </ShadowButton>
                  </div>
                )}
                {showPlusAction && (
                  <div
                    className="pointer-events-auto"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShadowButton
                      color="point"
                      onClick={() => onPlusAction?.()}
                      disabled={overlayDisabled}
                    >
                      <PlusIcon />
                    </ShadowButton>
                  </div>
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        </ComponentTag>
      );
    },
  ),
);

export default BaseProfileChip;
