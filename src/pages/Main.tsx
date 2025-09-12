import { useState } from 'react';
import { useProjectsGetQuery } from '../hooks/useProjectPost';
import { useFilterStore } from '../stores/filterStore';
import Drawer from '../components/layout/Drawer';
import SideFilters from '../components/Main/SideFilters';
import MainSearchBar from '../components/common/SearchBar/MainSearchBar';
import TagScroller from '../components/Main/TagScroller';
import SelectTextIn from '../components/common/Select/SelectTextIn';
import Card from '../components/Main/Card';
import Pagination from '../components/common/Pagination';
import TopButton from '../components/TopButton';
import Footer from '../components/layout/Footer';
import {
  positions,
  skills,
  industries,
  workPeriods,
  workWays,
} from '../constants/formOptions';

interface SortData {
  id: string;
  label: string;
}

const sorts: SortData[] = [
  { id: 'createdAt,desc', label: '최신순' },
  { id: 'createdAt,asc', label: '오래된순' },
];

const Main = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('createdAt,desc');
  const { filters, tags, setFilters } = useFilterStore();
  const { data, isLoading } = useProjectsGetQuery(page, sort, filters);

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

    setFilters(newFilters, newTags);
  };

  return (
    <>
      <div className="flex h-full justify-center sm:gap-[1.6rem] md:gap-[4.2rem] lg:gap-[5.6rem]">
        {/* 모바일 화면에서 Drawer 보여주기 */}
        <div className="sm:hidden">
          <Drawer>
            <SideFilters />
          </Drawer>
        </div>
        {/* 모바일 화면에서 Drawer 가리기 */}
        <div className="hidden sm:block">
          <SideFilters />
        </div>
        {/* 메인 컨텐츠 */}
        <div className="mt-[4.2rem] flex min-h-[170rem] w-[32rem] flex-col items-center sm:w-[45.8rem] md:w-[63rem]">
          <MainSearchBar />
          <div className="mt-[1rem] flex h-[4.4rem] w-full items-center gap-[1.6rem] md:pl-[2.4rem] md:pr-[2.2rem]">
            {/* 필터 태그 */}
            <TagScroller keywords={tags} onRemove={handleTagRemove} />
            {/* 정렬 */}
            <SelectTextIn
              items={sorts}
              title="최신순"
              type="default"
              onChange={(id) => setSort(id)}
            />
          </div>

          {/* 카드 */}
          <div className="mt-[4rem] flex w-full flex-col gap-[1.4rem]">
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
      </div>
      <TopButton />
      <Footer />
    </>
  );
};

export default Main;
