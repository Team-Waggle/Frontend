import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import type { UpdateUserDto, PositionItem, Introduction } from '../types/user';

import { useNavigate } from 'react-router-dom';

import FormLabel from '../components/FormLabel';
import DropdownBasicTab from '../components/common/Tab/DropdownBasicTab';
import BasicTextArea from '../components/common/InputBox/BasicTextArea/BaseBasicTextArea';
import CustomButton from '../components/common/Button/BaseButton';

import ProfileImageField from '../components/NewProfile/ProfileImageField';
import NickNameField from '../components/NewProfile/NickNameField';
import EmailField from '../components/NewProfile/EmailField';
import JobExperienceField from '../components/NewProfile/JobExperienceSectionField';
import IndustriesField from '../components/NewProfile/IndustriesField';
import SkillField from '../components/NewProfile/SkillField';
import DayAndTimeField from '../components/NewProfile/DayAndTimeField';
import WorkWayAndRegionField from '../components/NewProfile/WorkWayAndRegionField';
import LinksField from '../components/NewProfile/LinksField';

interface Row {
  job: string;
  exp: string;
}

interface LinkRow {
  id: string;
  site: string;
  url: string;
}

const ProfileForm = () => {
  // delete User 오류 해결 후 주석 해제
  // const { user, fetchUser, updateUser, deleteUser } = useUser();
  const { user, fetchUser, updateUser } = useUser();
  const [loading, setLoading] = useState(true);
  const isExistingUser = !!user?.id;

  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [rows, setRows] = useState<Row[]>([{ job: '', exp: '' }]);
  const [links, setLinks] = useState<LinkRow[]>([
    { id: crypto.randomUUID(), site: '', url: '' },
  ]);
  const [skillKeywords, setSkillKeywords] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState('');
  const [workWay, setWorkWay] = useState('');
  const [region, setRegion] = useState('');
  const [detail, setDetail] = useState('');
  const [introductions, setIntroductions] = useState<Introduction>({
    communication_styles: [],
    collaboration_styles: [],
    work_styles: [],
    problem_solving_approaches: [],
    mbti: '',
  });
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined,
  );

  const [nicknameRequiredMessage, setNicknameRequiredMessage] = useState(false);
  const [industryRequiredMessage, setIndustryRequiredMessage] = useState(false);

  // 초기값 (get)
  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      console.log(userData);

      if (userData) {
        setNickname(userData.name);
        setEmail(userData.email || '');
        setWorkWay(userData.preferred_work_way);
        setRegion(userData.preferred_sido);
        setPreferredTime(userData.preferred_work_time);
        setDetail(userData.detail || '');
        setSelectedIndustries(userData.industries || []);
        setSelectedDays(userData.days_of_week || []);
        setSkillKeywords(userData.skills || []);

        setRows(
          userData.positions && userData.positions.length > 0
            ? (userData.positions as PositionItem[]).map((p) => ({
                job: p.position,
                exp: String(p.year_count),
              }))
            : [{ job: '', exp: '' }],
        );

        setLinks(
          userData.portfolios && userData.portfolios.length > 0
            ? userData.portfolios.map((p) => ({
                id: crypto.randomUUID(),
                site: p.portfolio_type,
                url: p.url,
              }))
            : [{ id: crypto.randomUUID(), site: '', url: '' }],
        );

        setProfileImageUrl(userData.profile_img_url);

        if (userData.introductions) {
          setIntroductions({
            communication_styles:
              userData.introductions.communication_styles.filter(Boolean),
            collaboration_styles:
              userData.introductions.collaboration_styles.filter(
                (v) => typeof v === 'string' && v.length > 0,
              ),
            work_styles: userData.introductions.work_styles.filter(Boolean),
            problem_solving_approaches:
              userData.introductions.problem_solving_approaches.filter(Boolean),
            mbti: userData.introductions.mbti || '',
          });
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [fetchUser]);

  const { uploadProfileImage } = useUser();
  const handleProfileImageUpload = async (file: File) => {
    try {
      await uploadProfileImage(file);
      alert('프로필 이미지가 업데이트되었습니다.');
    } catch (err) {
      console.error(err);
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  // 저장 (put)
  const handleSubmit = async () => {
    let hasError = false;
    if (!nickname.trim()) {
      setNicknameRequiredMessage(true);
      hasError = true;
    } else setNicknameRequiredMessage(false);
    if (selectedIndustries.length === 0) {
      setIndustryRequiredMessage(true);
      hasError = true;
    } else setIndustryRequiredMessage(false);
    if (hasError) return;

    const payload: UpdateUserDto = {
      name: nickname,
      detail,
      skills: skillKeywords,
      positions: rows.map((r) => ({
        position: r.job,
        year_count: Number(r.exp),
      })),
      portfolios: links
        .filter((l) => l.url.trim() !== '')
        .map((l) => ({
          portfolio_type: l.site,
          url: l.url,
        })),
      industries: selectedIndustries,
      preferred_days_of_week: selectedDays,
      preferred_work_way: workWay,
      preferred_sido: region,
      preferred_work_time: preferredTime,
      introduction: introductions,
      profile_img_url: profileImageUrl,
    };

    try {
      await updateUser(payload);
      console.log('selectedDays', selectedDays);
      console.log('selectedIndustries', selectedIndustries);
      console.log('introductions', introductions);
      alert('프로필이 업데이트되었습니다.');
    } catch (err) {
      console.error(err);
      alert('업데이트에 실패했습니다.');
    }
  };

  // const handleDelete = async () => {
  //   if (!confirm('정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.'))
  //     return;

  //   try {
  //     await deleteUser();
  //     alert('계정이 탈퇴되었습니다.');
  //     navigate('/'); // 홈 또는 로그인 화면으로 리다이렉트
  //   } catch (err) {
  //     console.error('탈퇴 중 오류:', err);
  //     alert('탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.');
  //   }
  // };

  if (loading) return <div>로딩 중 ...</div>;

  // 관심 산업 분야 toggle
  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries((prev) => prev.filter((item) => item !== industry));
    } else {
      if (selectedIndustries.length < 5) {
        setSelectedIndustries((prev) => [...prev, industry]);
      }
    }
  };

  // 선호 요일 및 시간 toggle
  const toggleDay = (days: string) => {
    if (selectedDays.includes(days)) {
      setSelectedDays((prev) => prev.filter((item) => item !== days));
    } else {
      setSelectedDays((prev) => [...prev, days]);
    }
  };

  // 직무 및 경력 minus, plus btn
  const addJobExperienceRow = () => {
    setRows((prev) => [...prev, { job: '', exp: '' }]);
  };

  const removeJobExperienceRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index));
  };

  const updateJobRow = (index: number, key: 'job' | 'exp', value: string) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [key]: value } : row)),
    );
  };

  const addLink = () =>
    setLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), site: '', url: '' },
    ]);

  const removeLink = (id: string) =>
    setLinks((prev) => prev.filter((link) => link.id !== id));

  const updateLink = (id: string, key: 'site' | 'url', value: string) =>
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [key]: value } : link)),
    );

  return (
    <div className="flex h-[207.4rem] w-[120rem] flex-col items-center">
      <ProfileImageField
        ProfileImgFieldUrl={profileImageUrl}
        onFileSelect={handleProfileImageUpload}
      />
      <div className="flex flex-col items-center gap-[1.6rem] self-stretch">
        <div className="flex flex-col items-center gap-[10rem] self-stretch">
          <div className="flex w-[73.4rem] flex-col items-start gap-[2.6rem]">
            {/* 닉네임 */}
            <NickNameField
              nickname={nickname}
              setNickname={setNickname}
              requiredMessage={nicknameRequiredMessage}
            />

            {/* 이메일 */}
            <EmailField email={email} setEmail={setEmail} />

            {/* 직무 및 경력 */}
            <JobExperienceField
              rows={rows}
              addRow={addJobExperienceRow}
              removeRow={removeJobExperienceRow}
              updateRow={updateJobRow}
            />

            {/* 관심 산업 분야 */}
            <IndustriesField
              selectedIndustries={selectedIndustries}
              toggleIndustry={toggleIndustry}
              industryRequiredMessage={industryRequiredMessage}
            />

            {/* 사용 스킬 */}
            <SkillField
              skillKeywords={skillKeywords}
              setSkillKeywords={setSkillKeywords}
            />

            {/* 선호 요일 및 시간 */}
            <DayAndTimeField
              selectedDays={selectedDays}
              toggleDay={toggleDay}
              preferredTime={preferredTime}
              setPreferredTime={setPreferredTime}
            />

            {/* 선호 진행방식 및 지역 */}
            <WorkWayAndRegionField
              workWay={workWay}
              setWorkWay={setWorkWay}
              region={region}
              setRegion={setRegion}
            />

            {/* 팀플 성향 */}
            <div className="flex-start flex w-full flex-col gap-[2rem] self-stretch">
              <FormLabel
                title="팀플 성향"
                isRequired
                caption="각 최대 5개 선택 가능"
              />
              <DropdownBasicTab
                introduction={introductions}
                setIntroduction={setIntroductions}
              />
            </div>

            {/* 자기 소개 */}
            <div className="flex w-full flex-col gap-[0.8rem]">
              <FormLabel title="자기 소개" />
              <BasicTextArea
                value={detail}
                onChange={setDetail}
                size="lg"
                showCount={true}
                countFormatter={(curr, max) => `${curr} / ${max}자`}
                placeholder="나는 어떤 사람인지, 어떤 프로젝트를 찾고 있는지, 간단한 인사도 좋아요!"
              />
            </div>

            {/* 링크 */}
            <LinksField
              links={links}
              addLink={addLink}
              removeLink={removeLink}
              updateLink={updateLink}
            />
          </div>
          <CustomButton onClick={handleSubmit} color="primary" size="full">
            저장
          </CustomButton>
        </div>

        {isExistingUser && (
          <CustomButton
            // onClick={handleDelete}
            color="special"
            size="md"
          >
            탈퇴하기
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;
