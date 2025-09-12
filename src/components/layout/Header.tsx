import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccessTokenStore } from '../../stores/authStore';
import { useFilterStore } from '../../stores/filterStore';
import BaseModal from '../Modal/BaseModal';
import LoginModal from '../Modal/LoginModal';
import LoginSuggestionModal from '../Modal/LoginSuggestionModal';
import BaseButton from '../common/Button/BaseButton';
import { NavigationButton } from '../common/Button/OtherIconButton';
import LogoLargeIcon from '../../assets/icons/ic_logo_large.svg?react';
import LogoSmallIcon from '../../assets/icons/ic_logo_small.svg?react';
import FilterIcon from '../../assets/icons/button/ic_button_filter_small.svg?react';
import ModalIcon from '../../assets/character/modal/large/ch_modal_check_square_green_large.svg?react';

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { toggle } = useFilterStore();

  const token = useAccessTokenStore.getState().accessToken;

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const isMainPage = location.pathname === '/';

  return (
    <header className="fixed top-0 z-[1] flex h-[7rem] w-full items-center justify-between border-b border-solid border-black-50 bg-black-10 px-[2rem]">
      {/* <HeaderContents> */}
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between">
        <div className="cursor-pointer text-primary">
          {isMainPage ? (
            <>
              <BaseButton
                color="line"
                leftIcon={<FilterIcon />}
                onClick={toggle}
                className="block sm:hidden"
              >
                필터
              </BaseButton>
              <LogoLargeIcon
                className="hidden sm:block"
                onClick={() => navigate('/')}
              />
            </>
          ) : (
            <div onClick={() => navigate('/')}>
              <LogoLargeIcon className="hidden sm:block" />
              <LogoSmallIcon className="block sm:hidden" />
            </div>
          )}
        </div>
        {/* </HeaderContents> */}
        <div className="flex h-[4.4rem] items-center gap-[0.2rem] whitespace-nowrap">
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
            <div className="flex">
              <NavigationButton type="bell" />
              <NavigationButton type="profile" />
            </div>
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
    </header>
  );
};

export default Header;
