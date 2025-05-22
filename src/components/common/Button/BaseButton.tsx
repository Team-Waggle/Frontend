import { forwardRef, memo, useMemo } from 'react';
import { BaseButtonProps } from '../../../types/button';
import { BUTTON_COLOR_STYLES, BUTTON_SIZE_STYLES } from './styles';

const BaseButton = memo(
  forwardRef<HTMLButtonElement, BaseButtonProps>(
    (
      {
        size = 'md',
        color = 'primary',
        leftIcon,
        rightIcon,
        disabled,
        className,
        children,
      },
      ref,
    ) => {
      const buttonStyles = useMemo(() => {
        return `${BUTTON_SIZE_STYLES[size]} ${BUTTON_COLOR_STYLES[color]} ${className || ''}`;
      }, [size, color, className]);
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={buttonStyles + 'flex items-center'}
        >
          {leftIcon && <>{leftIcon}</>}
          {children}
          {rightIcon && <>{rightIcon}</>}
        </button>
      );
    },
  ),
);

export default BaseButton;
