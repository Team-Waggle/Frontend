import { useState } from 'react';
// import Card from '../components/Main/Card';
// import SideFilters from '../components/Main/SideFilters';
// import Symbol from '../assets/main/icon/icon-symbol_circle.svg?react';
// import Search from '../assets/main/icon/icon-search.svg?react';
// import X from '../assets/main/icon/icon-x.svg?react';
// import ArrowDown from '../assets/main/icon/icon-arrow_line-down.svg?react';
// import ArrowLineLeft from '../assets/main/icon/icon-arrow_line-left.svg?react';
// import ArrowLineRight from '../assets/main/icon/icon-arrow_line-right.svg?react';
import styled from 'styled-components';

type TagData = {
  id: number;
  label: string;
};

type SortData = {
  id: number;
  label: string;
};

const tags: TagData[] = [
  { id: 1, label: '기획자' },
  { id: 2, label: 'React' },
  { id: 3, label: 'Javascript' },
  { id: 4, label: '헬스케어' },
  { id: 5, label: '게임' },
  { id: 6, label: '엔터테인먼트' },
  { id: 7, label: '게임' },
  { id: 8, label: '게임' },
  { id: 9, label: '게임' },
  { id: 10, label: '게임' },
];

const sort: SortData[] = [
  { id: 1, label: '최신순' },
  { id: 2, label: '인기순' },
  { id: 3, label: '관심 목록' },
];

const Main = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : tags.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < tags.length - 1 ? prevIndex + 1 : 0,
    );
  };

  return (
    <MainWrapper>
      <SideFilters />
      <MainSection>
        <SearchInputWrapper>
          <Symbol />
          <SearchInput type="text" placeholder="검색어를 입력해주세요." />
          <Search />
        </SearchInputWrapper>
        <FilterWrapper>
          <Slider>
            {/* <ArrowButton onClick={handlePrev}>
              <ArrowLineLeft />
            </ArrowButton> */}
            <TagWrapper translateX={currentIndex * 100}>
              {tags.map((tag) => (
                <Tag key={tag.id}>
                  {tag.label} <X />
                </Tag>
              ))}
            </TagWrapper>
            {/* <ArrowButton onClick={handleNext}>
              <ArrowLineRight />
            </ArrowButton> */}
          </Slider>

          <SelectSort>
            <SortType>최신순</SortType>
            <ArrowDown />
          </SelectSort>
        </FilterWrapper>
        <Cards>
          <Card />
          <Card />
          <Card />
        </Cards>
      </MainSection>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 1200px;
  position: relative;
`;

const MainSection = styled.div`
  /* margin: 42px auto 0; */
  margin-top: 42px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 630px;
  height: 1000px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 582px;
  height: 60px;
  padding: 0 4px;
  border-bottom: 3px solid #0066ff;
`;

const SearchInput = styled.input`
  width: 480px;
  height: 44px;
  border: none;
  padding: 0;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #17171b;
  outline: none;

  &::placeholder {
    color: #bababb;
  }
`;

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: 44px;
  margin: 10px 0;
  padding: 0 22px 0 24px;
  box-sizing: border-box;
`;

const Slider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  width: 100%;
  max-width: 682px;
`;

const ArrowButton = styled.button`
  position: absolute;
  /* 왜인지는 모르겠으나 모달 오픈 시 이상해짐... */
  /* z-index: 10; */

  &:nth-child(1) {
    left: 15px;
  }

  &:nth-child(3) {
    right: 115px;
  }
`;

const TagWrapper = styled.div<{ translateX: number }>`
  display: flex;
  align-items: center;
  /* width: 472px; */
  width: 100%;
  height: 24px;
  gap: 4px;
  transition: transform 0.5s ease-in-out;
  transform: ${(props) => `translateX(-${props.translateX}%)`};
  /* 필터 스크롤 잘 되나 확인해본 것 
     슬라이드 버튼 구현 되면 삭제할 것
     overflow-x:scroll은 놔둬야 할 수도 있음
  */
  /* overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  } */
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  height: 24px;
  padding: 2px 7px 2px 11px;
  box-sizing: border-box;
  border-radius: 15px;
  background-color: #f3f3f3;
  color: #5d5d60;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
`;

const SelectSort = styled.div`
  display: flex;
  align-items: center;
  width: 80px;
  height: 44px;
  cursor: pointer;
`;

const SortType = styled.div`
  white-space: nowrap;
  width: 32px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
