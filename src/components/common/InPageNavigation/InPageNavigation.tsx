import { InPageNavigationProps, NavigationSize } from "../../../types/inPageNavigation"

const InPageNavigation = ({ size="xl", items, isActive = false, onClick }: InPageNavigationProps) => {
    const widthMap: Record<NavigationSize, string> = {
    xl: "w-[26.4rem]",
    md: "w-[26.4rem]",
    sm: "w-[25rem]",
  };

  const widthStyle = widthMap[size];
  
    return (
    <div
    onClick={onClick}
    className={`flex ${widthStyle} h-[4rem] min-w-[25rem] max-w-[26.4rem] px-[2.2rem] items-center flex-shrink-0 rounded-[6px]
     ${isActive ? "bg-black-10" : "hover:bg-black-30 active:bg-black-30"}`}>
        <span className="text-black-130 text-body-14_M500"> {items} </span>
    </div>
  );
};

export default InPageNavigation;
