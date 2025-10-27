import React from "react";
import clsx from "clsx";

type LineTabProps = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

const LineTab = ({ children, isActive = false, onClick }: LineTabProps) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className={clsx(
        "relative flex w-[7.5rem] h-[3.4rem] px-[1rem] flex-col justify-center items-center gap-[1rem] flex-shrink-0",
        "bg-black-10 text-caption-12_M500 cursor-pointer",
        isActive ? "text-black-130" : "text-black-70",
        "hover:bg-black-30 transition-colors duration-200",
        "border-0",
        isActive
          ? "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:h-px after:bg-black-80"
          : "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-1px] after:h-px after:bg-transparent",
      )}
    >
      {children}
    </div>
  );
};

export default LineTab;
