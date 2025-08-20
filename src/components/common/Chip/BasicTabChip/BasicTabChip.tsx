import React, { useState } from 'react';
import {
  BASIC_TAB_CHIP_BASE_STYLE,
  BASIC_TAB_CHIP_STATE_STYLE,
} from './styles';

export type BasicTabChipState = 'default' | 'hover' | 'active' | 'error';

interface BasicTabChipProps {
  state?: BasicTabChipState;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const BasicTabChip = ({
  state = 'default',
  children,
  className,
  onClick,
}: BasicTabChipProps) => {
  const [isHovered, setIsHovered] = useState(false);

const computedState: BasicTabChipState =
  state === 'active' || state === 'error' ? state : isHovered ? 'hover' : 'default';

  const baseStyle = BASIC_TAB_CHIP_BASE_STYLE;
  const stateStyle = BASIC_TAB_CHIP_STATE_STYLE[computedState];
  
  return (
    <div
      className={`${baseStyle} cursor-pointer ${stateStyle} ${className ?? ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BasicTabChip;
