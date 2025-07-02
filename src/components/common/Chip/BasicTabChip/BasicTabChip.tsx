import React, { useState } from 'react';
import { BASIC_TAB_CHIP_BASE_STYLE, BASIC_TAB_CHIP_STATE_STYLE } from './styles';

export type BasicTabChipState = 'default' | 'hover' | 'active' | 'error';

interface BasicTabChipProps {
  state?: BasicTabChipState;
  children?: React.ReactNode;
  className?: string;
}

const BasicTabChip = ({ state, children, className }: BasicTabChipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const computedState: BasicTabChipState = state
    ?? (isActive ? 'active' : isHovered ? 'hover' : 'default');

  const baseStyle = BASIC_TAB_CHIP_BASE_STYLE;
  const stateStyle = BASIC_TAB_CHIP_STATE_STYLE[computedState];

  return (
    <div
      className={`${baseStyle} ${stateStyle} ${className ?? ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      {children}
    </div>
  );
};

export default BasicTabChip;
