import { useModal } from '../../hooks/useModal';
import { BaseModalProps } from '../../types/modal';
import BaseButton from '../common/Button/BaseButton';
import ModalOverlay from './ModalOverlay';
import ModalPortal from './ModalPortal';
import Close from '../../assets/icons/ic_x_xlarge.svg?react';

/**
 * 기본 모달 컴포넌트
 *
 * 특징:
 * 1. 재사용성: 모든 모달의 기본 구조를 제공
 * 2. 접근성: 키보드 네비게이션 및 aria 속성 지원
 * 3. Portal: React Portal을 통한 DOM 계층 분리
 *
 * 사용예시:
 * <BaseModal isOpen={isOpen} onClose={handleClose}>
 *   <div>모달 내용</div>
 * </BaseModal>
 */

const BaseModal = ({
  // size = 'large', // 기본 크기는 large로 설정
  isOpen,
  onClose,
  handleDone, // 확인 버튼 클릭 시 실행할 함수
  handleCancel,
  CharacterComponent, // SVG 컴포넌트로 캐릭터 이미지 받기
  title, // 모달 제목
  content, // 모달 내용
}: BaseModalProps) => {
  // 모달 관련 공통 로직 (키보드, 스크롤 제어 등)
  useModal({ isOpen, onClose });

  if (!isOpen) return null;

  // // 모달 크기에 따른 스타일 설정
  // const modalSize =
  //   size === 'large' ? 'h-[41.6rem] w-[40rem]' : 'h-[34rem] w-[32.8rem]';

  // // 캐릭터 컴포넌트의 마진 설정
  // const charaterMarginTop = size === 'large' ? 'mt-[4.7rem]' : 'mt-[3rem]';

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
            {CharacterComponent && <CharacterComponent />}
            <div className="mt-[2.4rem] flex h-[6.2rem] flex-col items-center">
              <span className="text-title-24_Sb600 text-black-130">
                {title}
              </span>
              <span className="text-body-16_R400 text-black-130">
                {content}
              </span>
            </div>
            {/* 버튼 */}
            <div className="mt-[3.8rem] flex w-[23.2rem] gap-[0.8rem]">
              <BaseButton
                onClick={handleCancel ?? onClose}
                size="xl"
                color="line"
              >
                취소
              </BaseButton>
              <BaseButton onClick={handleDone} size="xl" color="primary">
                확인
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};
export default BaseModal;
