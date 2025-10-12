import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import HeaderList from '../Header/HeaderList';
import HeaderNotification from '../Header/HeaderNotification';
import { useOutsideClick } from '../../hooks/useOutsideClick';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isHeaderListOpen, setIsHeaderListOpen] = useState(false);
  const [isHeaderNotificationOpen, setIsHeaderNotificationOpen] =
    useState(false);
  const { toggle } = useFilterStore();
  const token = useAccessTokenStore((state) => state.accessToken);

  const notificationRef = useRef<HTMLDivElement | null>(null);
  const headerListRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(notificationRef, () => setIsHeaderNotificationOpen(false));
  useOutsideClick(headerListRef, () => setIsHeaderListOpen(false));

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const isMainPage = pathname === '/';

  return (
    <header className="fixed top-0 z-[45] flex h-[7rem] w-full items-center justify-between border-b border-solid border-black-50 bg-black-10 px-[2rem]">
      {/* <HeaderContents> */}
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between">
        <div className="cursor-pointer text-primary">
          {isMainPage ? (
            <>
              <BaseButton
                color="line"
                leftIcon={<FilterIcon />}
                onClick={toggle}
                className="block md:hidden"
              >
                필터
              </BaseButton>
              <Link to="/">
                <LogoLargeIcon className="hidden md:block" />
              </Link>
            </>
          ) : (
            <Link to="/">
              <LogoLargeIcon className="hidden md:block" />
              <LogoSmallIcon className="block md:hidden" />
            </Link>
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
              // setIsModalOpen(true);
              navigate('/post/new');
            }}
          >
            팀원 모집하기
          </BaseButton>
          <div className="h-[1.8rem] w-[0.1rem] bg-black-60" />
          {isLoggedIn ? (
            <div className="flex">
              <div className="relative" ref={notificationRef}>
                <NavigationButton
                  type="bell"
                  onClick={() => setIsHeaderNotificationOpen((prev) => !prev)}
                />
                {isHeaderNotificationOpen && <HeaderNotification />}
              </div>
              <div className="relative" ref={headerListRef}>
                <NavigationButton
                  type="profile"
                  onClick={() => setIsHeaderListOpen((prev) => !prev)}
                />
                {isHeaderListOpen && (
                  <HeaderList onClose={() => setIsHeaderListOpen(false)} />
                )}
              </div>
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
