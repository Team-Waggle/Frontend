import { useState } from 'react';
import { teamPlay, teamPlayOptionList, teamPlaySelectedOptionMap } from '../../../../constants/teamPlay';

interface TeamPlayLabelBtnProps {
    className?: string;
}

const TeamPlayLabelBtn = ({ className }: TeamPlayLabelBtnProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(teamPlay[0]);
    const [selectedOption, setSelectedOption] = useState<string[]>([]);

    const selectedCategoryIndex = teamPlay.indexOf(selectedCategory) + 1;
    const teamPlayOptionIds = teamPlaySelectedOptionMap[String(selectedCategoryIndex)];
    const teamPlayOptions = teamPlayOptionList.filter(opt => teamPlayOptionIds.includes(opt.id));

    const categoryClick = (label: string) => {
        if (selectedCategory !== label) {
            setSelectedCategory(label)
        }
    };

    const optionClick = (label: string) => {
        if (selectedOption.includes(label)) {
            setSelectedOption(prev => prev.filter(option => option !== label));
        }
        else if (selectedOption.length < 5) {
            setSelectedOption(prev => [...prev, label]);
        }
    };


    // 에러 스타일 조건에 관해서 확인 후 추가
    return (
        <div className="flex flex-col items-start gap-[14px] slef-stretch">

            <div className={`flex justify-between items-start self-stretch ${className}`}>
                {teamPlay.map((label) => {
                    const isActive = selectedCategory === label;
                    return (
                        // 선택 버튼
                        <button
                            key={label}
                            onClick={() => categoryClick(label)}
                            className={`flex w-[140px] h-[32px] justify-center items-center rounded-[4px] text-[13px] font-[500] leading-[150%] text-center
                            ${isActive ? 'bg-primary-20 text-black-130' : 'bg-black-10 text-black-70'}`}>
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* 그리드 */}
            <div className="flex justify-between items-start content-start gap-y-[10px] self-stretch flex-wrap">
                {teamPlayOptions.map(({ id, label }) => {
                    const isOptionSelected = selectedOption.includes(label);
                    const selectedCategoryMBTI = selectedCategory === teamPlay[4];
                    return (
                        <button
                            key={id}
                            onClick={() => optionClick(label)}
                            className={`flex w-[140px] h-[80px] justify-center items-center
                            rounded-[10px] border border-solid border-black-60 bg-black-10
                            text-center text-[#949598] text-[13px] font-[500] leading-[150%]
                            ${isOptionSelected ? ' text-black-130 border-primary-60' : ''}
                            ${selectedCategoryMBTI ? 'w-[115px] h-[60px]' : ''}`}>
                            {label}
                        </button>
                    );
                })}
            </div>
        </div>



    );
};

export default TeamPlayLabelBtn;