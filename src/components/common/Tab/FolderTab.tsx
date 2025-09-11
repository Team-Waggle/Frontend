import React from 'react';

type FolderTabProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

const FolderTab = ({ children, isActive = false }: FolderTabProps) => {
  return (
    <div
      className={`inline-flex h-[7rem] min-w-[10.6rem] flex-shrink-0 flex-wrap content-center items-center justify-center gap-[0.6rem] px-[3.2rem] py-0 text-body-16_M500 bg-black-10 hover:text-black-130 ${
        isActive
          ? 'rounded-tl-[12px] rounded-tr-[12px] border border-solid border-l-black-50 border-r-black-50 border-t-black-50 border-b-black-10 text-black-130'
          : ' text-black-70'
      }`}
    >
      {children}
    </div>
  );
};

export default FolderTab;
