import { useState } from "react";

const BaseBasicTextArea = () => {
  const [text, setText] = useState('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-start gap-[6px] self-stretch">
      <textarea
        onChange={(e) => setText(e.target.value)}
        maxLength={300}
        className={`flex h-[212px] pt-[16px] pr-[18px] pb-[20px] pl-[18px] items-start gap-[10px] self-stretch text-body-16_R400
        rounded-[8px] border ${isTyping ? 'border-primary' : 'border-[#C4C4C6]'} bg-[#FFFFFF]`}
        placeholder="나는 어떤 사람인지, 어떤 프로젝트를 찾고 있는지, 간단한 인사도 좋아요!"
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <div className="self-stretch text-[#949598] text-[14px] font-[500] leading-[168%] text-right">
        {text.length} / 300
      </div>
    </div>
  );
};

export default BaseBasicTextArea;