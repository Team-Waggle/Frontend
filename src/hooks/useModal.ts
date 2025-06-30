import { useEffect, useCallback } from 'react';

interface UseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal Hook - 모달 창을 쉽게 관리하기 위한 도구
 *
 * 두 가지 사용 방법이 있어요:
 *
 * 1. 훅이 직접 모달을 관리하는 방법
 *    - 모달 열고 닫는 것을 훅이 알아서 처리
 *    - 간단한 확인/취소 모달에 좋음
 *    예시: const { isOpen, onClose } = useModal()
 *
 * 2. 부모 컴포넌트가 모달을 관리하는 방법
 *    - 모달 상태를 부모가 가지고 있음
 *    - 여러 상태가 얽혀있을 때 좋음 (예: 폼 작성 중인 모달)
 *    예시: useModal({ isOpen, onClose })
 *
 * 왜 이렇게 나눴나요?
 * - 간단한 모달은 간단하게 쓰고 싶어서
 * - 복잡한 모달은 더 많은 제어가 필요해서
 * - 재사용성을 높이기 위해서
 */

export const useModal = ({ isOpen, onClose }: UseModalProps) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  // 스크롤 제어
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  // 키보드 이벤트
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleEscape]);
};

// 간단한 알림창은 훅이 알아서 관리
// 복잡한 모달(예: 로그인 폼)은 부모가 관리
// 두 가지 경우 모두 같은 훅으로 처리할 수 있음!
