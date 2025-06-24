import { useState } from "react";
import { BasicTextAreaState, BaseBasicTextAreaProps } from "../../../../types/BasicTextArea";
import { BASIC_TEXT_AREA_STYLES } from "./styles";

const BaseBasicTextArea = ({
  className,
  disabled = false,
  size='sm',
  useTyping,
  ...rest
}: BaseBasicTextAreaProps) => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const maxLength = size === 'lg' ? 500 : 300;
  const heightClass = size === 'lg' ? 'h-[212px]' : 'h-[160px]';

  const getCurrentState = (): BasicTextAreaState => {
    if (disabled) return 'disable';
    if (isTyping) return 'typing';
    if (text.length > 0) return 'complete';
    return 'default';
  };

  const currentState = getCurrentState();
  const styleByState = BASIC_TEXT_AREA_STYLES[currentState];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled) return;
    const value = e.target.value;
    setText(value);
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
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        className={`flex ${heightClass} pt-[16px] pr-[18px] pb-[20px] pl-[18px] items-start gap-[10px] self-stretch text-body-16_R400
        rounded-[8px] border ${styleByState} ${className ?? ''}`}
        placeholder="나는 어떤 사람인지, 어떤 프로젝트를 찾고 있는지, 간단한 인사도 좋아요!"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div className="self-stretch text-[#949598] text-[14px] font-[500] leading-[168%] text-right">
        {text.length} / {maxLength}
      </div>
    </div>
  );
};

export default BaseBasicTextArea;