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
  value = '',
  onChange,
  ...rest
}: BaseIconTextAreaProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);

const getCurrentState = (): DefaultTextAreaState | FixedTextAreaState => {
  if (state) return state;
  if (rest.disabled && type === 'fixed') return 'disable';
  if (hasError) return 'error';
  if (isTyping) return 'typing';
  if (typeof value === 'string' && value.length > 0) return 'complete';
  return 'default';
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    onChange?.(e); // 부모에게 전달

    const typing = val.length > 0;
    setIsTyping(typing);
    useTyping?.(typing);

    let error = false;

    if (useRegex) {
      const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎ\s]*$/;
      if (!regex.test(val)) error = true;
    }

    if (useLengthValidation && (val.length < 2 || val.length > 10)) {
      error = true;
    }

    setHasError(error);
  };

  const currentState = getCurrentState();
  const styleByState = ICON_TEXT_AREA_STYLES[type][currentState];

  return (
    <div className={`flex flex-col items-end gap-[6px] ${className ?? ''}`}>
      <div className="relative w-full">
        <input
          {...rest}
          value={value}
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
        <div className="absolute items-center self-stretch mt-[5rem] pl-[0.6rem]">
          <p className="text-right caption-12_M500 text-black-70">
            {typingMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default BaseIconTextArea;
