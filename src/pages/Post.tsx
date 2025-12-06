import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProjectsPostDetailQuery } from '../hooks/useProjectPost';
import { useProjectsMemberQuery } from '../hooks/useProjectMember';
import { BookmarkButton } from '../components/common/Button/OtherIconButton';
import BaseButton from '../components/common/Button/BaseButton';
import SkillIcons from '../components/SkillIcons';
import TopButton from '../components/TopButton';
import LoginSuggestionModal from '../components/Modal/LoginSuggestionModal';
import ProfileTag from '../components/common/Profile/ProfileTag/ProfileTag';
import SupplyModal from '../components/Modal/SupplyModal';
import BaseProfileIcon from '../components/common/Profile/ProfileIcon/BaseProfileIcon';
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
import { usePostApply } from '../hooks/useApplicants';
import { useUser } from '../hooks/useUser';
import { useAccessTokenStore } from '../stores/authStore';
import { isClosedKST } from '../utils/dateKST';

interface TextAreaprops {
  subject: string;
  progress: string;
  requirements: string;
  extraTitle: string;
  extraContent: string;
}

const Post = () => {
  const { user, fetchUser } = useUser();

  const { projectId } = useParams();

  const [id, setId] = useState<number>(0);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);
  const { data: projectData, isLoading } = useProjectsPostDetailQuery(id!);
  const { data: memberData } = useProjectsMemberQuery(id!);
  const { mutate } = usePostApply(Number(projectId));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = useAccessTokenStore((state) => state.accessToken);

  useEffect(() => {
    setId(Number(projectId));
    if (token) {
      fetchUser();
    }
  }, [projectId]);

  const parseDetail = (detail: string): TextAreaprops => {
    const [subject, progress, requirements, extraTitle, extraContent] =
      detail?.split('___SPLIT___') || [];

    return {
      subject: subject || '',
      progress: progress || '',
      requirements: requirements || '',
      extraTitle: extraTitle || '',
      extraContent: extraContent || '',
    };
  };

  // 현재 참여중인 팀원 중 작성자 맨 앞으로 오게 정렬
  const sortedMemberData = memberData?.sort((a, b) => {
    if (a.id === projectData?.user.id) return -1;
    if (b.id === projectData?.user.id) return 1;
    return 0;
  });

  return (
    <>
      <div className="w-[32rem] sm:w-[62rem] md:w-[85.6rem]">
        <div className="mt-[4.2rem] flex w-full flex-col gap-[5.4rem]">
          <div className="text-heading-34_Sb600">{projectData?.title}</div>
          <div className="h-[4.8rem] border-b border-solid border-black-80 pb-[2rem]">
            <div className="flex h-[2.6rem] items-center gap-[1.2rem]">
              <Link
                to={`/profile/${projectData?.user.id}`}
                className="flex items-center gap-[0.4rem]"
                onClick={(e) => {
                  if (!token) {
                    e.preventDefault();
                    setIsLoginSuggestionModalOpen(true);
                    return;
                  }
                }}
              >
                {/* 사용자 프로필 */}
                <BaseProfileIcon
                  imageUrl={projectData?.user.profile_img_url}
                  size="small"
                />
                <div className="flex items-center gap-[0.4rem]">
                  <div className="flex items-center gap-[0.2rem]">
                    {/* truncate 말 줄이기, max-w-[...포함한 글자 수] */}
                    <span className="sm:truncate-0 max-w-[7ch] truncate text-subtitle-14_Sb600 sm:max-w-none">
                      {projectData?.user.name}
                    </span>
                    <span className="text-body-14_M500">님,</span>
                  </div>
                  <span className="text-subtitle-14_Sb600">
                    {getPosition(projectData?.user.position!)}
                  </span>
                </div>
              </Link>
              <div className="h-[2rem] w-[0.1rem] bg-black-60" />
              <div className="text-body-16_M500 text-black-80">
                {projectData?.created_at.slice(0, 10)}
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-[4.4rem] justify-end">
          {user?.id !== projectData?.user.id && (
            <BookmarkButton
              projectId={Number(projectId)}
              isBookmarked={projectData?.bookmarked}
            />
          )}
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
                    <span className="text-subtitle-16_Sb600 text-primary">
                      {projectData?.recruitments.reduce(
                        (sum, item) => sum + item.current_count,
                        0,
                      )}
                      /
                      {projectData?.recruitments.reduce(
                        (sum, item) =>
                          sum + item.remaining_count + item.current_count,
                        0,
                      )}
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
                    {getIndustry(projectData?.industry ?? '')}
                  </div>
                </div>
                <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                  <div className="flex items-center gap-[0.6rem]">
                    <SystemIcon />
                    <span className="text-caption-13_R400">진행 방식</span>
                  </div>
                  <div className="text-caption-13_Sb600">
                    {getWaysOfWorking(projectData?.work_way ?? '')}
                  </div>
                </div>
                <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                  <div className="flex items-center gap-[0.6rem]">
                    <PeriodIcon />
                    <span className="text-caption-13_R400">모집 기간</span>
                  </div>
                  <div className="text-caption-13_Sb600">
                    {`~ ${projectData?.recruitment_end_date}`}
                  </div>
                </div>
                <div className="flex w-[15.4rem] flex-col gap-[1.4rem] rounded-[0.8rem] bg-black-30 px-[1.7rem] py-[2rem] sm:w-[13.2rem] md:w-[19rem]">
                  <div className="flex items-center gap-[0.6rem]">
                    <PeriodIcon />
                    <span className="text-caption-13_R400">진행 기간</span>
                  </div>
                  <div className="text-caption-13_Sb600">
                    {getWorkPeriod(projectData?.work_period ?? '')}
                  </div>
                </div>
              </div>
              {/* 모집 인원, 현재 참여중인 인원, 스킬 */}
              <div className="flex flex-col gap-[2rem]">
                {/* 모집 인원 */}
                {projectData?.recruitments.reduce(
                  (sum, item) => sum + item.remaining_count,
                  0,
                ) === 0 ? (
                  ''
                ) : (
                  <div className="flex flex-col gap-[1.8rem] rounded-[0.8rem] border border-solid border-black-50 px-[2.2rem] pb-[3rem] pt-[2rem]">
                    <span className="text-caption-13_Sb600">모집 인원</span>
                    <div className="grid grid-cols-1 gap-y-[2rem] px-[2rem] sm:grid-cols-2 sm:gap-x-[3.8rem] md:gap-x-[5.2rem]">
                      {projectData?.recruitments
                        ?.filter((data) => data.remaining_count >= 1)
                        .map((data, idx) => (
                          <div
                            key={idx}
                            className="flex h-[2.8rem] w-[22.2rem] gap-[4.2rem]"
                          >
                            <span
                              className={`min-w-[6.2rem] max-w-[6.2rem] text-body-14_M500 ${isClosedKST(projectData.recruitment_end_date) ? 'text-black-70' : 'text-black-130'}`}
                            >
                              {getPosition(data?.position)}
                            </span>
                            <div className="flex items-center gap-[1.8rem]">
                              <span
                                className={`flex h-[2.8rem] min-w-[3.5rem] items-center justify-center text-body-14_M500 ${isClosedKST(projectData.recruitment_end_date) ? 'text-black-70' : 'text-primary'} `}
                              >
                                {projectData.applicant_counts.find(
                                  (applicant) =>
                                    applicant.position === data.position,
                                )?.count ?? 0}
                                /{data.remaining_count}
                              </span>
                              {/* 지원일 경우에만! */}
                              {isClosedKST(projectData.recruitment_end_date) ? (
                                <BaseButton size="sm" disabled>
                                  마감
                                </BaseButton>
                              ) : data.position ===
                                projectData.applied_position ? (
                                <BaseButton size="sm" color="primary">
                                  완료
                                </BaseButton>
                              ) : (
                                <BaseButton
                                  size="sm"
                                  color="line"
                                  onClick={() => {
                                    if (user?.id === projectData?.user.id)
                                      return;
                                    if (!token) {
                                      setIsLoginSuggestionModalOpen(true);
                                      return;
                                    }
                                    mutate(data.position, {
                                      onSuccess: () => setIsModalOpen(true),
                                    });
                                  }}
                                >
                                  지원
                                </BaseButton>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* 현재 참여중인 인원 */}
                <div className="flex flex-col gap-[1.8rem] rounded-[0.8rem] border border-solid border-black-50 px-[2.2rem] pb-[3rem] pt-[2rem]">
                  <span className="text-caption-13_Sb600">
                    현재 참여중인 인원
                  </span>
                  <div className="grid grid-cols-2 gap-x-[4.2rem] gap-y-[1rem] sm:grid-cols-4 md:flex md:gap-[2.8rem]">
                    {projectData?.recruitments
                      ?.filter((data) => data.current_count >= 1)
                      .map((data, idx) => (
                        <div
                          key={idx}
                          className="flex w-[8.4rem] justify-between gap-[1rem] md:w-fit"
                        >
                          <span className="whitespace-nowrap text-body-14_M500">
                            {getPosition(data.position)}
                          </span>
                          <span className="text-body-14_M500 text-primary">
                            {data.current_count}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
                {/* 사용 스킬 */}
                <div className="flex flex-col gap-[1.8rem] rounded-[0.8rem] border border-solid border-black-50 px-[2.2rem] pb-[3rem] pt-[2rem]">
                  <span className="text-caption-13_Sb600">사용 스킬</span>
                  <div className="flex gap-[1.5rem]">
                    <SkillIcons
                      iconKeys={
                        projectData?.skills
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
            <div className="flex flex-col gap-[2.4rem] pl-[2.2rem] pr-[5rem]">
              <div className="flex flex-col gap-[3.8rem]">
                <div className="flex flex-col gap-[1.2rem]">
                  <span className="text-title-24_Sb600">프로젝트 주제</span>
                  <div className="whitespace-pre-line text-body-16_M500">
                    {parseDetail(projectData?.detail ?? '').subject}
                  </div>
                </div>
                <div className="flex flex-col gap-[1.2rem]">
                  <span className="text-title-24_Sb600">진행 상황</span>
                  <div className="whitespace-pre-line text-body-16_M500">
                    {parseDetail(projectData?.detail ?? '').progress}
                  </div>
                </div>
                <div className="flex flex-col gap-[1.2rem]">
                  <span className="text-title-24_Sb600">지원 자격</span>
                  <div className="whitespace-pre-line text-body-16_M500">
                    {parseDetail(projectData?.detail ?? '').requirements}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[1rem]">
                <div className="text-title-20_Sb600">
                  {parseDetail(projectData?.detail ?? '').extraTitle}
                </div>
                <div className="whitespace-pre-line text-body-16_M500">
                  {parseDetail(projectData?.detail ?? '').extraContent}
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
              <div className="grid grid-cols-3 gap-[1.2rem] px-[2rem]">
                {sortedMemberData?.map((data, idx) => (
                  <ProfileTag
                    key={idx}
                    path={data.id}
                    imageUrl={data.profile_img_url}
                    name={data.name}
                    jobRole={getPosition(data.position)}
                    yearCount={data.year_count}
                    type={
                      data.id === projectData?.user.id ? 'creator' : 'default'
                    }
                    token={token}
                    setIsLoginSuggestionModalOpen={
                      setIsLoginSuggestionModalOpen
                    }
                  />
                ))}
              </div>
              <div className="flex justify-center">
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
      <SupplyModal
        size="large"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <LoginSuggestionModal
        size="large"
        isOpen={isLoginSuggestionModalOpen}
        onClose={() => setIsLoginSuggestionModalOpen(false)}
      />
    </>
  );
};

export default Post;
