import styled from 'styled-components';
import ArrowLineDown from '../../assets/main/icon/icon-arrow_line-down.svg?react';
import Position from '../../assets/main/icon/icon-position.svg?react';
import Skill from '../../assets/main/icon/icon-skill.svg?react';
import Industry from '../../assets/main/icon/icon-industry.svg?react';
import Period from '../../assets/main/icon/icon-period.svg?react';
import System from '../../assets/main/icon/icon-system.svg?react';
import Refresh from '../../assets/main/icon/icon-refresh.svg?react';
import { useState } from 'react';

const jobPositions = [
  { id: 1, label: '프론트엔드' },
  { id: 2, label: '백엔드' },
  { id: 3, label: '디자이너' },
  { id: 4, label: 'IOS' },
  { id: 5, label: '안드로이드' },
  { id: 6, label: '데브옵스' },
  { id: 7, label: '기획자' },
  { id: 8, label: '마케터' },
];

const SideFilters = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SideWrapper>
      <SideTitle>
        <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: '21px' }}>
          필터
        </span>
        <RefreshBtn>
          <Refresh />
          <span
            style={{
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '21px',
              color: '#bababb',
            }}
          >
            초기화
          </span>
        </RefreshBtn>
      </SideTitle>
      {/* 필터들 */}
      <Filters>
        <Filter onClick={() => setIsOpen(!isOpen)}>
          <IconAndTitleContainer>
            <Position />
            <FilterTitle>모집 직무</FilterTitle>
          </IconAndTitleContainer>
          <ArrowLineDown />
          {isOpen && (
            <div>
              {jobPositions.map((position) => (
                <div key={position.id}>{position.label}</div>
              ))}
            </div>
          )}
        </Filter>
        <Filter>
          <IconAndTitleContainer>
            <Skill />
            <FilterTitle>사용 스킬</FilterTitle>
          </IconAndTitleContainer>
          <ArrowLineDown />
        </Filter>
        <Filter>
          <IconAndTitleContainer>
            <Industry />
            <FilterTitle>산업 분야</FilterTitle>
          </IconAndTitleContainer>
          <ArrowLineDown />
        </Filter>
        <Filter>
          <IconAndTitleContainer>
            <Period />
            <FilterTitle>진행 기간</FilterTitle>
          </IconAndTitleContainer>
          <ArrowLineDown />
        </Filter>
        <Filter>
          <IconAndTitleContainer>
            <System />
            <FilterTitle>진행 방식</FilterTitle>
          </IconAndTitleContainer>
          <ArrowLineDown />
        </Filter>
      </Filters>
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

const SideTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
`;

const RefreshBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  width: 82px;
  height: 36px;

  &:hover {
    border-radius: 8px;
    background-color: #f3f3f3;
  }
`;

const Filters = styled.ul`
  min-width: 230px;
  margin-top: 10px;
`;

const Filter = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 45px;
  border-bottom: 1px solid #e8e8e9;
  box-sizing: border-box;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;

const IconAndTitleContainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  gap: 16px;
`;

const FilterTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #17171b;
`;
