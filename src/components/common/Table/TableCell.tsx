import React from 'react';

export type CellCategory = 'division' | 'content';

export type DivisionType =
  | 'default'
  | 'fixed'
  | 'skill'
  | 'title'
  | 'icon1'
  | 'icon2'
  | 'icon3';

export type ContentType =
  | 'default'
  | 'fixed'
  | 'tag'
  | 'skill'
  | 'title'
  | 'icon';

interface BaseCellProps {
  children: React.ReactNode;
  className?: string;
}

function BaseDivisionCell({ children, className }: BaseCellProps) {
  const base = 'text-black-70 text-caption-12_M500 bg-black-10';
  return (
    <td>
      <div className={`${base} ${className ?? ''}`}>{children}</div>
    </td>
  );
}

function BaseContentCell({ children, className }: BaseCellProps) {
  const base = 'text-black-130 text-body-14_M500 bg-black-10';
  return (
    <td>
      <div className={`${base} ${className ?? ''}`}>{children}</div>
    </td>
  );
}

export function DivisionCell({
  variant,
  children,
}: {
  variant: DivisionType;
  children: React.ReactNode;
}) {
  const variants: Record<DivisionType, string> = {
    default:
      'text-center inline-flex h-[3.2rem] min-w-[8.6rem] max-w-[9.8rem] px-[1.2rem] py-0 justify-center items-center flex-shrink-0',
    fixed:
      'text-center flex w-[9.8rem] h-[3.2rem] justify-center items-center flex-shrink-0',
    skill:
      'flex w-[14.4rem] h-[3.2rem] px-[1.2rem] py-0 items-center flex-shrink-0',
    title:
      'flex flex-1 h-[3.2rem] min-w-[6rem] px-[1.2rem] py-0 items-center flex-shrink-0 overflow-hidden overflow-ellipsis',
    icon1:
      'flex w-[6rem] h-[3.2rem] min-w-[6rem] justify-center items-center flex-shrink-0',
    icon2:
      'flex w-[9.8rem] h-[3.2rem] min-w-[9.8rem] justify-center items-center flex-shrink-0',
    icon3:
      'flex w-[14rem] h-[3.2rem] min-w-[14rem] justify-center items-center flex-shrink-0',
  };

  return (
    <BaseDivisionCell className={variants[variant]}>
      {children}
    </BaseDivisionCell>
  );
}

export function ContentCell({
  variant,
  children,
}: {
  variant: ContentType;
  children: React.ReactNode;
}) {
  const variants: Record<ContentType, string> = {
    default:
      'inline-flex h-[6rem] min-w-[8.6rem] max-w-[9.8rem] px-[1.2rem] py-0 justify-center items-center flex-shrink-0',
    fixed: 'flex w-[9.8rem] h-[6rem] justify-center items-center flex-shrink-0',
    tag: 'flex w-[9.8rem] h-[6rem] pl-[1.6rem] items-center flex-shrink-0', // 안에 Tag 컴포넌트가 들어간다.
    skill:
      'flex w-[14.4rem] h-[6rem] justify-center items-center flex-shrink-0',
    title:
      'flex flex-1 h-[6rem] min-w-[0.1rem] px-[1.2rem] py-0 items-center flex-shrink-0',
    icon: 'inline-flex h-[6rem] min-w-[6rem] px-[1.2rem] py-0 justify-center items-center gap-[1rem] flex-shrink-0',
  };

  return (
    <BaseContentCell className={variants[variant]}>{children}</BaseContentCell>
  );
}
