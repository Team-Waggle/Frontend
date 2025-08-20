import { useEffect, useState } from 'react';
import BasicTabChip from '../../Chip/BasicTabChip/BasicTabChip';
import IdentityChip from '../../Chip/IdentityChip/IdentityChip';
import {
  teamPlay,
  teamPlayOptionList,
  teamPlaySelectedOptionMap,
} from '../../../../constants/teamPlay';

interface BasicTabInProps {
  selectedCategory: string;
  setSelectedCategory: (label: string) => void;
  selectedOption: string[];
  setSelectedOption: (list: string[]) => void;
  className?: string;
}

const BasicTabIn = ({
  selectedCategory,
  setSelectedCategory,
  selectedOption,
  setSelectedOption,
  className,
}: BasicTabInProps) => {
  const rawIndex = teamPlay.indexOf(selectedCategory);
  const selectedCategoryIndex = rawIndex >= 0 ? rawIndex + 1 : undefined;
  const teamPlayOptionIds =
    selectedCategoryIndex &&
    teamPlaySelectedOptionMap[String(selectedCategoryIndex)]
      ? teamPlaySelectedOptionMap[String(selectedCategoryIndex)]
      : [];

  const teamPlayOptions = teamPlayOptionList.filter((opt) =>
    teamPlayOptionIds.includes(opt.id),
  );

  const categoryClick = (label: string) => {
    if (selectedCategory !== label) {
      setSelectedCategory(label);
    }
  };

  const optionClick = (label: string) => {
    if (selectedOption.includes(label)) {
      setSelectedOption(selectedOption.filter((opt) => opt !== label));
    } else if (selectedOption.length < 5) {
      setSelectedOption([...selectedOption, label]);
    }
  };

  return (
    <div className="slef-stretch flex flex-col items-start gap-[14px]">
      <div
        className={`flex items-start justify-between self-stretch ${className}`}
      >
        {teamPlay.map((label) => {
          const isActive = selectedCategory === label;
          return (
            <BasicTabChip
              key={label}
              onClick={() => categoryClick(label)}
              state={isActive ? 'active' : 'default'}
            >
              {label}
            </BasicTabChip>
          );
        })}
      </div>

      {/* 그리드 */}
      <div className="flex flex-wrap content-start items-start justify-between gap-y-[10px] self-stretch">
        {teamPlayOptions.map(({ id, label }) => {
          const isOptionSelected = selectedOption.includes(label);
          const selectedCategoryMBTI = selectedCategory === teamPlay[4];
          return (
            <IdentityChip
              key={id}
              onClick={() => optionClick(label)}
              type={selectedCategoryMBTI ? 'mbti' : 'default'}
              size="xl"
              isActive={isOptionSelected}
            >
              {label}
            </IdentityChip>
          );
        })}
      </div>
    </div>
  );
};

export default BasicTabIn;
