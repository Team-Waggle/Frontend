import GoogleBtn from '../assets/images/icon/btn-google-02.svg?react';
import KakaoBtn from '../assets/images/icon/btn-kakao-02.svg?react';
import Logo from '../assets/images/icon/icon-symbol_small.svg?react';
import CloseBtn from '../assets/images/icon/icon-closeBtn.svg?react';
import styled from 'styled-components';

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} />
        <LogoIcon />
        <Text>Waggle에 오신 것을 환영합니다!</Text>
        <ButtonContainer>
          <GoogleLoginBtn
            onClick={() => {
              window.location.href =
                'https://waggle.o-r.kr/api/oauth2/authorization/naver';
            }}
            // onClick={async () => {
            //   try {
            //     const response = await axios.get(
            //       'https://waggle.o-r.kr/api/oauth2/authorization/naver',
            //     );
            //     console.log(response);
            //   } catch (error) {
            //     console.log(error);
            //   }
            // }}
          />
          <KakaoLoginBtn onClick={() => console.log('kakao')} />
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
  width: 328px;
  height: 346px;
`;

const CloseButton = styled(CloseBtn)`
  position: absolute;
  top: 19px;
  right: 21px;
  cursor: pointer;
`;

const LogoIcon = styled(Logo)`
  position: absolute;
  top: 54px;
  left: 102px;
`;

const Text = styled.span`
  position: absolute;
  top: 136px;
  left: 46px;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
`;

const ButtonContainer = styled.div`
  display: grid;
  position: absolute;
  width: 242px;
  height: 102px;
  top: 190px;
  left: 43px;
  gap: 10px;
`;

const GoogleLoginBtn = styled(GoogleBtn)`
  cursor: pointer;
`;

const KakaoLoginBtn = styled(KakaoBtn)`
  cursor: pointer;
`;

export default LoginModal;
