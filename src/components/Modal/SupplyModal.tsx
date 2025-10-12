import { Link } from 'react-router-dom';
import BaseButton from '../common/Button/BaseButton';
import { useModal } from '../../hooks/useModal';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import Close from '../../assets/icons/ic_x_xlarge.svg?react';
import ModalIcon from '../../assets/character/modal/large/ch_modal_check_square_green_large.svg?react';
import ArrowRightIcon from '../../assets/icons/button/ic_button_arrow_right_medium.svg?react';
import { BaseModalProps } from '../../types/modal';

const SupplyModal = ({
  // size = 'large', // 기본 크기는 large로 설정
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
        <div className="relative flex h-[41.6rem] w-[40rem] justify-center rounded-[0.8rem] bg-black-10">
          {/* 닫기버튼영역 */}
          <div className="absolute right-[2rem] top-[2rem] flex h-[3.6rem] w-[3.6rem] cursor-pointer items-center justify-center">
            <Close onClick={onClose} />
          </div>
          <div className="mt-[4.7rem] flex flex-col items-center">
            {/* 모달 내용 */}
            <ModalIcon />
            <div className="mt-[2.4rem] flex h-[6.2rem] flex-col items-center">
              <span className="text-title-24_Sb600 text-black-130">
                지원이 완료되었습니다!
              </span>
              <span className="text-body-16_R400 text-black-130">
                지원 현황에서 확인해 보세요.
              </span>
            </div>
            {/* 버튼 */}
            <Link
              to="/profile/applications"
              className="mt-[3.8rem] flex w-[23.7rem]"
            >
              <BaseButton
                className="w-full"
                onClick={onClose}
                size="xl"
                color="line"
                rightIcon={<ArrowRightIcon />}
              >
                <span className="w-[13.3rem] whitespace-nowrap">
                  지원 현황 바로가기
                </span>
              </BaseButton>
            </Link>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default SupplyModal;
