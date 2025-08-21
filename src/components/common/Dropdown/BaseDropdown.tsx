import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { DropdownProps } from '../../../types/dropdown';
import BaseCheckbox from '../Checkbox/BaseCheckbox';
import BaseRadioBtn from '../RadioBtn/BaseRadioBtn';
import ArrowLineDown from '../../../assets/icons/ic_arrow_down_large.svg?react';
import IconWrapper from '../IconWrapper/IconWrapper';

const BaseDropdown = ({
  leftIcon,
  title,
  contentList,
  selected,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const MAX_HEIGHT = 330; // 33rem = 330px

  useEffect(() => {
    if (isOpen && contentRef.current) {
      const scrollHeight = contentRef.current.scrollHeight;
      setHeight(Math.min(scrollHeight, MAX_HEIGHT));
    }
  }, [isOpen, contentList.length]);

  const dropdownVariants: Variants = {
    open: {
      opacity: 1,
      height: height,
      transition: {
        type: 'spring',
        mass: 1,
        stiffness: 320,
        damping: 40,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        type: 'spring',
        mass: 1,
        stiffness: 80,
        damping: 20,
      },
    },
  };

  return (
    <div className="w-[23rem]">
      {/* 드롭다운 버튼 */}
      <div
        className="flex h-[5.6rem] cursor-pointer items-center justify-between border-b border-solid border-black-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-[0.8rem] pl-[1.2rem]">
          {leftIcon}
          <span className="text-caption-16_M500 text-black-100">{title}</span>
        </div>
        <IconWrapper>
          <ArrowLineDown
            className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform`}
          />
        </IconWrapper>
      </div>

      {/* 드롭다운 메뉴 */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="overflow-hidden border-b border-solid border-black-50"
          >
            <div
              ref={contentRef}
              className="max-h-[33rem] overflow-y-auto px-[1rem] pb-[1rem] pt-[0.4rem] scrollbar scrollbar-thumb-black-60 scrollbar-thumb-rounded-[9.9rem] scrollbar-w-[0.4rem]"
            >
              {contentList.map((data) => {
                if (title === '진행 방식') {
                  return (
                    <BaseRadioBtn
                      key={data.id}
                      name="progressType"
                      label={data.label}
                      value={data.id}
                      checked={selected.includes(data.id)}
                      onChange={(checked) =>
                        onChange(data.id, checked, 'radio')
                      }
                    >
                      {data.label}
                    </BaseRadioBtn>
                  );
                }
                return (
                  <BaseCheckbox
                    key={data.id}
                    label={data.label}
                    checked={selected.includes(data.id)}
                    onChange={(checked) =>
                      onChange(data.id, checked, 'checkbox')
                    }
                  >
                    {data.label}
                  </BaseCheckbox>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BaseDropdown;
