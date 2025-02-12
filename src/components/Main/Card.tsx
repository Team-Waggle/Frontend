import styled from "styled-components";
import OccupationCard from "./OccupationCard";
import BookmarkIcon from "../../assets/images/icon/bookmarkIcon.svg?react";
import TSIcon from "../../assets/images/icon/icon-ts.svg?react";
import ETCIcon from "../../assets/images/icon/etcIcon.svg?react";
import { useState } from "react";

const Card = () => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <CardWrapper>
      <TopPart>
        <Domain>금융</Domain>
        <DeadLine>D - 10</DeadLine>
        <Bookmark isSaved={isSaved} onClick={() => setIsSaved(!isSaved)} />
      </TopPart>
      <Title>
        와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님을
        찾습니다:) 많은 연락과 기대 부탁드립니다.
        {/* 와글 팀과 함께할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님... */}
      </Title>
      <RecruitMembers>
        <Personnel>5/10명</Personnel>
        <OccupationCard />
      </RecruitMembers>
      <Skills>
        <TSIcon />
        <TSIcon />
        <TSIcon />
        <TSIcon />
        <TSIcon />
        {/* 스킬 5개 초과 시 기타 아이콘 표시 */}
        <ETCIcon />
      </Skills>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  width: 630px;
  height: 211px;
  padding: 24px;
  box-sizing: border-box;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 4px 20px 0px #0000001a;
`;

const TopPart = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
`;

const Domain = styled.div`
  margin: 0 auto 0 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #0066ff;
`;

const DeadLine = styled.div`
  display: flex;
  justify-content: end;
  width: 61px;
  margin-right: 15px;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #747476;
`;

const Bookmark = styled(BookmarkIcon)<{ isSaved: Boolean }>`
  fill: ${({ isSaved }) => (isSaved ? "#0066ff" : "#e8e8e9")};
  cursor: pointer;
`;

const Title = styled.div`
  /* Title의 width는 482이나 ellipsis의 ...을 포함하기 위해서 15px를 추가함 */
  width: 497px;
  height: 27px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  color: #17171b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RecruitMembers = styled.div`
  display: flex;
  padding-bottom: 16px;
  margin: 16px 0;
  border-bottom: 1px solid #e8e8e9;
`;

const Personnel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 32px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  background-color: #e8e8e9;
`;

const Skills = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 24px;
`;
