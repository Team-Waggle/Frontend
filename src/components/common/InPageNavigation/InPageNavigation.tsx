import { InPageNavigationProps } from '../../../types/inPageNavigation';

const InPageNavigation = ({
  items,
  isActive = false,
  onClick,
}: InPageNavigationProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex h-[4rem] w-[25rem] flex-shrink-0 items-center rounded-[6px] px-[2.2rem] ${isActive ? 'bg-black-30' : 'hover:bg-black-30 active:bg-black-30'}`}
      data-active={isActive ? 'true' : 'false'}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className="text-body-14_M500 text-black-130">{items}</span>
    </div>
  );
};

export default InPageNavigation;
