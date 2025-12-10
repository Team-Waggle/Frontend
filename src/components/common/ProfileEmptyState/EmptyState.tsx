import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  dataEmpty?: string;
  className?: string;
  children?: ReactNode;
}

const EmptyState = ({
  icon,
  dataEmpty,
  className = '',
  children,
}: EmptyStateProps) => {
  return (
    <div
      data-empty={dataEmpty}
      className={
        'flex h-full w-full flex-col items-center justify-center gap-[1.6rem] ' +
        className
      }
    >
      {icon}
      <div>
        <span className="text-caption-16_M500 text-black-70">{children}</span>
      </div>
    </div>
  );
};

export default EmptyState;
