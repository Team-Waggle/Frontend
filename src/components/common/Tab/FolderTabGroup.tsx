import React from "react";
import FolderTab from "./FolderTab";

interface TabItem {
  id: string | number; 
  label: React.ReactNode;
  className?: string;
}

interface FolderTabGroupProps {
  tabs: TabItem[];
  activeIndex: number;
  onTabChange?: (index: number) => void;
  className?: string;
}

export const FolderTabGroup: React.FC<FolderTabGroupProps> = ({
  tabs,
  activeIndex,
  onTabChange,
  className="",
}) => {
  const handleClick = (index: number) => {
    if (onTabChange) onTabChange(index);
  };

  return (
    <div className={`flex h-[7rem] items-center justify-between self-stretch rounded-tl-[1.2rem] rounded-tr-[1.2rem] bg-black-30 ${className}`}>
      {tabs.map((tab, idx) => (
        <FolderTab
          key={tab.id ?? idx}
          isActive={idx === activeIndex}
          onClick={() => handleClick(idx)}
          className={`flex-1 basis-0 cursor-pointer ${tab.className ?? ""}`}
        >
          {tab.label}
        </FolderTab>
      ))}
    </div>
  );
};
