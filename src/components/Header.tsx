import styled from "styled-components";
import hamburgerBtn from "../assets/menu.svg";
import logo from "../assets/logo.svg";

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderContents>
        <HamburgerBtn src={hamburgerBtn} alt="" />
        <Logo src={logo} alt="" />
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
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 32px;
  padding: 34px 24px 34px 36px;
  background-color: white;
`;

const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HamburgerBtn = styled.img`
  padding: 16px 13px;
`;

const Logo = styled.img`
  padding: 10px;
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
