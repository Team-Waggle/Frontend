import React, { useState } from 'react';
import StyledInput from '../Profile/StyledInput';
import XIcon from "../../assets/profile/icon/icon-x16.svg?react";
import Skill from "../../assets/main/icon/skill/icon-skill-TypeScript.svg?react"

interface SkillProps {
    isActive?: boolean;
    children: React.ReactNode;
}

// 뭐가 문제일까?

const SkillInput = ({ isActive = false, children }: SkillProps) => {
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>("");

    return (
        <div className='inline-flex flex-col items-start'>

            {/* 입력 시 키워드 생성 */}
            <StyledInput
                className='!w-[734px] items-center'
                placeholder="프로그램 이름을 입력하세요."
                useRegex={false}
                useLengthValidation={false}
                useTyping={setIsTyping}
            />

            {isTyping && (
                <div className='flex h-[64px] px-[10px] py-[18px] items-center self-stretch border 
                            border-solid border-black-50 rounded-[8px]'>
                    <div className='flex items-center gap-[10px] flex-grow flex-shrink-0 basis-0'>

                        {/* 해당 요소가 자동완성 되어야 함. */}
                        <button className={`'flex h-[32px] px-[10px] justify-center border border-solid
                                    text-[13px] text-center	font-[500] leading-[150%] rounded-[4px] border-black-60 text-black-70
                                    ${isActive ? 'border-primary-60 text-black' : 'border-black-60 text-black-70'}`}>
                            {children}
                        </button>

                    </div>
                </div>
            )}

            {/* skill 컴포넌트 나누기 */}
            {/* mt-[18px] 원래는 상위 div에 gap-[18px] */}

            {!isTyping && (
                <div className='flex h-[30px] items-start content-start gap-[10px] self-stretch flex-wrap mt-[18px]'>
                    <div className='flex h-[32px] px-[10px] items-center gap-[8px]
            rounded-[4px] bg-black-30'>
                        {/* 이미지 모양이 원래 것이랑 조금 다름. 아이콘도 전체적으로 한 번 변경된 건가? */}
                        <Skill className='w-[16px] h-[16px] gap-[16px]' />
                        <p className='text-caption-13_M500 text-center'> {children} </p>
                        <XIcon className='flex w-[12px] h-[12px] justify-center items-center gap-[10px]' />
                    </div>
                    <div className='flex h-[32px] px-[10px] items-center gap-[8px]
            rounded-[4px] bg-black-30'>
                        {/* 이미지 모양이 원래 것이랑 조금 다름. 아이콘도 전체적으로 한 번 변경된 건가? */}
                        <Skill className='w-[16px] h-[16px] gap-[16px]' />
                        <p className='text-caption-13_M500 text-center'> {children} </p>
                        <XIcon className='flex w-[12px] h-[12px] justify-center items-center gap-[10px]' />
                    </div>
                </div>
            )}


        </div>
    );
};

export default SkillInput;