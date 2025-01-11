import styled from "styled-components";
import LogoIcon from "../assets/images/icon/logoIcon.svg";
import UserIcon from "../assets/images/icon/userIcon.svg";
import BellPlusIcon from "../assets/images/icon/bellPlusIcon.svg";
import { Outlet } from "react-router-dom";

const Header = () => {
  return (
    <>
      <Wrapper>
        <img src={LogoIcon} alt="로고 이미지" />
        <NavItem>
          <img src={BellPlusIcon} alt="" style={{ cursor: "pointer" }} />
          <img src={UserIcon} alt="" style={{ cursor: "pointer" }} />
        </NavItem>
      </Wrapper>
      <Outlet />
    </>
  );
};

export default Header;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 1200px;
  height: 92px;
  padding: 0 24px 0 36px;
  background: linear-gradient(
    180deg,
    #ffffff 62.5%,
    rgba(255, 255, 255, 0.5) 83%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const NavItem = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 88px;
  height: 44px;
`;
