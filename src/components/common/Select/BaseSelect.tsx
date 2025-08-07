import { useEffect, useRef, useState } from 'react';
import TriangleDownIcon from '../../../assets/icons/ic_arrow_down_large.svg?react';

import { BaseSelectProps } from '../../../types/Select';
import { BASE_SELECT_STYLE, SELECT_STATE_STYLE } from './styles';

const BaseSelect = ({
  items,
  title,
  width = 'w-[35.8rem]',
  disabled = false,
  hasError = false,
  className,
}: BaseSelectProps) => {
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

  const getButtonClassName = () => {
  if (disabled) return `${BASE_SELECT_STYLE} ${SELECT_STATE_STYLE.disabled}`;
  if (hasError) return `${BASE_SELECT_STYLE} ${SELECT_STATE_STYLE.error}`;
  if (isOpen) return `${BASE_SELECT_STYLE} ${SELECT_STATE_STYLE.active}`;
  return `${BASE_SELECT_STYLE} ${SELECT_STATE_STYLE.default} ${SELECT_STATE_STYLE.hover}`;
};

  return (
    <div ref={dropdownRef} className="relative flex flex-col items-start flex-shrink-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${getButtonClassName()} ${width} ${className || ''}`}
      >
        <div> {selectedItem} </div>
        <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center gap-[1rem]">
          <TriangleDownIcon
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute ${width} mt-[0.8rem] top-full shadow-dropbox z-10 box-border flex max-h-[21.6rem] overflow-y-auto
          flex-col items-start self-stretch rounded-[0.8rem] border bg-black-10 pb-[0.6rem] pt-[0.2rem]`}
        >
          {items.map((item) => (
            <div
              key={item}
              onClick={() => handleItemClick(item)}
              className={`box-border flex h-[4.6rem] flex-shrink-0 cursor-pointer items-center self-stretch rounded-[0.6rem]
                 bg-black-10 pl-[1.8rem] pr-[0.8rem] text-body-16_M500 text-black-70 hover:bg-primary-10 hover:text-black-130`}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BaseSelect;
