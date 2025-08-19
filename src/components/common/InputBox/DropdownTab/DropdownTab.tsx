import BasicTabChip from '../../Chip/BasicTabChip/BasicTabChip';
import IdentityChip from '../../Chip/IdentityChip/IdentityChip';
import {
  teamPlay,
  teamPlayOptionList,
  teamPlaySelectedOptionMap,
} from '../../../../constants/teamPlay';

interface DropdownTabProps {
  openedCategories: string[];
  setOpenedCategories: (list: string[]) => void;
  selectedOption: string[];
  setSelectedOption: (list: string[]) => void;
  className?: string;
}

const DropdownTab = ({
  openedCategories,
  setOpenedCategories,
  selectedOption,
  setSelectedOption,
  className,
}: DropdownTabProps) => {
  const toggleCategory = (category: string) => {
    if (openedCategories.includes(category)) {
      setOpenedCategories(openedCategories.filter((c) => c !== category));
    } else {
      setOpenedCategories([...openedCategories, category]);
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
    <div
      className={`flex w-[32rem] flex-col items-start justify-center ${className}`}
    >
      {teamPlay.map((category, idx) => {
        const categoryIndex = idx + 1;
        const optionIds = teamPlaySelectedOptionMap[String(categoryIndex)] || [];
        const options = teamPlayOptionList.filter((opt) => optionIds.includes(opt.id));
        const isMBTI = category === teamPlay[4];
        const isActive = openedCategories.includes(category);

        return (
          <div
            key={category}
            className="flex w-[32rem] flex-col items-start gap-[1rem] pb-[2rem]"
          >
            <BasicTabChip
              state={isActive ? 'active' : 'default'}
              className="flex h-[4.6rem] w-full items-center justify-center gap-[1rem] self-stretch"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </BasicTabChip>

            {isActive && (
              <div className="flex h-[44.8rem] flex-wrap content-start items-start justify-between gap-y-[1.2rem] self-stretch">
                {options.map(({ id, label }) => {
                  const isSelected = selectedOption.includes(label);
                  return (
                    <IdentityChip
                      key={id}
                      onClick={() => optionClick(label)}
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
