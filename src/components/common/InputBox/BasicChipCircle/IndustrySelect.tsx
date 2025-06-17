import React, { useState } from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

// text-13px이 default 근데 13px로 하니 줄바꿈이 된다...? 

const IndustrySelect = ({isActive=false, children, className, ...rest }: StyledButtonProps) => {
    return (
      <button
        {...rest}
        className={`flex h-[var(---32-,32px)] py-[8px] px-[var(---32-,16px)] items-center justify-center gap-[12px]
        rounded-[99px] border-solid border  text-[13px] font-[500] whitespace-nowrap
        ${isActive ? 'border-primary-60 text-black' : 'border-black-60 text-black-70'}
        ${className ?? ''}`}
      > {children} </button>
    );
  };
  
  export default IndustrySelect;