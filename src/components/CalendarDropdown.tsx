import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import CalendarIcon from "../assets/images/icon/calendarIcon.svg";

interface DropdownProps {
  title: string;
}

const CalendarDropdown = ({ title }: DropdownProps) => {
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
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        {selectedItem}
        <img src={CalendarIcon} alt="" />
      </DropdownButton>
      {isOpen && (
        <DropdownContent>
          {/* {items.map((item) => (
            <DropdownItem onClick={() => handleItemClick(item)}>
              {item}
            </DropdownItem>
          ))} */}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  margin-top: 8px;
`;

const DropdownButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #bababb;
  padding: 8px 18px;
  width: 358px;
  height: 46px;
  color: #a2a2a4;
  text-align: left;
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #ffffff;
  border: 1px solid black;
  width: 308px;
  height: 496px;
  /* max-height: 496px; */
  overflow-y: scroll;
  border-radius: 12px;
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

export default CalendarDropdown;
