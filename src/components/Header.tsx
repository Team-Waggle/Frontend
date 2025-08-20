import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAccessTokenStore } from '../stores/authStore';
import BaseModal from './Modal/BaseModal';
import LoginModal from './Modal/LoginModal';
import LoginSuggestionModal from './Modal/LoginSuggestionModal';
import BaseButton from './common/Button/BaseButton';
import LogoIcon from '../assets//icons/ic_logo_large.svg?react';
import BellPlusIcon from '../assets/images/icon/bellPlusIcon.svg?react';
import UserIcon from '../assets/images/icon/userIcon.svg?react';
import ModalIcon from '../assets/character/modal/large/ch_modal_check_square_green_large.svg?react';

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = useAccessTokenStore.getState().accessToken;

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="fixed top-0 z-[1] flex h-[7rem] w-full items-center justify-between border-b border-solid border-black-50 bg-black-10 px-[2rem]">
      {/* <HeaderContents> */}
      <div className="h-[4.4rem] w-[18.4rem]">
        <LogoIcon
          className="cursor-pointer text-primary-70"
          onClick={() => navigate('/')}
        />
      </div>
      {/* </HeaderContents> */}
      <div className="flex h-[4.4rem] items-center gap-[1rem] whitespace-nowrap">
        <BaseButton
          size="md"
          color="p_special"
          onClick={() => {
            if (!isLoggedIn) {
              setIsLoginSuggestionModalOpen(true);
              return;
            }
            // 저장한 글이 있는 상태인지 확인할 수 있는 값이 필요하다.
            setIsModalOpen(true);
          }}
        >
          팀원 모집하기
        </BaseButton>
        <div className="h-[1.8rem] w-[0.1rem] bg-black-60" />
        {isLoggedIn ? (
          <>
            {/* 헤더 알림 넣기 */}
            <BellPlusIcon />
            {/* 유저 알림 넣기 */}
            <UserIcon />
          </>
        ) : (
          <BaseButton
            size="md"
            color="special"
            onClick={() => setIsLoginModalOpen(true)}
          >
            로그인
          </BaseButton>
        )}
      </div>

      {/* Modals */}
      <BaseModal
        size="large"
        CharacterComponent={ModalIcon}
        title="저장된 글을 불러오시겠습니까?"
        content="이전에 임시저장하신 글이 있습니다."
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <LoginModal
        size="large"
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <LoginSuggestionModal
        size="large"
        isOpen={isLoginSuggestionModalOpen}
        onClose={() => setIsLoginSuggestionModalOpen(false)}
      />
    </div>
  );
};

export default Header;
