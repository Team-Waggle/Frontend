import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import TriangleDownIcon from "../assets/profile/icon/icon-triangle-down.svg?react";

interface DropdownProps {
  items: string[];
  title: string;
  className?: string;
}

const DropdownC = ({ items, title, className }: DropdownProps) => {
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full" ref={dropdownRef}>
      <button className="flex h-[var(---46-, 46px)] pr-[var(--46-,8px)] pl-[var(--46-,18px)] 
      justify-between items-center shrink-[0] self-stretch
      rounded-[8px] border border-[#c4c4c6] align-center text-[16px] text-[#949598] font-[500] leading-[165%]
      flex-1 shrink-0 basis-0" onClick={toggleDropdown}>
        {selectedItem}
        <TriangleDownIcon
          className={`w-[44px] h-[44px] justify-center items-center gap-[10px] shrink transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : "rotate-0"
            }`}
        />
      </button>
      {isOpen && (
        <DropdownContent>
          {items.map((item) => (
            <DropdownItem onClick={() => handleItemClick(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </div>
  );
};

const DropdownContent = styled.div`
  position: absolute;
  background-color: white;
  width: 358px;
  max-height: 216px;
  overflow-y: scroll;
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 3px 12px 0px #8c8c8c26;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 8px 16px;
  height: 40px;
  text-decoration: none;
  cursor: pointer;
  color: #a2a2a4;

  &:hover {
    background-color: #f2f7ff;
    color: #17171b;
  }
`;

export default DropdownC;
