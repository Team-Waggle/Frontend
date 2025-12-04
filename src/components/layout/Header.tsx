import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  useAccessTokenStore,
  useRefreshTokenStore,
} from '../../stores/authStore';
import { useFilterStore } from '../../stores/filterStore';
import { useIpnStore } from '../../stores/ipnStore';
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
import { useLogoutQuery } from '../../hooks/useAuth';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useUserStore } from '../../stores/userStore';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { mutate } = useLogoutQuery(
    useRefreshTokenStore((state) => state.refreshToken!),
  );
  const [isHeaderListOpen, setIsHeaderListOpen] = useState(false);
  const [isHeaderNotificationOpen, setIsHeaderNotificationOpen] =
    useState(false);
  const { toggle: filterToggle } = useFilterStore();
  const { toggle: ipnToggle } = useIpnStore();
  const token = useAccessTokenStore((state) => state.accessToken);
  const userId = useUserStore((state) => state.user?.id);

  const hasTempPost = !!localStorage.getItem(`tempPostForm_${userId}`);

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
  const isProfilePage = pathname === '/profile';
  const isEditPostPage = pathname === '/post/new';
  const isEditProfilePage =
    pathname === '/profile/new' || pathname.startsWith('/profile/edit');
  const isMybehaviorPage =
    pathname === '/profile/likes' ||
    pathname === '/profile/applications' ||
    pathname === '/profile/posts';

  return (
    <header className="fixed top-0 z-[45] flex h-[7rem] w-full items-center justify-between border-b border-solid border-black-50 bg-black-10 px-[2rem]">
      {/* <HeaderContents> */}
      <div className="mx-auto flex w-full max-w-[120rem] items-center justify-between">
        <div className="cursor-pointer text-primary">
          {isMainPage ? (
            <>
              <Link to="/">
                <LogoLargeIcon className="hidden md:block" />
              </Link>
              <BaseButton
                color="line"
                leftIcon={<FilterIcon />}
                onClick={filterToggle}
                className="block md:hidden"
              >
                필터
              </BaseButton>
            </>
          ) : isProfilePage || isMybehaviorPage ? (
            <>
              <Link to="/">
                <LogoLargeIcon className="hidden md:block" />
              </Link>
              <NavigationButton
                type="hamburger"
                onClick={ipnToggle}
                className="blcok md:hidden"
              />
            </>
          ) : (
            <Link to="/">
              <LogoLargeIcon className="hidden md:block" />
              <LogoSmallIcon className="block md:hidden" />
            </Link>
          )}
        </div>
        {/* </HeaderContents> */}
        {isEditProfilePage ? (
          ''
        ) : (
          <div className="flex h-[4.4rem] items-center gap-[0.2rem] whitespace-nowrap">
            {isEditPostPage ? (
              ''
            ) : (
              <>
                <BaseButton
                  size="md"
                  color="p_special"
                  onClick={() => {
                    if (!isLoggedIn) {
                      setIsLoginSuggestionModalOpen(true);
                      return;
                    }
                    if (hasTempPost) {
                      setIsModalOpen(true);
                      return;
                    }
                    navigate('/post/new');
                  }}
                >
                  팀원 모집하기
                </BaseButton>
                <div className="h-[1.8rem] w-[0.1rem] bg-black-60" />
              </>
            )}
            {isLoggedIn ? (
              <div className="flex">
                <div className="relative" ref={notificationRef}>
                  <NavigationButton
                    type="bell"
                    onClick={() => setIsHeaderNotificationOpen((prev) => !prev)}
                  />
                  {isHeaderNotificationOpen && (
                    <HeaderNotification
                      isOpen={isHeaderNotificationOpen}
                      onClose={() => setIsHeaderNotificationOpen(false)}
                    />
                  )}
                </div>
                {isProfilePage ? (
                  <div>
                    <NavigationButton
                      type="logout"
                      onClick={() => {
                        mutate();
                        useAccessTokenStore.getState().clearAccessToken();
                        useRefreshTokenStore.getState().clearRefreshToken();
                        window.location.href = '/';
                      }}
                    />
                  </div>
                ) : (
                  <div className="relative" ref={headerListRef}>
                    <NavigationButton
                      type="profile"
                      onClick={() => setIsHeaderListOpen((prev) => !prev)}
                    />
                    {isHeaderListOpen && (
                      <HeaderList
                        isOpen={isHeaderListOpen}
                        onClose={() => setIsHeaderListOpen(false)}
                      />
                    )}
                  </div>
                )}
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
        handleDone={() => {
          setIsModalOpen(false);
          navigate('/post/new');
        }}
        handleCancel={() => {
          localStorage.removeItem(`tempPostForm_${userId}`);
          setIsModalOpen(false);
          navigate('/post/new');
        }}
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
