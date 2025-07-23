import React from 'react';
import BaseBasicChip from '../BasicChip/BaseBasicChip';
import { DEFAULT_IDENTITY_CHIP_SIZE_STYLE, MBTI_IDENTITY_CHIP_SIZE_STYLE } from './styles';

interface IdentityChipProps {
  type?: 'default' | 'mbti';
  size?: 'xs' | 'md' | 'xl';
  isError?: boolean;
  isActive?: boolean;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const IdentityChip = ({
  type = 'default',
  size = 'md',
  isError = false,
  isActive = false,
  children,
  className,
  onClick,
}: IdentityChipProps) => {
  const sizeStyle =
    type === 'mbti'
      ? MBTI_IDENTITY_CHIP_SIZE_STYLE[size]
      : DEFAULT_IDENTITY_CHIP_SIZE_STYLE[size];


  return (
    <BaseBasicChip
      shape="square"
      isError={isError}
      isActive={isActive}
      onClick={onClick}
      className={`${sizeStyle} ${className ?? ''}`}
    >
      {children}
    </BaseBasicChip>
  );
};

export default IdentityChip;
