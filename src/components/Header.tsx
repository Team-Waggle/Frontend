import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginModal from './LoginModal';
import LogoIcon from '../assets/images/icon/logoIcon.svg?react';
import BellPlusIcon from '../assets/images/icon/bellPlusIcon.svg?react';
import UserIcon from '../assets/images/icon/userIcon.svg?react';

type HeaderButtonProps = {
  color: string;
  hoverColor: string;
};

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('AccessToken')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <HeaderWrapper>
      {/* <HeaderContents> */}
      <Logo onClick={() => navigate('/')} />
      {/* </HeaderContents> */}
      <HeaderContents>
        <HeaderButton
          color="#0066FF"
          hoverColor="#F2F7FF"
          onClick={() => navigate('/newapply')}
        >
          팀원 모집하기
        </HeaderButton>
        <CenterBar />
        {isLoggedIn ? (
          <>
            <BellPlusIcon />
            <UserIcon />
          </>
        ) : (
          <HeaderButton
            color="#17171B"
            hoverColor="#F3F3F3"
            onClick={() => setIsModalOpen(true)}
          >
            로그인
          </HeaderButton>
        )}
      </HeaderContents>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  /* position: fixed; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 730px;
  width: 1200px;
  height: 70px;
  padding: 0px 20px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e9;
`;

const HeaderContents = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  /* width: 214px; */
  height: 44px;
`;

const Logo = styled(LogoIcon)`
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
