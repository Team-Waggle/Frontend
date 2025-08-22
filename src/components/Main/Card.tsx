import dayjs from 'dayjs';
import BaseTag from '../common/Tag/BaseTag';
import BookmarkWrapper from '../common/IconWrapper/BookmarkWrapper';
import { CardData } from '../../types/card';
import { useEffect, useState } from 'react';
import { SkillIcons } from '../SkillIcons';

interface CardProps {
  data: CardData;
}

const Card = ({ data }: CardProps) => {
  // 마감일 계산
  const today = dayjs().startOf('day');
  const end = dayjs(data?.recruitment_end_date).startOf('day');
  const diff = end.diff(today, 'day');

  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (diff < 0) setIsEnd(true);
  }, []);

  return (
    <div className="flex h-[21.5rem] w-[63rem] min-w-[32rem] max-w-[63rem] flex-col justify-between rounded-[2rem] border border-solid border-black-50 bg-black-10 px-[2.4rem] pb-[3rem] pt-[2rem]">
      <div className="flex h-[6.1rem] w-full flex-col gap-[1rem]">
        <div className="flex justify-between">
          {/* 도메인 이름 */}
          <span
            className={`h-[2.4rem] text-caption-13_M500 text-primary-70 ${isEnd ? 'text-opacity-30' : ''}`}
          >
            {data?.industry.display_name}
          </span>
          <div className="flex w-[9.5rem] gap-[1rem]">
            <span
              className={`w-[6.1rem] text-right text-body-13_R400 ${isEnd ? 'text-black-80 text-opacity-30' : diff <= 7 ? 'text-error' : 'text-black-80'}`}
            >
              {diff > 0
                ? `D - ${diff}`
                : diff < 0
                  ? `D + ${Math.abs(diff)}`
                  : 'D - day'}
            </span>
            <BookmarkWrapper
              projectId={data.id}
              isBookmarked={data.bookmarked}
              disabled={isEnd}
            />
          </div>
        </div>
        {/* Title */}
        <div
          className={`text-title-18_Sb600 text-black-130 ${isEnd ? 'text-opacity-30' : ''}`}
        >
          {data?.title}
        </div>
      </div>
      <div
        className={`flex h-[4.8rem] w-full gap-[0.8rem] whitespace-nowrap border-b border-solid border-black-40 pb-[1.6rem] ${isEnd ? 'opacity-30' : ''}`}
      >
        {data?.recruitments.map((data, idx) => (
          <BaseTag
            key={idx}
            size="lg"
            type="filled"
            color="basic"
            shape="square"
          >
            {data?.remaining_count}/{data?.current_count}명
          </BaseTag>
        ))}
        <div className="flex gap-[0.4rem]">
          {data?.recruitments.map((data, idx) => (
            <BaseTag
              key={idx}
              size="lg"
              type="outline"
              color="basic"
              shape="square"
            >
              {data?.position.display_name}
            </BaseTag>
          ))}
        </div>
      </div>
      <div
        className={`flex h-[2.4rem] w-[22rem] gap-[0.8rem] ${isEnd ? 'opacity-30' : ''}`}
      >
        <SkillIcons
          iconKeys={data.skills.map((skill) => skill.display_name)}
          size="large"
        />
      </div>
    </div>
  );
};

export default Card;
