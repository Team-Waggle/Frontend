import styled from "styled-components";
import hamburgerBtn from "../assets/menu.svg";
import logo from "../assets/logo.svg";

type HeaderProps = {
  onClick: () => void;
};

type HeaderButtonProps = {
  color: string;
  hoverColor: string;
};

const Header = ({ onClick }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <HeaderContents>
        <HamburgerBtn
          src={hamburgerBtn}
          alt="필터 목록을 여닫을 수 있는 햄버거 버튼"
          onClick={onClick}
        />
        <Logo src={logo} alt="" />
      </HeaderContents>
      <HeaderContents>
        <HeaderButton color="#0066FF" hoverColor="#F2F7FF">
          팀원 모집
        </HeaderButton>
        <CenterBar />
        <HeaderButton color="#17171B" hoverColor="#F3F3F3">
          로그인
        </HeaderButton>
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
  cursor: pointer;
`;

const Logo = styled.img`
  padding: 10px;
`;

const HeaderButton = styled.button<HeaderButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  padding: 4px 16px;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-size: 16px;
  font-weight: 600;
  color: ${({ color }) => color};
  cursor: pointer;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor};
  }
`;

const CenterBar = styled.div`
  width: 1px;
  height: 18px;
  background-color: #bababb;
`;
