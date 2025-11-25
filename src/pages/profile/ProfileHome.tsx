import { useUserProfile } from '../../hooks/useUserProfile';
import {
  getIndustry,
  getWaysOfWorking,
  getPosition,
  getSido,
  getWorkTime,
  getTeamPlayOptionList,
  getDay,
} from '../../utils/createMapper';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import BaseProfileIcon from '../../components/common/Profile/ProfileIcon/BaseProfileIcon';

import EmailIc from '../../assets/icons/ic_email_small.svg?react';
import ProfileInfo from '../../components/Profile/ProfileInfo';
import ProfileTag from '../../components/Profile/ProfilePageTag';
import SkillIcons from '../../components/SkillIcons';
import { skillIconMapper } from '../../utils/skillIconMapper';
import LinkIcons from '../../components/LinksIcons';
import EditIcon from '../../assets/icons/ic_edit.svg?react';
import HeartFillIcon from '../../assets/icons/ic_heart_fill_large.svg?react';
import HeartStrokeIcon from '../../assets/icons/ic_heart_stroke_large.svg?react';
import { useFollow } from '../../hooks/useFollow';
import FollowBtn from '../../components/Profile/FollowBtn';

const ProfileHome = () => {
  const { id } = useParams<{ id?: string }>();
  const { profile: user, isMyProfile, loading } = useUserProfile(id);
  const navigate = useNavigate();
  const { isFollowed, toggleFollow, followeesCount } = useFollow(user?.id || ''); // 팔로우 상태 추적

  const location = useLocation();

  const goEditPage = () => {
    if (!user?.id) return;
    navigate(`/profile/edit/${user.id}`, {
      state: { from: location.pathname },
      replace: false,
    });
  };

  if (loading || !user) return <div>로딩 중...</div>;

  const BusinessCardStyle =
    'flex pt-[1.6rem] px-[2rem] pb-[4rem] flex-col items-start gap-[1rem] self-stretch rounded-[0.8rem] border border-solid border-black-50 bg-black-10';

  return (
    <div
      className={`relative flex flex-row ${
        !isMyProfile
          ? 'mt-[4.2rem] flex h-[159.9rem] w-[36rem] sm:w-[76.8rem] md:w-[120rem] flex-shrink-0 flex-row justify-center'
          : ''
      }`}
    >
      <div className="sm:ml-[2.6rem] flex w-[32rem] flex-col items-start gap-[2rem] sm:w-[42.4rem] md:w-[85.6rem]">
        {/* 총 내 프로필 */}
        <div
          className={`flex flex-col items-start gap-[2rem] md:flex-row ${
            isMyProfile ? 'md:h-[32.8rem]' : 'md:h-[34.2rem]'
          }`}
        >
          {/* 내 프로필 */}
          <div className="relative flex min-h-[32.8rem] w-[32rem] flex-shrink-0 flex-col items-center justify-center gap-[1.4rem] self-stretch rounded-[8px] border border-solid border-primary-50 pb-[1rem] sm:w-[42.4rem] md:w-[23rem]">
            {isMyProfile && (
              <div
                className="absolute right-[1.6rem] top-[1.6rem] flex h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center rounded-[6px] bg-black-30 pl-[0.1rem] md:hidden"
                onClick={goEditPage}
              >
                <EditIcon className="text-black-60" />
              </div>
            )}
            <div className="flex w-[15.6rem] flex-col items-center gap-[1.4rem]">
              <div className="flex flex-col items-center gap-[0.6rem]">
                {/* 팔로잉 숫자 표시 */}
                {!isMyProfile && (
                  <div className="flex items-center justify-center gap-[0.4rem] text-primary-70">
                    {isFollowed ? (
                      <HeartFillIcon className="h-[1.6rem] w-[1.6rem]" />
                    ) : (
                      <HeartStrokeIcon className="h-[1.6rem] w-[1.6rem]" />
                    )}
                    <span className="text-caption-13_M500">
                      {followeesCount ?? 0}
                    </span>
                  </div>
                )}
                {/* 프로필 아이콘 */}
                <BaseProfileIcon
                  imageUrl={user.profile_img_url}
                  type="default"
                  size="large"
                />
              </div>
              <div className="flex flex-col items-center self-stretch">
                <div className="flex items-center justify-center gap-[0.2rem] self-stretch">
                  {/* 프로필 이름 */}
                  <span className="text-center text-title-18_Sb600 text-black-130">
                    {user.name}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-[0.6rem] self-stretch">
                  {user.position?.[0] && (
                    <div className="flex items-center justify-center gap-[0.4rem] text-caption-13_M500 text-black-70">
                      <span>{getPosition(user.position) || user.position}</span>
                      <span> | </span>
                      <span> {user.year_count}년차 </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-[0.6rem] text-caption-12_M500 text-black-130">
              <EmailIc />
              <span> {user.email} </span>
            </div>
          </div>

          {/* 내 프로필 정보 */}
          <div className="sm:mr-[2.6rem] flex min-h-[32.8rem] w-[32rem] flex-shrink-0 flex-col items-start gap-[1.8rem] self-stretch rounded-[8px] border border-solid border-primary-50 px-[3rem] pb-[5.6rem] pt-[4.6rem] sm:w-[42.4rem] md:relative md:w-[60.6rem]">
            {isMyProfile && (
              <div
                className="absolute right-[1.6rem] top-[1.6rem] hidden h-[3.2rem] w-[3.2rem] cursor-pointer items-center justify-center rounded-[6px] bg-black-30 pl-[0.1rem] md:flex"
                onClick={goEditPage}
              >
                <EditIcon className="text-black-60" />
              </div>
            )}
            <ProfileInfo
              label="진행 방식"
              values={[getWaysOfWorking(user.preferred_work_way) || user.preferred_work_way]}
            />
            <ProfileInfo
              label="선호 지역"
              values={[getSido(user.preferred_sido) || user.preferred_sido]}
            />
            <ProfileInfo
              label="선호 시간"
              values={[getWorkTime(user.preferred_work_time) || user.preferred_work_time]}
            />
            <ProfileInfo
              label="관심 산업 분야"
              values={[user.industries.map((id) => getIndustry(id) || id).join(', ')]}
            />
            <ProfileInfo label="링크">
              {user.portfolios?.map((portfolio, idx) => (
                <a
                  key={idx}
                  href={portfolio.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkIcons
                    iconKeys={[portfolio.portfolio_type]}
                    size="medium"
                    limit={10}
                  />
                </a>
              ))}
            </ProfileInfo>
            <ProfileInfo label="사용 스킬">
              <div className="flex flex-wrap items-center gap-[0.75rem]">
                {user.skills.map((key) => {
                  const label = skillIconMapper[key];
                  if (!label) return null;

                  return (
                    <div
                      key={key}
                      className="flex flex-wrap content-center items-center gap-[0.5rem] px-[0.25rem]"
                    >
                      <SkillIcons iconKeys={[label]} size="small" />
                      <span className="text-body-14_R400 text-black-130">
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </ProfileInfo>
          </div>
        </div>
        {/* 프로필 명함 01 */}
        <div className={BusinessCardStyle}>
          {/* 내 성향 */}
          <div className="flex flex-col items-start gap-[2.6rem] self-stretch">
            <div className="flex h-[3rem] items-center gap-[1rem] self-stretch border-b border-solid border-black-50 pb-[0.6rem] pl-[0.8rem] pr-0 pt-[0.2rem]">
              <span className="text-center text-caption-14_M500 text-black-130">
                내 성향
              </span>
            </div>
            <div className="flex w-[28rem] flex-wrap content-start items-start gap-x-[1.4rem] gap-y-[3.2rem] self-stretch sm:w-[38.4rem] md:w-[81.6rem] md:flex-nowrap">
              <ProfileTag
                title="소통 스타일"
                items={user.introductions.communication_styles.map(
                  (id) => getTeamPlayOptionList(id) || id,
                )}
              />
              <ProfileTag
                title="협업 성향"
                items={user.introductions.collaboration_styles
                  .map((id) => getTeamPlayOptionList(id))
                  .filter((label): label is string => !!label)}
              />
              <ProfileTag
                title="일하는 방식"
                items={user.introductions.work_styles
                  .map((id) => getTeamPlayOptionList(id))
                  .filter((label): label is string => !!label)}
              />
              <ProfileTag
                title="문제 해결 방식"
                items={user.introductions.problem_solving_approaches
                  .map((id) => getTeamPlayOptionList(id))
                  .filter((label): label is string => !!label)}
              />
              <ProfileTag
                title="MBTI"
                items={[
                  getTeamPlayOptionList(user.introductions.mbti) ||
                    user.introductions.mbti
                ]}
              />
            </div>
          </div>
        </div>
        {/* 프로필 명함 02 */}
        <div className={BusinessCardStyle}>
          <div className="flex flex-col items-start gap-[2.6rem] self-stretch">
            <div className="flex h-[3rem] items-center gap-[1rem] self-stretch border-b border-solid border-black-50 pb-[0.6rem] pl-[0.8rem] pr-0 pt-[0.2rem]">
              <span className="text-center text-caption-14_M500 text-black-130">
                내 소개
              </span>
            </div>
            {/* 성향 차트 */}
            <div className="flex items-start gap-[0.8rem] self-stretch px-[0.8rem]">
              <span className="text-body-16_R400 text-black-130">
                {user.detail}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* 팔로잉 버튼 */}
      <div className='sm:relative absolute right-8 sm:right-0'>
      {!isMyProfile && <FollowBtn userId={user.id} />}
      </div>
    </div>
  );
};

export default ProfileHome;
