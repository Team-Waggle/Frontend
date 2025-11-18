import { useEffect, useRef, useState } from 'react';
import TriangleDownIcon from '../../../assets/icons/ic_arrow_down_small.svg?react';
import { SelectTextInProps } from '../../../types/SelectTextIn';
import {
  BASE_SELECT_TEXT_IN_STYLE,
  SELECT_TEXT_IN_STATE_STYLE,
} from './styles';

// SelectTextIn

/**
 * items: 드롭다운에 표시할 아이템 목록 { id: string; label: string }[]
 * value: 선택된 아이템의 id
 * title: 초기 placeholder 텍스트
 * type: default | outline (default는 배경이 흰색으로 차있는 스타일)
 * state: up | down padding 값에 따라 글자의 위치 변경
 */

const SelectTextIn = ({
  items,
  value,
  onChange,
  title,
  type = 'outline',
  state = 'down',
}: SelectTextInProps) => {
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

  const handleItemClick = (item: { id: string; label: string }) => {
    setSelectedItem(item.label);
    onChange?.(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (value !== undefined && value !== '') {
      const selected = items.find((item) => item.id === value);
      if (selected) setSelectedItem(selected.label);
    }
  }, [value, items]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getButtonClassName = (type: 'default' | 'outline' = 'default') => {
    const base = BASE_SELECT_TEXT_IN_STYLE;

    if (type === 'outline') {
      return `${base} border border-solid border-black-50`;
    }
    return `${base} bg-black-10`;
  };

  const getItemClassName = (state: 'up' | 'down' = 'down') => {
    const padding =
      state === 'up' ? 'pt-[0.2rem] pb-[0.8rem]' : 'pt-[0.8rem] pb-[0.2rem]';
    return `${SELECT_TEXT_IN_STATE_STYLE.default} ${padding} ${SELECT_TEXT_IN_STATE_STYLE.hover}`;
  };

  return (
    <div
      ref={dropdownRef}
      className="relative flex w-[9.4rem] flex-shrink-0 flex-col items-start gap-[0.6rem]"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${getButtonClassName(type)} text-caption-13_M500`}
      >
        <div>{selectedItem}</div>
        <div className="flex h-[4.4rem] items-center justify-center gap-[1rem]">
          <TriangleDownIcon
            className={`transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div
          className={`absolute top-full z-50 box-border flex flex-col items-start rounded-[0.4rem] border bg-black-10 shadow-dropbox`}
        >
          {items
            .filter((item) => item.label !== selectedItem)
            .map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={getItemClassName(state)}
              >
                {item.label}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SelectTextIn;
