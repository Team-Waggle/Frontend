import { useState } from "react";
import { BasicTextAreaState, BaseBasicTextAreaProps } from "../../../../types/BasicTextArea";
import { BASIC_TEXT_AREA_STYLES } from "./styles";

// BasicTextArea

/**
 * value: string - 현재 입력값 (필수)
 * onChange: (value: string) => void - 값 변경 시 호출 (필수)
 * size: 'sm' | 'lg' - 크기 및 최대 글자수 결정
 * state: 'default' | 'typing' | 'complete' | 'error' | 'disable' - 외부에서 상태 강제 지정 가능
 * useTyping: (isTyping: boolean) => void - 입력 중 상태 콜백
 * placeholder: string - placeholder 텍스트
 * showCount: boolean - 글자 수 표시 여부
 * countFormatter: (current, max) => string - 글자 수 표시 포맷
 * disabled: boolean - 비활성화 여부
 */

interface ExtendedTextAreaProps extends BaseBasicTextAreaProps {
  showCount?: boolean;
  countFormatter?: (current: number, max: number) => string;
}

const BaseBasicTextArea = ({
  value,
  onChange,
  className,
  disabled = false,
  size='sm',
  state,
  useTyping,
  placeholder,
  showCount = true,
  countFormatter = (current, max) => `${current} / ${max}`,
  ...rest
}: ExtendedTextAreaProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const maxLength = size === 'lg' ? 500 : 300;
  const heightClass = size === 'lg' ? 'h-[212px]' : 'h-[160px]';

  const getInternalState = (): BasicTextAreaState => {
    if (disabled) return "disable";
    if (isTyping) return "typing";
    if (value.length > 0) return "complete";
    return "default";
  };

  const currentState = state ?? getInternalState();
  const styleByState = BASIC_TEXT_AREA_STYLES[currentState];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    onChange(e.target.value);
  };

  const handleFocus = () => {
    if (disabled) return;
    setIsTyping(true);
    useTyping?.(true);
  };

  const handleBlur = () => {
    if (disabled) return;
    setIsTyping(false);
    useTyping?.(false);
  };

  return (
    <div className="flex flex-col items-start gap-[6px] self-stretch">
      <textarea
        {...rest}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`flex ${heightClass} pt-[16px] pr-[18px] pb-[20px] pl-[18px] items-start gap-[10px] self-stretch text-body-16_R400
        rounded-[8px] border ${styleByState} ${className ?? ''}`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {showCount && (
        <div className="self-stretch text-black-70 text-[14px] font-[500] leading-[168%] text-right">
          {countFormatter(value.length, maxLength)}
        </div>
      )}
    </div>
  );
};

export default BaseBasicTextArea;