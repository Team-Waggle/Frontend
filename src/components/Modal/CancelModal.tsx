import { useModal } from '../../hooks/useModal';
import { BaseModalProps } from '../../types/modal';
import BaseButton from '../common/Button/BaseButton';
import PopupCheckbox from '../common/Checkbox/PopupCheckbox';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import ModalIcon from '../../assets/character/modal/large/ch_modal_heart_square_yellow_large.svg?react';
import Close from '../../assets/icons/ic_x_large.svg?react';
import InputCheckbox from '../common/Checkbox/InputCheckbox';

const CancelModal = ({
  // size = 'large', // 기본 크기는 large로 설정
  isOpen,
  onClose,
  // CharacterComponent, // SVG 컴포넌트로 캐릭터 이미지 받기
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
        <div className="relative h-[62.4rem] w-[37.6rem] rounded-[0.8rem] bg-black-10 px-[2.4rem]">
          {/* 닫기버튼영역 */}
          <div className="absolute right-[1.6rem] top-[1.6rem] flex h-[2.8rem] w-[2.8rem] cursor-pointer items-center justify-center">
            <Close onClick={onClose} />
          </div>
          {/* 모달 내용 */}
          <div className="mt-[4.4rem] flex flex-col items-center">
            <ModalIcon />
            <span className="mt-[2.4rem] text-title-24_Sb600 text-black-130">
              정말 탈퇴하시겠습니까?
            </span>
            <div className="mt-[3rem] h-[27.6rem] w-[32.8rem]">
              <PopupCheckbox label="checkbox1">
                서비스를 자주 사용하지 않습니다.
              </PopupCheckbox>
              <PopupCheckbox label="checkbox2">
                다른 플랫폼을 이용하고 있습니다.
              </PopupCheckbox>
              <PopupCheckbox label="checkbox3">
                서비스를 이용하는데 어려움이 있습니다.
              </PopupCheckbox>
              <PopupCheckbox label="checkbox4">
                마음에 맞는 프로젝트를 찾기 어렵습니다.
              </PopupCheckbox>
              <PopupCheckbox label="checkbox5">
                프로젝트 팀원과의 경험이 좋지 않았습니다.
              </PopupCheckbox>
              {/* input Checkbox */}
              <InputCheckbox />
            </div>
            {/* 버튼 */}
            <div className="mt-[3.1rem] flex w-[23.2rem] gap-[0.8rem]">
              <BaseButton onClick={onClose} size="xl" color="line">
                취소
              </BaseButton>
              <BaseButton size="xl" color="primary">
                확인
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
export default CancelModal;
