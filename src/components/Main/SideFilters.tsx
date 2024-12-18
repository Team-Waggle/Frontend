import styled from "styled-components";
import ChevronDown from "../../assets/chevron-down.svg";
import Position from "../../assets/icon-filter-position.svg";
import Skills from "../../assets/icon-filter-skill.svg";
import Industry from "../../assets/icon-filter-industry.svg";
import Period from "../../assets/icon-filter-period.svg";
import System from "../../assets/icon-filter-system.svg";
import Refresh from "../../assets/icon-filter-refresh.svg";

const SideFilters = () => {
  return (
    <SideWrapper>
      {/* 필터들 */}
      <Filters>
        <FilterIcon src={Position} alt="" />
        <FilterTitle>모집 직무</FilterTitle>
        <ButtonDown src={ChevronDown} />
      </Filters>
      <Filters>
        <FilterIcon src={Skills} alt="" />
        <FilterTitle>사용 스킬</FilterTitle>
        <ButtonDown src={ChevronDown} />
      </Filters>
      <Filters>
        <FilterIcon src={Industry} alt="" />
        <FilterTitle>산업 분야</FilterTitle>
        <ButtonDown src={ChevronDown} />
      </Filters>
      <Filters>
        <FilterIcon src={Period} alt="" />
        <FilterTitle>진행 기간</FilterTitle>
        <ButtonDown src={ChevronDown} />
      </Filters>
      <Filters>
        <FilterIcon src={System} alt="" />
        <FilterTitle>진행 방식</FilterTitle>
        <ButtonDown src={ChevronDown} />
      </Filters>

      {/* 초기화 버튼 */}
      <ButtonRefresh>
        <img src={Refresh} alt="" />
        초기화
      </ButtonRefresh>
    </SideWrapper>
  );
};

export default SideFilters;

const SideWrapper = styled.ul`
  position: absolute;
  width: 230px;
  height: 300px;
  top: 100px;
  left: 24px;
  background-color: white;
`;

const Filters = styled.li`
  display: flex;
  align-items: center;
  height: 24px;
  padding: 10.5px 12px;
  border-bottom: 1px solid #e8e8e9;

  &:last-child {
    border-bottom: none;
  }
`;

const FilterIcon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const FilterTitle = styled.div`
  margin-left: 16px;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #17171b;
`;

const ButtonDown = styled.img`
  padding: 10px 8px;
  margin: 0 0 0 auto;
`;

const ButtonRefresh = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 86px;
  height: 44px;
  padding: 10px;
  margin-top: 28px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #bababb;
  background-color: white;
`;
