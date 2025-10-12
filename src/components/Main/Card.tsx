import dayjs from 'dayjs';
import BaseTag from '../common/Tag/BaseTag';
import BookmarkWrapper from '../common/IconWrapper/BookmarkWrapper';
import { ProjectPayload } from '../../types/project';
import { useEffect, useState } from 'react';
import { SkillIcons } from '../SkillIcons';
import { useNavigate } from 'react-router-dom';
import { getIndustry, getPosition, getSkill } from '../../utils/createMapper';

interface CardProps {
  data: ProjectPayload;
}

const Card = ({ data }: CardProps) => {
  // 마감일 계산
  const today = dayjs().startOf('day');
  const end = dayjs(data?.recruitment_end_date).startOf('day');
  const diff = end.diff(today, 'day');

  const navigate = useNavigate();
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (diff < 0) setIsEnd(true);
  }, []);

  return (
    <div
      className="flex min-w-[32rem] max-w-[63rem] cursor-pointer flex-col gap-[1.6rem] rounded-[2rem] border border-solid border-black-50 bg-black-10 px-[2.4rem] pb-[3rem] pt-[2rem]"
      onClick={() => navigate(`/post/${data.id}`)}
    >
      <div className="flex h-[6.1rem] w-full flex-col gap-[1rem]">
        <div className="flex justify-between">
          {/* 도메인 이름 */}
          <span
            className={`h-[2.4rem] text-caption-13_M500 text-primary-70 ${isEnd ? 'text-opacity-30' : ''}`}
          >
            {getIndustry(data?.industry)}
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
        className={`flex w-full gap-[0.8rem] whitespace-nowrap border-b border-solid border-black-40 pb-[1.6rem] ${isEnd ? 'opacity-30' : ''}`}
      >
        <BaseTag size="lg" type="filled" color="basic" shape="square">
          {data?.recruitments.reduce(
            (sum, item) => sum + item.remaining_count,
            0,
          )}
          /
          {data?.recruitments.reduce(
            (sum, item) => sum + item.remaining_count + item.current_count,
            0,
          )}
          명
        </BaseTag>
        <div className="flex flex-wrap gap-[0.4rem]">
          {data?.recruitments
            ?.filter((data) => data.remaining_count >= 1)
            .map((data, idx) => (
              <BaseTag
                key={idx}
                size="lg"
                type="outline"
                color="basic"
                shape="square"
              >
                {getPosition(data?.position)}
              </BaseTag>
            ))}
        </div>
      </div>
      <div
        className={`flex h-[2.4rem] w-[22rem] gap-[0.8rem] ${isEnd ? 'opacity-30' : ''}`}
      >
        <SkillIcons
          iconKeys={data.skills
            .map((id) => getSkill(id))
            .filter((label): label is string => label !== undefined)}
          size="large"
        />
      </div>
    </div>
  );
};

export default Card;
