import React, { useState } from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  children: React.ReactNode;
}

const DaySelect = ({isActive=false, children, className, ...rest }: StyledButtonProps) => {
    return (
      <button
        {...rest}
        className={`flex w-[42px] h-[42px] py-[0px] px-[10px] items-center justify-center gap-[auto]
        rounded-[6px] border-solid border text-[14px] font-[600]
        ${isActive ? 'border-primary-60 text-black' : 'border-black-60 text-black-70'}
        ${className ?? ''}`}
      > {children} </button>
    );
  };
  
  export default DaySelect;