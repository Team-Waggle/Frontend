import { useState } from 'react';
import { useProjectsPostQuery } from '../hooks/useProjectPost';
import SideFilters from '../components/Main/SideFilters';
import MainSearchBar from '../components/common/SearchBar/MainSearchBar';
import Card from '../components/Main/Card';
import ArrowDownSmallIcon from '../assets/icons/ic_arrow_down_small.svg?react';
import TopButton from '../components/TopButton';
import Pagination from '../components/common/Pagination';
import TagScroller from '../components/TagScroller';
import {
  positions,
  skills,
  industries,
  workPeriods,
  workWays,
} from '../constants/formOptions';

type SortData = {
  id: number;
  label: string;
};

const sorts: SortData[] = [
  { id: 1, label: '최신순' },
  { id: 2, label: '마감순' },
  { id: 3, label: '인기순' },
];

const Main = () => {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [tags, setTags] = useState<string[]>([]);
  const { data, isLoading } = useProjectsPostQuery(page, filters);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const allOptions = [
    ...positions,
    ...skills,
    ...industries,
    ...workPeriods,
    ...workWays,
  ];

  const idToLabelMap = Object.fromEntries(
    allOptions.map((option) => [option.id, option.label]),
  );

  const handleFilterChange = (
    newFilters: Record<string, string[]>,
    newTags: string[],
  ) => {
    setFilters(newFilters);
    setTags(newTags);
    setPage(0);
  };

  const handleTagRemove = (label: string) => {
    const id = allOptions.find((opt) => opt.label === label)?.id;
    if (!id) return;

    const newFilters: Record<string, string[]> = {};
    Object.entries(filters).forEach(([catId, ids]) => {
      const filtered = ids.filter((i) => i !== id);
      if (filtered.length) newFilters[catId] = filtered;
    });

    const newTags = Object.values(newFilters).flatMap((ids) =>
      ids.map((i) => idToLabelMap[i]),
    );

    setFilters(newFilters);
    setTags(newTags);
  };

  return (
    <>
      <div className="relative flex h-full justify-center">
        <SideFilters
          filters={filters}
          tags={tags}
          setFilters={handleFilterChange}
        />
        <div className="mt-[4.2rem] flex w-[63rem] flex-col items-center">
          <MainSearchBar />
          <div className="mt-[1rem] flex h-[4.4rem] w-full items-center gap-[1.6rem] pl-[2.4rem] pr-[2.2rem]">
            {/* 필터 슬라이더 */}
            <TagScroller keywords={tags} onRemove={handleTagRemove} />
            <div
              className="relative flex h-[2.8rem] w-[9.2rem] cursor-pointer items-center justify-between pl-[1.2rem] pr-[1rem]"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <span className="w-[4.5rem] whitespace-nowrap text-caption-14_M500">
                {sorts[0].label}
              </span>
              <ArrowDownSmallIcon
                className={`${isSortOpen ? 'rotate-180' : 'rotate-0'}`}
              />
              {isSortOpen && (
                <div className="absolute left-0 top-[3.4rem] h-[6.4rem] w-[9.2rem] rounded-[0.4rem] bg-black-10 text-body-13_R400 shadow-pop">
                  <div className="h-[3.2rem] px-[1rem] pb-[0.4rem] pt-[0.8rem]">
                    <span>{sorts[1].label}</span>
                  </div>
                  <div className="h-[3.2rem] px-[1rem] pb-[0.4rem] pt-[0.8rem]">
                    <span>{sorts[2].label}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* 카드 */}
          <div className="mt-[4rem] flex flex-col gap-[1.4rem]">
            {isLoading
              ? 'Loading....'
              : data?.content.map((data) => <Card key={data.id} data={data} />)}
          </div>
          <Pagination
            currentPage={data?.number ?? 0}
            totalPages={data?.totalPages ?? 1}
            onPageChange={setPage}
          />
        </div>
        <TopButton />
      </div>
    </>
  );
};

export default Main;
