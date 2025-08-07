import React, { useState } from 'react';
import {
  BaseIconTextAreaProps,
  TextAreaType,
  DefaultTextAreaState,
  FixedTextAreaState,
} from '../../../../types/IconTextArea';
import { ICON_TEXT_AREA_STYLES } from './styles';
import SearchIcon from '../../../../assets/inputBox/ic_input_search.svg?react';

const BaseIconTextArea = ({
  className,
  type = 'default',
  state,
  typingMessage,
  showIcon,
  useRegex = true,
  useLengthValidation = true,
  useTyping,
  ...rest
}: BaseIconTextAreaProps) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getCurrentState = (): DefaultTextAreaState | FixedTextAreaState => {
    if (state) return state;
    if (rest.disabled && type === 'fixed') return 'disable';
    if (hasError) return 'error';
    if (isTyping) return 'typing';
    if (inputValue.length > 0) return 'complete';
    return 'default';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const typing = value.length > 0;
    setIsTyping(typing);
    useTyping?.(typing);

    let error = false;

    if (useRegex) {
      const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎ\s]*$/;
      if (!regex.test(value)) error = true;
    }

    if (useLengthValidation && (value.length < 2 || value.length > 10)) {
      error = true;
    }

    setHasError(error);
  };

  const currentState = getCurrentState();
  const styleByState = ICON_TEXT_AREA_STYLES[type][currentState];

  return (
    <div className="flex flex-col items-end gap-[6px]">
      <div className="relative w-full">
        <input
          {...rest}
          value={inputValue}
          onChange={handleChange}
          className={`h-[4.6rem] w-full items-center self-stretch rounded-[0.8rem] border py-0 pl-[1.8rem] pr-[3.2rem] text-body-16_M500 ${styleByState}`}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        />
        {showIcon && (
          <div className="absolute right-[0.8rem] top-1/2 flex aspect-square h-[3.2rem] w-[3.2rem] shrink-0 -translate-y-1/2 transform items-center justify-center gap-[1rem]">
            <SearchIcon />
          </div>
        )}
      </div>

      {isTyping && !hasError && typingMessage && (
        <div className="flex items-center self-stretch pl-[0.6rem]">
          <p className="text-right text-[12px] font-[500] leading-[150%] text-black-70">
            {typingMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default BaseIconTextArea;
