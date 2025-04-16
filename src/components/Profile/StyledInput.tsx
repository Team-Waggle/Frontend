import React, { useState } from 'react';

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  typingMessage?: string;
  useRegex?: boolean;
  useLengthValidation?: boolean;
}

const StyledInput = ({ className, error, typingMessage, useRegex=true, useLengthValidation=true, ...rest }: StyledInputProps) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsTyping(value.length > 0);

    let hasError = false;

    if (useRegex) {
      const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎ\s]*$/;
      if (!regex.test(value)) hasError = true;
    }

    if (useLengthValidation) {
      if (value.length < 2 || value.length > 10) {
        hasError = true;
      }
    }

    setIsError(hasError);
  };

  return (
    <div className="flex flex-col items-end gap-[6px]">
      <input
        {...rest}
        value={inputValue}
        onChange={handleChange}
        className={`w-full h-[var(---46-,46px)] pr-[8px] pl-[18px] py-0 items-center self-stretch text-[16px] border rounded-[8px] 
          ${isError ? 'border-[#F5552D]' : isTyping ? 'border-primary' : 'border-black-60'}
        ${className ?? ''}`}
      />

      {isTyping && !isError && typingMessage && (
        <div className="flex pl-[6px] items-center self-stretch">
          <p className="text-right text-[12px] text-black-70 font-[500] leading-[150%]"> {typingMessage} </p>
        </div>
      )}
    </div>
  );
};

export default StyledInput;
