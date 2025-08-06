import { useEffect, useRef, useState } from 'react';
import TriangleDownIcon from '../assets/icons/ic_arrow_down_small.svg?react';

interface DropdownProps {
  items: string[];
  title: string;
  className?: string;
  width?: string;
}

const DropdownC = ({
  items,
  title,
  width = 'w-[358px]',
}: DropdownProps) => {
  const [selectedItem, setSelectedItem] = useState(title);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex ${width} align-center h-[46px] shrink-0 basis-0 items-center justify-between self-stretch rounded-[8px] border border-solid border-[#c4c4c6] pl-[var(--46-,18px)] pr-[var(--46-,8px)] text-body-16_M500 text-[#949598]`}
      >
        {selectedItem}

        <TriangleDownIcon
          className={`h-[44px] w-[44px] shrink items-center justify-center gap-[10px] transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* mt 수정 해야함 */}
      {isOpen && (
        <div
          style={{ boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.12)' }}
          className="absolute z-10 mt-[10px] flex h-[216px] shrink-0 flex-col items-start self-stretch overflow-y-scroll rounded-[8px] border bg-black-10 px-0 pb-[6px] pt-[2px] scrollbar-hide"
        >
          {items.map((item) => (
            <div
              onClick={() => handleItemClick(item)}
              className={`flex ${width} h-[46px] flex-shrink-0 cursor-pointer items-center self-stretch rounded-[6px] bg-black-10 pl-[var(--46-,18px)] pr-[var(--46-,8px)] 
              text-body-16_M500 text-black-70 hover:bg-primary-10 hover:text-black-130`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownC;
