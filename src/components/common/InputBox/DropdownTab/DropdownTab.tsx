import { useEffect, useState } from 'react';
import BasicTabChip from '../../Chip/BasicTabChip/BasicTabChip';
import IdentityChip from '../../Chip/IdentityChip/IdentityChip';
import {
  teamPlay,
  teamPlayOptionList,
  teamPlaySelectedOptionMap,
} from '../../../../constants/teamPlay';

interface DropdownTabProps {
  openedCategory: string;
  setOpenedCategory: (category: string) => void;
  selectedOption: string[];
  setSelectedOption: (list: string[]) => void;
  className?: string;
}

const DropdownTab = ({
  openedCategory,
  setOpenedCategory,
  selectedOption,
  setSelectedOption,
  className,
}: DropdownTabProps) => {
  const toggleCategory = (category: string) => {
    setOpenedCategory(openedCategory === category ? '' : category);
  };

  const optionClick = (id: string) => {
    if (selectedOption.includes(id)) {
      setSelectedOption(selectedOption.filter((opt) => opt !== id));
    } else if (selectedOption.length < 5) {
      setSelectedOption([...selectedOption, id]);
    }
  };

  return (
    <div className={`flex w-[32rem] flex-col items-start justify-center ${className}`}>
      {teamPlay.map((category, idx) => {
        const categoryIndex = idx + 1;
        const optionIds = teamPlaySelectedOptionMap[String(categoryIndex)] || [];
        const options = teamPlayOptionList.filter((opt) => optionIds.includes(opt.id));
        const isMBTI = category === teamPlay[4];
        const isActive = openedCategory === category;

        return (
          <div key={category} className="flex w-[32rem] flex-col items-start gap-[1rem] pb-[2rem]">
            <BasicTabChip
              state={isActive ? 'active' : 'default'}
              className="flex h-[4.6rem] w-full items-center justify-center gap-[1rem] self-stretch"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </BasicTabChip>

            {isActive && (
              <div className="flex h-full flex-wrap content-start items-start justify-between gap-y-[1.2rem] self-stretch">
                {options.map(({ id, label }) => {
                  const isSelected = selectedOption.includes(id);
                  return (
                    <IdentityChip
                      key={id}
                      onClick={() => optionClick(id)}
                      type={isMBTI ? 'mbti' : 'default'}
                      size="xs"
                      isActive={isSelected}
                    >
                      {label}
                    </IdentityChip>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DropdownTab;
