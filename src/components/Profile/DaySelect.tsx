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
        rounded-[6px] border-solid border border-[#c4c4c6] text-[14px] text-[#949598] font-[600]
        ${isActive ? 'border-[#3385FF] text-black' : 'border-[#c4c4c6] text-[#949598]'}
        ${className ?? ''}`}
      > {children} </button>
    );
  };
  
  export default DaySelect;