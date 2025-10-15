import React from 'react';
import type { ColumnVariant } from '../../../types/table';

const bodyVariant: Record<ColumnVariant, string> = {
  default:
    'flex h-[6rem] min-w-[8.6rem] max-w-[9.8rem] px-[1.2rem] py-0 justify-center items-center flex-shrink-0',
  fixed: 'flex w-[9.8rem] h-[6rem] justify-center items-center flex-shrink-0',
  tag: 'flex w-[9.8rem] h-[6rem] pl-[1.6rem] items-center flex-shrink-0',
  skill: 'flex w-[14.4rem] h-[6rem] justify-center items-center flex-shrink-0 gap-[1rem]',
  title:
    'flex basis-0 grow h-[6rem] min-w-0 px-[1.2rem] items-center overflow-hidden overflow-ellipsis',
  icon: 'flex h-[6rem] min-w-[6rem] px-[1.2rem] py-0 justify-center items-center gap-[1rem] flex-shrink-0',
  icon1: 'flex w-[6rem]  h-[6rem] items-center justify-center',
  icon2: 'flex w-[9.8rem] h-[6rem] items-center justify-center',
  icon3: 'flex w-[14rem] h-[6rem] items-center justify-center',
};

const headVariant: Record<ColumnVariant, string> = {
  default:
    'text-center flex h-[3.2rem] min-w-[8.6rem] max-w-[9.8rem] px-[1.2rem] py-0 justify-center items-center flex-shrink-0',
  tag: 'text-center flex w-[9.8rem] h-[3.2rem] justify-center items-center flex-shrink-0',
  fixed:
    'text-center flex w-[9.8rem] h-[3.2rem] justify-center items-center flex-shrink-0',
  skill:
    'flex w-[14.4rem] h-[3.2rem] px-[1.2rem] py-0 items-center flex-shrink-0',
  title:
    'flex flex-1 h-[3.2rem] min-w-[6rem] px-[1.2rem] py-0 items-center flex-shrink-0 overflow-hidden overflow-ellipsis',
  icon: 'flex w-[6rem] h-[3.2rem] min-w-[6rem] justify-center items-center flex-shrink-0',
  icon1:
    'flex w-[6rem] h-[3.2rem] min-w-[6rem] justify-center items-center flex-shrink-0 gap-[1rem]',
  icon2:
    'flex w-[9.8rem] h-[3.2rem] min-w-[9.8rem] justify-center items-center flex-shrink-0 gap-[1rem]',
  icon3:
    'flex w-[14rem] h-[3.2rem] min-w-[14rem] justify-center items-center flex-shrink-0 gap-[1rem]',
};

// 헤더(Table Header) Frame
export function ThFrame({
  children,
  variant = 'default',
  className,
}: {
  children: React.ReactNode;
  variant?: ColumnVariant;
  className?: string;
}) {
  return (
    <div
      className={`bg-black-10 text-caption-12_M500 text-black-70 ${headVariant[variant]} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

// 셀 데이터(Table Data) Frame
export function TdFrame({
  children,
  variant = 'default',
  title,
  className,
}: {
  children: React.ReactNode;
  variant?: ColumnVariant;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-black-10 text-body-14_M500 text-black-130 ${bodyVariant[variant]} ${className ?? ''}`}
      title={title}
    >
      {children}
    </div>
  );
}
