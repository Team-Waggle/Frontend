import React from 'react';
import BaseBadge from '../Tag/BaseBadge';

type FolderTabProps = {
  TabTitle: React.ReactNode;
  TabAlarm?: number;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
};

const FolderTab = ({
  TabTitle,
  TabAlarm,
  isActive = false,
  className = '',
  onClick,
}: FolderTabProps) => {
  const badge =
    TabAlarm && TabAlarm > 0 ? (
      <BaseBadge size="lg">{TabAlarm > 99 ? '99+' : TabAlarm}</BaseBadge>
    ) : null;

  return (
    <div
      className={`inline-flex h-[7rem] min-w-[10.6rem] flex-shrink-0 flex-wrap content-center items-center justify-center gap-[0.6rem] px-[3.2rem] py-0 text-body-16_M500 hover:text-black-130 ${
        isActive
          ? 'rounded-tl-[12px] rounded-tr-[12px] border border-solid border-b-black-10 border-l-black-50 border-r-black-50 border-t-black-50 bg-black-10 text-black-130'
          : 'text-black-70'
      } ${className}`}
      onClick={onClick}
    >
      <div>
        <span className="whitespace-nowrap">{TabTitle}</span>
      </div>
      {badge}
    </div>
  );
};

export default FolderTab;
