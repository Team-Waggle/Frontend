import styled from "styled-components";
import HambutgerBtnIcon from "../../assets/images/icon/hamburgerBtnIcon.svg";
import LogoIcon from "../../assets/images/icon/logoIcon.svg";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  onClick: () => void;
};

type HeaderButtonProps = {
  color: string;
  hoverColor: string;
};

const MainHeader = ({ onClick }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <HeaderContents>
        <HamburgerBtn
          src={HambutgerBtnIcon}
          alt="필터 목록을 여닫을 수 있는 햄버거 버튼"
          onClick={onClick}
        />
        <img src={LogoIcon} alt="" />
      </HeaderContents>
      <HeaderContents>
        <HeaderButton
          color="#0066FF"
          hoverColor="#F2F7FF"
          onClick={() => navigate("/newapply")}
        >
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

export default MainHeader;

const HeaderWrapper = styled.div`
  /* position: fixed; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 90px;
  padding: 0 24px 0 36px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e9;
`;

const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 187px;
  height: 44px;
`;

const HamburgerBtn = styled.img`
  cursor: pointer;
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
