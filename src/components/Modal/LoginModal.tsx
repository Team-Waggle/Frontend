import { useEffect } from 'react';
import CloseBtn from '../../assets/login/icon/icon-close.svg?react';
import Logo from '../../assets/login/icon/icon-symbol_m.svg?react';
import GoogleBtn from '../../assets/login/button/btn-google-m.svg?react';
import KakaoBtn from '../../assets/login/button/btn-kakao-m.svg?react';
import styled from 'styled-components';

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <LogoIcon />
        <Text>Waggle에 오신 것을 환영합니다!</Text>
        <ButtonContainer>
          {/* 현재는 네이버 로그인으로 진행, 추후 변경할 것 */}
          <GoogleLoginBtn
            onClick={() => {
              window.location.href =
                'https://waggle.o-r.kr/api/oauth2/authorization/naver';
            }}
          />
          <KakaoLoginBtn
            onClick={() => {
              window.location.href =
                'https://waggle.o-r.kr/api/oauth2/authorization/naver';
            }}
          />
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  position: relative;
  background: #ffffff;
  border-radius: 8px;
  width: 426px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled(CloseBtn)`
  position: absolute;
  top: 19px;
  right: 21px;
  cursor: pointer;
`;

const LogoIcon = styled(Logo)`
  margin-top: 74px;
`;

const Text = styled.span`
  margin-top: 29px;
  font-size: 26px;
  font-weight: 600;
  line-height: 39px;
`;

const ButtonContainer = styled.div`
  display: grid;
  margin-top: 51px;
  width: 316px;
  height: 60px;
  gap: 12px;
`;

const GoogleLoginBtn = styled(GoogleBtn)`
  cursor: pointer;
`;

const KakaoLoginBtn = styled(KakaoBtn)`
  cursor: pointer;
`;

export default LoginModal;
