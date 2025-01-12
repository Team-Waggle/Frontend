import styled from "styled-components";
import OccupationCard from "./OccupationCard";
import Bookmark from "../../assets/images/icon/bookmark.svg";
import IconTS from "../../assets/images/icon/icon-ts.svg";

const Card = () => {
  return (
    <CardWrapper>
      <TopPart>
        <Industry>금융</Industry>
        <DeadLine>D-10</DeadLine>
        <img src={Bookmark} alt="북마크 아이콘" />
      </TopPart>
      <Title>
        와글 팀과 함게할 디자이너, 기획자, 백엔드, 프론트엔드, 데브옵스님...
      </Title>
      <RecruitMembers>
        <Personnel>5/10명</Personnel>
        <OccupationCard />
      </RecruitMembers>
      <Skills>
        <img src={IconTS} alt="" />
        <img src={IconTS} alt="" />
        <img src={IconTS} alt="" />
      </Skills>
    </CardWrapper>
  );
};

export default Card;

const CardWrapper = styled.div`
  width: 582px;
  height: 163px;
  padding: 24px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
`;

const TopPart = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
`;

const Industry = styled.div`
  margin: 0 auto 0 0;
  font-size: 14px;
  font-weight: 600;
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
`;

const Title = styled.div`
  height: 27px;
  margin-top: 11px;

  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 27px;
  color: #17171b;
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
  width: 44px;
  padding: 0 8px;
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
