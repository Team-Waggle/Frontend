import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProjectsPostDetailQuery } from '../hooks/useProjectPost';
import { BookmarkButton } from '../components/common/Button/OtherIconButton';
import BaseButton from '../components/common/Button/BaseButton';
import SkillIcons from '../components/SkillIcons';
import TopButton from '../components/TopButton';
import ProfileIcon from '../assets/profile/profileIcon/ic_profile_default_circle_small.svg?react';
import PersonIcon from '../assets/icons/ic_person.svg?react';
import IndustryIcon from '../assets/icons/filter/ic_filter_industry_small.svg?react';
import SystemIcon from '../assets/icons/filter/ic_filter_system_small.svg?react';
import PeriodIcon from '../assets/icons/filter/ic_filter_period_small.svg?react';
import ArrowDownIcon from '../assets/icons/ic_arrow_down_small.svg?react';
import {
  getIndustry,
  getPosition,
  getSkill,
  getWaysOfWorking,
  getWorkPeriod,
} from '../utils/createMapper';

const Post = () => {
  const { projectId } = useParams();

  const [id, setId] = useState<number>(0);
  const { data, isLoading } = useProjectsPostDetailQuery(id);

  useEffect(() => {
    setId(Number(projectId));
  }, [projectId]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="w-[32rem] sm:w-[62rem] md:w-[85.6rem]">
      <div className="mt-[4.2rem] flex w-full flex-col gap-[5.4rem]">
        <div className="text-heading-34_Sb600">{data?.title}</div>
        <div className="h-[4.8rem] border-b border-solid border-black-80 pb-[2rem]">
          <div className="flex h-[2.6rem] items-center gap-[1.2rem]">
            <div className="flex items-center gap-[0.4rem]">
              {/* 사용자 프로필 */}
              {/* 서버 데이터 필요 */}
              <ProfileIcon />
              <div className="flex items-center gap-[0.4rem]">
                <div className="flex items-center gap-[0.2rem]">
                  {/* truncate 말 줄이기, max-w-[...포함한 글자 수] */}
                  <span className="sm:truncate-0 max-w-[7ch] truncate text-subtitle-14_Sb600 sm:max-w-none">
                    {/* 서버 데이터 필요 */}
                    일이삼사오육칠팔구십
                  </span>
                  <span className="text-body-14_M500">님,</span>
                </div>
                {/* 서버 데이터 필요 */}
                <span className="text-subtitle-14_Sb600">백엔드</span>
              </div>
            </div>
            <div className="h-[2rem] w-[0.1rem] bg-black-60" />
            <div className="text-body-16_M500 text-black-80">
              {data?.created_at.slice(0, 10)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[4.4rem] justify-end">
        <BookmarkButton />
      </div>
      <div className="mb-[16.3rem] flex w-[32rem] flex-col gap-[10rem] sm:w-[56.6rem] md:w-[80.2rem]">
        <div className="flex flex-col gap-[6.6rem]">
          <div className="flex flex-col gap-[2rem]">
            {/* 총 구성 인원 */}
            <div className="flex h-[2.4rem] gap-[0.8rem]">
              <PersonIcon />
              <div className="flex gap-[0.6rem]">
                <span className="text-subtitle-16_Sb600 text-primary">
                  총 구성 인원
                </span>
                <div className="flex gap-[0.1rem]">
                  {/* 서버 데이터 필요 */}
                  <span className="text-subtitle-16_Sb600 text-primary">
                    3/10
                  </span>
                  <span className="text-subtitle-16_Sb600 text-primary">
                    명
                  </span>
                </div>
              </div>
            </div>
            {/* 산업 분야, 진행 방식, 모집기간, 진행기간 */}
            <div className="grid h-[20rem] grid-cols-2 gap-[1.2rem] sm:flex sm:h-[9.4rem]">
              <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                <div className="flex items-center gap-[0.6rem]">
                  <IndustryIcon />
                  <span className="text-caption-13_R400">산업 분야</span>
                </div>
                <div className="text-caption-13_Sb600">
                  {getIndustry(data?.industry ?? '')}
                </div>
              </div>
              <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                <div className="flex items-center gap-[0.6rem]">
                  <SystemIcon />
                  <span className="text-caption-13_R400">진행 방식</span>
                </div>
                <div className="text-caption-13_Sb600">
                  {getWaysOfWorking(data?.work_way ?? '')}
                </div>
              </div>
              <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                <div className="flex items-center gap-[0.6rem]">
                  <PeriodIcon />
                  <span className="text-caption-13_R400">모집 기간</span>
                </div>
                <div className="text-caption-13_Sb600">
                  {`~ ${data?.recruitment_end_date}`}
                </div>
              </div>
              <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                <div className="flex items-center gap-[0.6rem]">
                  <PeriodIcon />
                  <span className="text-caption-13_R400">진행 기간</span>
                </div>
                <div className="text-caption-13_Sb600">
                  {getWorkPeriod(data?.work_period ?? '')}
                </div>
              </div>
            </div>
            {/* 모집 인원, 현재 참여중인 인원, 스킬 */}
            <div className="flex flex-col gap-[2rem]">
              {/* 모집 인원 */}
              <div className="flex flex-col gap-[1.8rem] rounded-[0.8rem] border border-solid border-black-50 px-[2.2rem] pb-[3rem] pt-[2rem]">
                <span className="text-caption-13_Sb600">모집 인원</span>
                <div className="grid grid-cols-1 gap-y-[2rem] px-[2rem] sm:grid-cols-2 sm:gap-x-[3.8rem] md:gap-x-[5.2rem]">
                  {data?.recruitments.map((data, idx) => (
                    <div
                      key={idx}
                      className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]"
                    >
                      <span className="min-w-[6.2rem] max-w-[6.2rem] text-body-14_M500">
                        {getPosition(data?.position)}
                      </span>
                      <div className="flex items-center gap-[1.8rem]">
                        <span className="min-w-[3.5rem] text-body-14_M500 text-primary">
                          {data.remaining_count}/{data.current_count}
                        </span>
                        <BaseButton size="sm" color="line">
                          지원
                        </BaseButton>
                      </div>
                    </div>
                  ))}

                  {/* 모집 인원 더미 데이터 */}

                  {/* <div className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]">
                    <span className="text-body-14_M500">안드로이드</span>
                    <div className="flex items-center gap-[1.8rem]">
                      <span className="text-body-14_M500 text-primary">
                        10/10
                      </span>
                      <BaseButton size="sm" color="line">
                        지원
                      </BaseButton>
                    </div>
                  </div>
                  <div className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]">
                    <span className="text-body-14_M500">안드로이드</span>
                    <div className="flex items-center gap-[1.8rem]">
                      <span className="text-body-14_M500 text-primary">
                        10/10
                      </span>
                      <BaseButton size="sm" color="line">
                        지원
                      </BaseButton>
                    </div>
                  </div>
                  <div className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]">
                    <span className="text-body-14_M500">안드로이드</span>
                    <div className="flex items-center gap-[1.8rem]">
                      <span className="text-body-14_M500 text-primary">
                        10/10
                      </span>
                      <BaseButton size="sm">완료</BaseButton>
                    </div>
                  </div>
                  <div className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]">
                    <span className="text-body-14_M500">안드로이드</span>
                    <div className="flex items-center gap-[1.8rem]">
                      <span className="text-body-14_M500 text-primary">
                        10/10
                      </span>
                      <BaseButton size="sm">완료</BaseButton>
                    </div>
                  </div>
                  <div className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]">
                    <span className="text-body-14_M500">안드로이드</span>
                    <div className="flex items-center gap-[1.8rem]">
                      <span className="text-body-14_M500 text-primary">
                        10/10
                      </span>
                      <BaseButton size="sm" disabled>
                        마감
                      </BaseButton>
                    </div>
                  </div> */}
                </div>
              </div>
              {/* 현재 참여중인 인원 */}
              {/* 서버 데이터 필요 */}
              <div className="flex flex-col gap-[1.8rem] rounded-[0.8rem] border border-solid border-black-50 px-[2.2rem] pb-[3rem] pt-[2rem]">
                <span className="text-caption-13_Sb600">
                  현재 참여중인 인원
                </span>
                <div className="grid grid-cols-2 gap-x-[4.2rem] gap-y-[1rem] sm:grid-cols-4 md:flex md:gap-[2.8rem]">
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      iOS
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      기획자
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      데브옵스
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      디자이너
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      마케터
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      백엔드
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      안드로이드
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                  <div className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit">
                    <span className="whitespace-nowrap text-body-14_M500">
                      프론트엔드
                    </span>
                    <span className="text-body-14_M500 text-primary">10</span>
                  </div>
                </div>
              </div>
              {/* 사용 스킬 */}
              <div className="flex flex-col gap-[1.8rem] rounded-[0.8rem] border border-solid border-black-50 px-[2.2rem] pb-[3rem] pt-[2rem]">
                <span className="text-caption-13_Sb600">사용 스킬</span>
                <div className="flex gap-[1.5rem]">
                  <SkillIcons
                    iconKeys={
                      data?.skills
                        ?.map((id) => getSkill(id))
                        .filter(
                          (label): label is string => label !== undefined,
                        ) ?? []
                    }
                    size="large"
                    limit={null}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 프로젝트 주제 */}
          {/* 서버 데이터 필요 구분자 slice 필요 */}
          <div className="flex flex-col gap-[2.4rem] pl-[2.2rem] pr-[5rem]">
            <div className="flex flex-col gap-[3.8rem]">
              <div className="flex flex-col gap-[1.2rem]">
                <span className="text-title-24_Sb600">프로젝트 주제</span>
                <div className="text-body-16_M500">
                  안녕하세요 와글입니다. 와글은 사이드 프로젝트 모집 사이트를
                  제작중에 있습니다. 지금 모집을을 보고 계신 사이트와 동일한
                  서비스에 어쩌구 저처쩌구우우우우와글은 사이드 프로젝트 모집
                  사이트를 제작중에 있습니다. 지금 모집을을 보고 계신 사이트와
                  동일한 서비스에 어쩌구저처쩌구우우우우와글은 사이드 프로젝트
                  모집 사이트를 제작중에 있습니다. 지금 모집을을 보고 계신
                  사이트와 동일한 서비스에 어쩌구저처쩌구우우우우와글은 사이드
                  프로젝트 모집 사이트를 제작중에 있습니다. 지금 모집을을 보고
                  계신 사이트와 동일한 서비스에 어쩌구저처쩌구우우우우와글은
                  사이 드 프로젝트 모집 사이트를 제작중에 있습니다. 지금
                  모집을을 보고 계신 사이트와 동일한 서비스에
                  어쩌구저처쩌구우우우우
                </div>
              </div>
              <div className="flex flex-col gap-[1.2rem]">
                <span className="text-title-24_Sb600">진행 상황</span>
                <div className="text-body-16_M500">
                  안녕하세요 와글입니다. 와글은 사이드 프로젝트 모집 사이트를
                  제작중에 있습니다. 지금 모집을을 보고 계신 사이트와 동일한
                  서비스에 어쩌구 저처쩌구우우우우와글은 사이드 프로젝트 모집
                  사이트를 제작중에 있습니다. 지금 모집을을 보고 계신 사이트와
                  동일한 서비스에 어쩌구저처쩌구우우우우와글은 사이드 프로젝트
                  모집 사이트를 제작중에 있습니다. 지금 모집을을 보고 계신
                  사이트와 동일한 서비스에 어쩌구저처쩌구우우우우와글은 사이드
                  프로젝트 모집 사이트를 제작중에 있습니다. 지금 모집을을 보고
                  계신 사이트와 동일한 서비스에 어쩌구저처쩌구우우우우와글은
                  사이 드 프로젝트 모집 사이트를 제작중에 있습니다. 지금
                  모집을을 보고 계신 사이트와 동일한 서비스에
                  어쩌구저처쩌구우우우우
                </div>
              </div>
              <div className="flex flex-col gap-[1.2rem]">
                <span className="text-title-24_Sb600">진행 과정</span>
                <div className="text-body-16_M500">
                  안녕하세요 와글입니다. 와글은 사이드 프로젝트 모집 사이트를
                  제작중에 있습니다. 지금 모집을을 보고 계신 사이트와 동일한
                  서비스에 어쩌구 저처쩌구우우우우와글은 사이드 프로젝트 모집
                  사이트를 제작중에 있습니다. 지금 모집을을 보고 계신 사이트와
                  동일한 서비스에 어쩌구저처쩌구우우우우와글은 사이드 프로젝트
                  모집 사이트를 제작중에 있습니다. 지금 모집을을 보고 계신
                  사이트와 동일한 서비스에 어쩌구저처쩌구우우우우와글은 사이드
                  프로젝트 모집 사이트를 제작중에 있습니다. 지금 모집을을 보고
                  계신 사이트와 동일한 서비스에 어쩌구저처쩌구우우우우와글은
                  사이 드 프로젝트 모집 사이트를 제작중에 있습니다. 지금
                  모집을을 보고 계신 사이트와 동일한 서비스에
                  어쩌구저처쩌구우우우우
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[1rem]">
              <div className="text-title-20_Sb600">현재 참여 인원 소개</div>
              <div className="text-body-16_M500">
                프론트 : 경력 2년 어디에서 근무 어디에 관심 많음 열정만 있으면
                같이 잘할수있음 디자이너 : 경력 2년 어디에서 근무 어디에 관심
                많음 열정만 있으면 같이 잘할수있음 백엔드 : 경력 2년 어디에서
                근무 어디에 관심 많음 열정만 있으면 같이 잘할수있음 <br></br>
                많은 참여 부탁드리며 문의는 언제든 환영입니다!!
              </div>
            </div>
          </div>
        </div>
        {/* 현재 참여중인 팀원 정보 */}
        <div className="flex h-[46.2rem] flex-col gap-[2.8rem]">
          <div className="border-b border-solid border-black-50 pb-[1.8rem] pl-[2.2rem]">
            <span className="text-caption-13_Sb600">현재 참여중인 팀원</span>
          </div>
          <div className="flex flex-col gap-[1.6rem]">
            <div className="grid grid-cols-3 gap-[1.2rem] px-[2rem]"></div>
            <div className="flex justify-center">
              {/* 아이콘, 더보기 워딩 색깔 어떻게? */}
              <BaseButton
                size="sm"
                color="special"
                leftIcon={<ArrowDownIcon className="text-black-70" />}
                className="text-black-70"
              >
                더보기
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <TopButton />
    </div>
  );
};

export default Post;
