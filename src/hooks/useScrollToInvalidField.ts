import { RefObject } from 'react';

/**
 * 폼의 필수 입력값이 비어 있을 때 첫 번째 필드로 스크롤 이동
 *
 * @param fieldRefs 각 필드의 ref를 키-값 쌍으로 전달
 * @param validators 각 필드가 유효한지 여부를 반환하는 함수들
 */
export const useScrollToInvalidField = (
  fieldRefs: Record<string, RefObject<HTMLElement>>,
  validators: Record<string, () => boolean>,
) => {
  const scrollToFirstInvalidField = () => {
    for (const key of Object.keys(validators)) {
      const isValid = validators[key]();
      if (!isValid && fieldRefs[key]?.current) {
        fieldRefs[key]!.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        break;
      }
    }
  };

  return { scrollToFirstInvalidField };
};
