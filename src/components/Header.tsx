import styled from "styled-components";
import HamburgerBtn from "../assets/menu.svg";
import Logo from "../assets/logo.svg";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContents>
        <img src={HamburgerBtn} alt="" />
        <img src={Logo} alt="" />
      </HeaderContents>
      <HeaderContents>
        <HeaderButton color="#0066FF">팀원 모집</HeaderButton>
        <CenterBar></CenterBar>
        <HeaderButton color="#17171B">로그인</HeaderButton>
      </HeaderContents>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 34px 24px 34px 36px;
  height: 32px;
`;

const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 16px;
  border: none;
  background-color: white;
  font-size: 16px;
  font-weight: 600;

  ${({ color }) => color && `color: ${color}`}
`;

const CenterBar = styled.div`
  width: 1px;
  height: 18px;
  background-color: #bababb;
`;
