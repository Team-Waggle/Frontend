import BaseButton from '../common/Button/BaseButton';
import RefreshIcon from '../../assets/icons/button/ic_button_refresh_small.svg?react';
import Position from '../../assets/icons/filter/ic_filter_position.svg?react';
import Skill from '../../assets/icons/filter/ic_filter_skill.svg?react';
import Industry from '../../assets/icons/filter/ic_filter_industry.svg?react';
import Period from '../../assets/icons/filter/ic_filter_period.svg?react';
import System from '../../assets/icons/filter/ic_filter_system.svg?react';
import styled from 'styled-components';
import BaseDropdown from '../common/Dropdown/BaseDropdown';

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

const positions = [
  { id: 'FRONTEND', label: '프론트엔드' },
  { id: 'BACKEND', label: '백엔드' },
  { id: 'DESIGNER', label: '디자이너' },
  { id: 'IOS', label: 'iOS' },
  { id: 'ANDROID', label: '안드로이드' },
  { id: 'DEVOPS', label: '데브옵스' },
  { id: 'PLANNER', label: '기획자' },
  { id: 'MARKETER', label: '마케터' },
];

const skills = [
  { id: 'JAVA', label: 'Java' },
  { id: 'JAVASCRIPT', label: 'JavaScript' },
  { id: 'TYPESCRIPT', label: 'Typescript' },
  { id: 'NODE_JS', label: 'Node.js' },
  { id: 'NEXT_JS', label: 'Next.js' },
  { id: 'NEST_JS', label: 'NestJS' },
  { id: 'SVELTE', label: 'Svelte' },
  { id: 'VUE', label: 'Vue' },
  { id: 'REACT', label: 'React' },
  { id: 'SPRING', label: 'Spring' },
  { id: 'GO', label: 'Go' },
  { id: 'KOTLIN', label: 'Kotlin' },
  { id: 'EXPRESS', label: 'Express' },
  { id: 'MYSQL', label: 'MySQL' },
  { id: 'MONGODB', label: 'MongoDB' },
  { id: 'PYTHON', label: 'Python' },
  { id: 'DJANGO', label: 'Django' },
  { id: 'PHP', label: 'php' },
  { id: 'GRAPHQL', label: 'GraphQL' },
  { id: 'FIREBASE', label: 'Firebase' },
  { id: 'FLUTTER', label: 'Flutter' },
  { id: 'SWIFT', label: 'Swift' },
  { id: 'REACT_NATIVE', label: 'ReactNative' },
  { id: 'UNITY', label: 'Unity' },
  { id: 'AWS', label: 'AWS' },
  { id: 'KUBERNETES', label: 'Kubernetes' },
  { id: 'DOCKER', label: 'Docker' },
  { id: 'GIT', label: 'Git' },
  { id: 'FIGMA', label: 'Figma' },
  { id: 'SD', label: 'XD' },
  { id: 'ILLUSTRATOR', label: 'illustrator' },
  { id: 'PHOTOSHOP', label: 'Photoshop' },
  { id: 'INDESIGN', label: 'Indesign' },
  { id: 'PREMIERE_PRO', label: 'Premiere pro' },
  { id: 'AFTER_EFFECTS', label: 'After Effects' },
  { id: 'MAX_3D', label: '3D max' },
  { id: 'BLENDER', label: 'Blender' },
  { id: 'CINEMA_4D', label: 'Cinema 4D' },
  { id: 'ZEPLIN', label: 'Zeplin' },
  { id: 'JEST', label: 'Jest' },
  { id: 'MS_OFFICE', label: 'MS-Office' },
  { id: 'C', label: 'C' },
  { id: 'C++', label: 'C++' },
  { id: 'CSharp', label: 'C#' },
];

const industries = [
  { id: 'FINANCE', label: '금융' },
  { id: 'REAL_ESTATE', label: '부동산' },
  { id: 'INTERIOR', label: '인테리어' },
  { id: 'MEDICAL_HEALTHCARE', label: '의료/헬스케어' },
  { id: 'ECOMMERCE', label: '이커머스' },
  { id: 'ENTERTAINMENT', label: '엔터테인먼트' },
  { id: 'TRAVEL', label: '여행' },
  { id: 'SOCIAL_NETWORK', label: '소셜네트워크' },
  { id: 'CULTURE_ART', label: '문화/예술' },
  { id: 'BEAUTY_FASHION', label: '뷰티/패션' },
  { id: 'RELIGION', label: '종교' },
  { id: 'SALES_DISTRIBUTION', label: '판매/유통' },
  { id: 'EDUCATION', label: '교육' },
  { id: 'CONSTRUCTION', label: '건설' },
  { id: 'HEALTH', label: '건강' },
  { id: 'PARENTING', label: '육아/출산' },
  { id: 'MEDIA_ADVERTISING', label: '미디어/광고' },
];

const workPeriods = [
  { id: 'SHORT_TERM', label: '단기(1~3개월)' },
  { id: 'MEDIUM_TERM', label: '중기(3~6개월)' },
  { id: 'LONG_TERM', label: '장기(6개월 이상)' },
  { id: 'UNDECIDED', label: '미정' },
];

const systems = [
  { id: 'ONLINE_OFFLINE', label: '모두가능' },
  { id: 'ONLINE', label: '온라인만' },
  { id: 'OFFLINE', label: '오프라인만' },
];

interface SideFiltersProps {
  filters: Record<string, string[]>;
  setFilters: (newFilters: Record<string, string[]>) => void;
}

const SideFilters = ({ filters, setFilters }: SideFiltersProps) => {
  const isFiltersEmpty = Object.keys(filters).length === 0;

  return (
    <SideWrapper>
      {/* <aside className="left-[calc(50% - 315px - 32px - 230px)] absolute w-[23rem] pt-[5.8rem]"> */}
      <div className="flex h-[5.6rem] items-center justify-between py-[1rem] pl-[1.4rem] pr-[0.2rem]">
        <span className="text-caption-13_Sb600">필터</span>
        <BaseButton
          size="md"
          color="special"
          leftIcon={<RefreshIcon />}
          disabled={isFiltersEmpty}
          onClick={() => setFilters({})}
        >
          초기화
        </BaseButton>
      </div>
      {/* 필터들 */}
      {filterCategories.map((category, id) => (
        <BaseDropdown
          key={id}
          leftIcon={category.icon}
          title={category.title}
          contentList={
            category.id === 'positions'
              ? positions
              : category.id === 'skills'
                ? skills
                : category.id === 'industries'
                  ? industries
                  : category.id === 'workPeriods'
                    ? workPeriods
                    : systems
          }
          selected={filters[category.id] ?? []}
          onChange={(label, checked, type) => {
            const prevSelected = filters[category.id] ?? [];
            let newSelected: string[];

            if (type === 'radio') {
              newSelected = checked ? [label] : [];
            } else {
              newSelected = checked
                ? [...prevSelected, label]
                : prevSelected.filter((item) => item !== label);
            }

            const newFilters =
              newSelected.length === 0
                ? (() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { [category.id]: _, ...rest } = filters;
                    return rest;
                  })()
                : { ...filters, [category.id]: newSelected };

            setFilters(newFilters);
          }}
        />
      ))}
      {/* </aside> */}
    </SideWrapper>
  );
};

export default SideFilters;

const SideWrapper = styled.aside`
  width: 230px;
  padding-top: 58px;
  position: absolute;
  /* 50% - MainSection width의 절반 - 32px - SideWrapper width */
  left: calc(50% - 315px - 32px - 230px);
`;
