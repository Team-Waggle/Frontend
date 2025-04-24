import BaseTag from '../common/Tag/BaseTag';
import BookmarkIcon from '../../assets/main/icon/icon-bookmark.svg?react';
import Cinema_4DIcon from '../../assets/main/icon/skill/icon-skill-Cinema_4D.svg?react';
import FigmaIcon from '../../assets/main/icon/skill/icon-skill-Figma.svg?react';
import DjangoIcon from '../../assets/main/icon/skill/icon-skill-Django.svg?react';
import JavascriptIcon from '../../assets/main/icon/skill/icon-skill-Javascript.svg?react';
import MongoDBIcon from '../../assets/main/icon/skill/icon-skill-MongoDB.svg?react';
import MeatballIcon from '../../assets/main/icon/icon-meatball.svg?react';

const Card = () => {
  // domain, deadline, title, tags, skills, bookmark props로 받아오기
  return (
    <div className="flex h-[21.5rem] w-[63rem] min-w-[32rem] max-w-[63rem] flex-col justify-between rounded-[2rem] border border-solid border-black-50 bg-black-10 px-[2.4rem] pb-[3rem] pt-[2rem] shadow-[0_0_0.2rem_0_#00000014]">
      <div className="flex h-[6.1rem] w-full flex-col gap-[1rem]">
        <div className="flex justify-between">
          {/* 도메인 이름 */}
          <span className="h-[2.4rem] text-caption-13_M500 text-primary-70">
            금융
          </span>
          <div className="flex w-[9.5rem] gap-[1rem]">
            <span className="w-[6.1rem] text-right text-body-13_R400 text-black-80">
              D - 10
            </span>
            {/* 북마크 아이콘은 기본으로 border가 1.5px임 f나 마감 상태일 때는 border 없애기 */}
            <BookmarkIcon />
          </div>
        </div>
        {/* Title */}
        <div className="text-title-18_Sb600">
          [네오플] 게임그래픽 직군 분야별 모집 (근무지 : 서울)
        </div>
      </div>
      <div className="box-border flex h-[4.8rem] w-full gap-[0.8rem] whitespace-nowrap border-b border-solid border-black-40 pb-[1.6rem]">
        <div className="flex items-center rounded-[0.4rem] bg-black-40 px-[1rem] text-subtitle-14_Sb600">
          5/10명
        </div>
        <div className="flex gap-[0.4rem]">
          <BaseTag size="lg">프론트엔드</BaseTag>
          <BaseTag size="lg">프론트엔드</BaseTag>
          <BaseTag size="lg">프론트엔드</BaseTag>
          <BaseTag size="lg">프론트엔드</BaseTag>
          <BaseTag size="lg">프론트엔드</BaseTag>
          <BaseTag size="lg">프론트엔드</BaseTag>
        </div>
      </div>
      {/* 스킬: 5개 초과 시 기타 아이콘 표시 */}
      <div className="flex h-[2.4rem] w-[22rem] gap-[0.8rem]">
        <Cinema_4DIcon />
        <FigmaIcon />
        <DjangoIcon />
        <JavascriptIcon />
        <MongoDBIcon />
        <MeatballIcon />
      </div>
    </div>
  );
};

export default Card;
