import Dropdown from "./Dropdown";
import RequireIcon from "../assets/images/icon/requireIcon.svg";
import styled from "styled-components";

interface DropdownWithLabelProps {
  items: string[];
  label: string;
  title: string;
}

const DropdownWithLabel = ({ items, label, title }: DropdownWithLabelProps) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <Label>{label}</Label>
        <img src={RequireIcon} alt="" />
      </div>
      <Dropdown items={items} title={title} />
    </div>
  );
};

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
`;
export default DropdownWithLabel;
