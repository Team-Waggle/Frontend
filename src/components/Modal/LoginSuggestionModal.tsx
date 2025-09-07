import { useModal } from '../../hooks/useModal';
import { BaseModalProps } from '../../types/modal';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import GoogleBtn from '../../assets/button/login/btn_google_large.svg?react';
import KakaoBtn from '../../assets/button/login/btn_kakao_large.svg?react';
import ModalIcon from '../../assets/character/login/ch_login_triangle_yellow_large.svg?react';
import Close from '../../assets/icons/ic_x_xlarge.svg?react';
import { BASE_URL } from '../../constants/endpoint';

const LoginSuggestionModal = ({
  // size,
  isOpen,
  onClose,
}: BaseModalProps) => {
  // 모달 관련 공통 로직 (키보드, 스크롤 제어 등)
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
      >
        <ModalOverlay onClose={onClose} />
        <div className="relative flex h-[46.4rem] w-[40rem] justify-center rounded-[0.8rem] bg-black-10">
          {/* 닫기버튼영역 */}
          <div className="absolute right-[2rem] top-[2rem] flex h-[3.6rem] w-[3.6rem] cursor-pointer items-center justify-center">
            <Close onClick={onClose} />
          </div>
          <div className="mt-[4.7rem] flex flex-col items-center">
            {/* 모달 내용 */}
            <ModalIcon />
            <div className="mt-[2.4rem] flex flex-col items-center gap-[0.2rem]">
              <span className="text-title-24_Sb600">
                로그인 후 이용 가능합니다.
              </span>
              <span className="text-body-16_R400">로그인 하시겠습니까?</span>
            </div>
            {/* 버튼 */}
            <div className="mt-[3.2rem] grid gap-[0.8rem]">
              <GoogleBtn
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `${BASE_URL}/oauth2/authorization/google`;
                }}
                className="cursor-pointer"
              />
              <KakaoBtn
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `${BASE_URL}/oauth2/authorization/kakao`;
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default LoginSuggestionModal;
