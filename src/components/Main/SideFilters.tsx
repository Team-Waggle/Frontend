import { useFilterStore } from '../../stores/filterStore';
import BaseButton from '../common/Button/BaseButton';
import RefreshIcon from '../../assets/icons/button/ic_button_refresh_small.svg?react';
import Position from '../../assets/icons/filter/ic_filter_position.svg?react';
import Skill from '../../assets/icons/filter/ic_filter_skill.svg?react';
import Industry from '../../assets/icons/filter/ic_filter_industry_large.svg?react';
import Period from '../../assets/icons/filter/ic_filter_period_large.svg?react';
import System from '../../assets/icons/filter/ic_filter_system_large.svg?react';
import BaseDropdown from '../common/Dropdown/BaseDropdown';
import {
  positions,
  skills,
  industries,
  workPeriods,
  workWays,
} from '../../constants/formOptions';

const filterCategories = [
  {
    id: 'positions',
    icon: <Position />,
    title: '직무 선택',
  },
  {
    id: 'skills',
    icon: <Skill />,
    title: '사용 스킬',
  },
  {
    id: 'industries',
    icon: <Industry />,
    title: '산업 분야',
  },
  {
    id: 'workPeriods',
    icon: <Period />,
    title: '진행 기간',
  },
  {
    id: 'workWays',
    icon: <System />,
    title: '진행 방식',
  },
];

const SideFilters = () => {
  const { filters, tags, setFilters, reset } = useFilterStore();

  const isFiltersEmpty = Object.keys(filters).length === 0;

  const optionsMap: Record<string, { id: string; label: string }[]> = {
    positions,
    skills,
    industries,
    workPeriods,
    workWays,
  };

  return (
    <aside className="w-[29rem] pt-[5.8rem] sm:w-[23rem]">
      <div className="flex h-[5.6rem] items-center justify-between py-[1rem] pl-[1.4rem] pr-[0.2rem]">
        <span className="text-caption-13_Sb600">필터</span>
        <BaseButton
          size="md"
          color="special"
          leftIcon={<RefreshIcon />}
          disabled={isFiltersEmpty}
          onClick={reset}
        >
          초기화
        </BaseButton>
      </div>
      {/* 필터들 */}
      {filterCategories.map((category) => (
        <BaseDropdown
          key={category.id}
          leftIcon={category.icon}
          title={category.title}
          contentList={optionsMap[category.id]}
          selected={filters[category.id] ?? []}
          onChange={(id, label, checked, type) => {
            const prevSelected = filters[category.id] ?? [];
            let newSelected: string[] = [];
            let newTags: string[] = [];

            if (type === 'radio') {
              newSelected = checked ? [id] : [];
              newTags = checked ? [label] : [];
            } else {
              newSelected = checked
                ? [...prevSelected, id]
                : prevSelected.filter((item) => item !== id);

              // 기존 태그에서 현재 카테고리 id와 겹치는 label 제거 후 추가
              const prevTagsWithoutCategory = tags.filter(
                (tag) =>
                  !Object.values(optionsMap)
                    .flat()
                    .some((o) => o.id === id && o.label === tag),
              );

              newTags = checked
                ? [...prevTagsWithoutCategory, label]
                : prevTagsWithoutCategory;
            }

            const newFilters =
              newSelected.length === 0
                ? (() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { [category.id]: _, ...rest } = filters;
                    return rest;
                  })()
                : { ...filters, [category.id]: newSelected };

            setFilters(newFilters, newTags);
          }}
        />
      ))}
    </aside>
  );
};

export default SideFilters;
