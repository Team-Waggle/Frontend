import { useState } from "react";
import styled from "styled-components";
import background from "../assets/background.svg";
import Header from "../components/Header";
import Symbol from "../assets/symbol.svg";
import Search from "../assets/search.svg";
import Card from "../components/Main/Card";
import SideFilters from "../components/Main/SideFilters";

const Main = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleClickHamburgerBtn = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="main">
      <MainWrapper>
        <Header onClick={handleClickHamburgerBtn} />

        {isFiltersOpen && <SideFilters />}

        <MainSection>
          <SearchInputWrapper>
            <img src={Symbol} alt="" />
            <SearchInput type="text" placeholder="검색어를 입력해주세요." />
            <img src={Search} alt="" />
          </SearchInputWrapper>
          <FilterWrapper>
            <SelectedFilters>선택된 필터들</SelectedFilters>
            <SelectSort>정렬 필터</SelectSort>
          </FilterWrapper>
          <Cards>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Cards>
        </MainSection>
        <Background src={background} alt="" />
      </MainWrapper>
    </div>
  );
};

export default Main;

const MainWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1000px;
  margin-top: 99px;
`;

const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 574px;
  min-height: 60px;
  padding: 0 4px;
  border-bottom: 3px solid #06f;
`;

const SearchInput = styled.input`
  width: 480px;
  height: 27px;
  margin: 0 auto 0 10px;
  border: none;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  color: #bababb;
  outline: none;

  &::placeholder {
    color: #bababb;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 6px;
  width: 566px;
  height: 24px;
  margin-top: 16px;
`;

const SelectedFilters = styled.div`
  display: flex;
  align-items: center;
  width: 478px;
  min-height: 24px;

  background-color: beige;
`;

const SelectSort = styled.div`
  display: flex;
  align-items: center;
  width: 80px;

  background-color: beige;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 35px;
`;

const Background = styled.img`
  position: fixed;
  top: 61px;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;
