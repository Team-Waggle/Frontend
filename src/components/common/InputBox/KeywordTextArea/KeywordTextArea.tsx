import React, { useState } from "react";

import IconTextArea from "../IconTextArea/BaseIconTextArea";
import BaseBasicChip from "../../Chip/BasicChip/BaseBasicChip";
import KeywordChip from "../../Chip/KeywordChip/KeywordChip";

import XIcon from "../../../../assets/profile/icon/icon-x16.svg?react";
import Skill from "../../../../assets/icons/skill/small/ic_skill_TypeScript_small.svg?react"

const SkillList = [
    "3D_Max", "Adobe_After_Effects", "Adobe_Illustrator", "Adobe_inDesign", "Adobe_Photoshop",
    "Adobe_Premiere", "Adobe_XD", "AWS", "Blender", "C", "C#", "C++", "Cinema_4D", "Django",
    "Docker", "Express", "Figma", "Firebase", "Flutter", "Git", "GO", "GraphQL", "Java",
    "Javascript", "Jest", "Kotlin", "Kubernetes", "meatball", "MongoDB", "MS_office", "MySQL",
    "Nestjs", "Nextjs", "Nodejs", "php", "Python", "React", "Spring_Boot", "Svelte", "Swift",
    "TypeScript", "Unity", "Vue", "Zeplin"
];

const KeywordTextArea = () => {
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    const handleSelectKeyword = (keyword: string) => {
        if (!selectedKeywords.includes(keyword)) {
            setSelectedKeywords((prev) => [...prev, keyword]);
        }
        setInputValue("");
    };

    const filterList = SkillList.filter((s) =>
        s.toLowerCase().includes(inputValue.toLowerCase()) &&
        !selectedKeywords.includes(s)
    );

    return (
        <div className="flex flex-col items-start self-stretch">
            <IconTextArea
                className="w-[734px] items-center"
                placeholder="프로그램 이름을 입력하세요."
                useRegex={false}
                useLengthValidation={false}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
            />

            {inputValue && filterList.length > 0 && (
                <div className="flex min-h-[64px] max-h-fit px-[1rem] py-[1.8rem] items-center self-stretch border border-solid border-black-50 rounded-[0.8rem] flex-wrap">
                    <div className="flex items-center content-center gap-[1rem] flex-wrap">
                        {filterList.map((keyword) => (
                            <BaseBasicChip shape="square" size={32} key={keyword}
                                onClick={() => handleSelectKeyword(keyword)}>
                                {keyword}
                            </BaseBasicChip>
                        ))}
                    </div>
                </div>
            )}

            {selectedKeywords.length > 0 && (
                <div className='flex h-[30px] items-start content-start gap-[1rem] self-stretch flex-wrap mt-[18px]'>
                    {selectedKeywords.map((keyword) => (
                        <div key={keyword} className='flex h-[3.2rem] px-[1rem] items-center gap-[0.8rem] rounded-[0.4rem] bg-black-30'>
                            <Skill className='w-[1.6rem] h-[1.6rem] gap-[1.6rem]' />
                            <p className='text-caption-13_M500 text-center'> {keyword} </p>
                            <XIcon onClick={() =>
                                setSelectedKeywords((prev) => prev.filter((k) => k !== keyword))
                            } className='flex w-[12px] h-[12px] justify-center items-center gap-[10px]' />
                        </div>
                    ))}
                </div>
            )}


        </div>
    );
};

export default KeywordTextArea;