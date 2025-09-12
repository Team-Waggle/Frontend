import React from "react";

type LineTabProps = {
  children: React.ReactNode;
  isActive?: boolean;
};

const LineTab = ({ children, isActive = false }: LineTabProps) => {
  return (
    <div
      className={`flex w-[7.5rem] h-[3.4rem] px-[1rem] flex-col justify-center items-center gap-[1rem] flex-shrink-0 
        border border-solid bg-black-10 border-x-black-10 border-t-black-10 text-caption-12_M500
        ${
          isActive
            ? "border-b-black-80 text-black-130"
            : "border-b-black-50 text-black-70"
        }
        hover:bg-black-30 hover:border-b-black-50
        transition-colors duration-200
      `}
    >
      {children}
    </div>
  );
};

export default LineTab;
