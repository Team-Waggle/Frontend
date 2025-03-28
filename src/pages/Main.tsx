import { useState } from 'react';
import styled from 'styled-components';
import Card from '../components/Main/Card';
import SideFilters from '../components/Main/SideFilters';
import Symbol from '../assets/main/icon/icon-symbol_circle.svg';
import SearchIcon from '../assets/main/icon/icon-search.svg';
import XIcon from '../assets/main/icon/icon-x.svg?react';
import TriangleDownIcon from '../assets/images/icon/triangleDownIcon.svg?react';
import ArrowLeftIcon from '../assets/images/icon/ic_filter_arrow_left.svg?react';
import ArrowRightIcon from '../assets/images/icon/ic_filter_arrow_right.svg?react';

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
      <div style={{ display: 'flex' }}>
        {/* <SideFilters /> */}

        <MainSection>
          <SearchInputWrapper>
            <img src={Symbol} alt="" />
            <SearchInput type="text" placeholder="검색어를 입력해주세요." />
            <img src={SearchIcon} alt="" style={{ cursor: 'pointer' }} />
          </SearchInputWrapper>
          <FilterWrapper>
            <Slider>
              <ArrowButton onClick={handlePrev}>
                <ArrowLeftIcon />
              </ArrowButton>
              <TagWrapper translateX={currentIndex * 100}>
                {tags.map((tag) => (
                  <Tag key={tag.id}>
                    {tag.label} <XIcon />
                  </Tag>
                ))}
              </TagWrapper>
              <ArrowButton onClick={handleNext}>
                <ArrowRightIcon />
              </ArrowButton>
            </Slider>

            <SelectSort>
              <SortType>최신순</SortType>
              <TriangleDownIcon />
            </SelectSort>
          </FilterWrapper>
          <Cards>
            <Card />
            <Card />
            <Card />
          </Cards>
        </MainSection>
      </div>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
`;

const MainSection = styled.div`
  margin: 22px auto 0;
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
  padding: 0 22px 0 40px;
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
  z-index: 10;

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
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
