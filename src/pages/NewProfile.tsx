import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import { UpdateUserRequest } from '../types/user';

import * as formOptions from '../constants/formOptions';

import ProfileIcon from '../components/common/Profile/ProfileIcon/BaseProfileIcon';
import FormLabel from '../components/Profile/FormLabel';
import IconTextArea from '../components/common/InputBox/IconTextArea/BaseIconTextArea';
import SkillInput from '../components/common/InputBox/KeywordTextArea/KeywordTextArea';
import BasicChipCircle from '../components/common/InputBox/BasicChipCircle/BaseBasicChipCircle';
import BasicChipSquare from '../components/common/InputBox/BasicChipSquare/BaseBasicChipSquare';
import DropdownBasicTab from '../components/common/Profile/Tab/DropdownBasicTab';
import BasicTextArea from '../components/common/InputBox/BasicTextArea/BaseBasicTextArea';
import Select from '../components/common/Select/BaseSelect';

import PlusIcon from '../assets/profile/icon/icon-plus.svg?react';
import MinusIcon from '../assets/profile/icon/icon-minus.svg?react';

const Profile = () => {
  const { user, fetchUser, updateUser } = useUser();
  const [loading, setLoading] = useState(true);

  const [nickname, setNickname] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState('');
  const [workWay, setWorkWay] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [region, setRegion] = useState('');
  const [rows, setRows] = useState([{ job: '', exp: '' }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [detail, setDetail] = useState('');
  const [links, setLinks] = useState([{ site: '', url: '' }]);

  const [nicknameRequiredMessage, setNicknameRequiredMessage] = useState(false);
  const [industryRequiredMessage, setIndustryRequiredMessage] = useState(false);

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

  // 관심 산업 분야 chunk
  const chunk = <T,>(arr: T[], size: number): T[][] =>
    arr.reduce<T[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const industryChunks = chunk(formOptions.industryList, 9);

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

  // site, link
  const addLink = () => setLinks((prev) => [...prev, { site: '', url: '' }]);
  const updateLink = (index: number, key: 'site' | 'url', value: string) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [key]: value } : link)),
    );
  };

  // 초기값 세팅
  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      if (userData) {
        setNickname(userData.name);
        setWorkTime(userData.work_time);
        setWorkWay(userData.work_way);
        setRegion(userData.sido);
        setDetail(userData.detail || '');
        setSelectedIndustries(userData.industry || []);
        setSelectedDays(userData.preferred_days || []);
        setSkills(userData.skills || []);
        setRows(userData.jobs || [{ job: '', exp: '' }]);
        setLinks(userData.links || []);
      }
      setLoading(false);
    };
    loadUser();
  }, [fetchUser]);

  // 저장 btn
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

    const payload: UpdateUserRequest = {
      name: nickname,
      work_time: JSON.stringify({ display_name: preferredTime || workTime }),
      work_way: JSON.stringify({ display_name: workWay }),
      sido: JSON.stringify({ display_name: region }),
      detail,
      industry: selectedIndustries,
      preferred_days: selectedDays,
      skills,
      jobs: rows,
      links,
    };

    try {
      await updateUser(payload);
      alert('프로필이 업데이트되었습니다.');
    } catch (err) {
      console.error(err);
      alert('업데이트에 실패했습니다.');
    }
  };

  return (
    <div className="flex w-[120rem] flex-col items-center">
      <div className="mb-[2rem] mt-[4.2rem]">
        <ProfileIcon size="large" type="edit" />
      </div>

      <div className="flex w-[73.4rem] flex-col items-start gap-[2.6rem]">
        {/* 닉네임 */}
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel
            title="닉네임"
            className="w-[120rem]"
            isRequired
            requiredMessage={nicknameRequiredMessage}
          />
          <IconTextArea
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="한글, 영어, 숫자 포함 2-10자리 가능"
            typingMessage="닉네임에 특수문자는 사용이 불가능합니다."
          />
        </div>

        {/* 이메일 */}
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel title="이메일" />
          {/* 이메일 받아오는 걸로 수정 */}
          <IconTextArea
            className="pointer-events-none cursor-default bg-black-40"
            value={user?.email || ''}
            placeholder="waggle@gmail.com"
            type="fixed"
            state="disable"
            readOnly
          />
        </div>

        {/* 직무 및 경력 */}
        <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
          <FormLabel title="직무 및 경력" isRequired />
          <div className="flex w-auto flex-col gap-[1.8rem]">
            {rows.map((row, index) => (
              <div key={index} className="flex items-center gap-[1.8rem]">
                <div className="flex w-[64.2rem] items-center gap-[1.8rem]">
                  <Select
                    items={formOptions.jobs}
                    title="직무 선택"
                    width="w-[31.2rem]"
                    value={row.job}
                    onChange={(v) => updateJobRow(index, 'job', v)}
                  />
                  <Select
                    items={formOptions.workExperience}
                    title="경력 선택"
                    width="w-[31.2rem]"
                    value={row.exp}
                    onChange={(v) => updateJobRow(index, 'exp', v)}
                  />
                </div>

                <div className="flex h-[4rem] items-center justify-center gap-[1rem]">
                  <button
                    type="button"
                    onClick={addJobExperienceRow}
                    className="flex h-[4rem] items-center justify-center"
                  >
                    <PlusIcon />
                  </button>

                  {index !== 0 && (
                    <button
                      type="button"
                      onClick={() => removeJobExperienceRow(index)}
                      className="flex h-[4rem] w-[4rem] items-center justify-center text-red-500"
                    >
                      <MinusIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 관심 산업 분야 */}
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel
            title="관심 산업 분야"
            caption="최대 5개 선택 가능"
            isRequired
            requiredMessage={industryRequiredMessage}
          />
          <div className="flex flex-col flex-wrap content-start items-start gap-x-[0.5rem] gap-y-[1rem] self-stretch pb-[1rem]">
            {/* 수정할 수 있을 거 같은데 chunk 안 쓰고 wrap 쓰는 걸로 변경 그리고 한 개로 변경하자 */}
            {industryChunks.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-[0.5rem]">
                {row.map((industry) => (
                  <BasicChipCircle
                    key={industry}
                    isActive={selectedIndustries.includes(industry)}
                    onClick={() => toggleIndustry(industry)}
                  >
                    {industry}
                  </BasicChipCircle>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 사용 스킬 */}
        <div className="flex flex-col items-start gap-[0.8rem] self-stretch">
          <FormLabel title="사용스킬" isRequired />
          <SkillInput />
        </div>

        {/* 선호 요일 및 시간 */}
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel title="선호 요일 및 시간" />
          <div className="flex items-center gap-[1.6rem] self-stretch">
            <div className="flex flex-1 items-center justify-between rounded-[0.8rem]">
              {formOptions.day.map((day) => (
                <BasicChipSquare
                  key={day}
                  onClick={() => toggleDay(day)}
                  isActive={selectedDays.includes(day)}
                >
                  {day}
                </BasicChipSquare>
              ))}
            </div>
            <div className="w-[35.8rem]">
              <Select
                items={formOptions.preferredTime}
                title="선호 시간"
                value={preferredTime}
                onChange={setPreferredTime}
              />
            </div>
          </div>
        </div>

        {/* 선호 진행방식 및 지역 */}
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel title="선호 진행방식 및 지역" />
          <div className="flex items-center gap-[1.8rem] self-stretch">
            <Select
              items={formOptions.onOff}
              title="진행 방식"
              value={workWay}
              onChange={setWorkWay}
            />
            <Select
              items={formOptions.region}
              title="지역 선택"
              value={region}
              onChange={setRegion}
            />
          </div>
        </div>

        {/* 팀플 성향 */}
        <div className="flex-start flex w-full flex-col gap-[2rem] self-stretch">
          <FormLabel
            title="팀플 성향"
            isRequired
            caption="각 최대 5개 선택 가능"
          />
          <DropdownBasicTab />
        </div>

        {/* 자기 소개 */}
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel title="자기 소개" />
          <BasicTextArea size="lg" />
        </div>

        {/* 링크 */}
        <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
          <FormLabel title="링크" />

          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-[0.6rem]">
              <div className="flex w-[64.2rem] items-center gap-[1.8rem]">
                <IconTextArea
                  className="w-[29.1rem]"
                  placeholder="주소"
                  useRegex={false}
                  useLengthValidation={false}
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                />
                <Select
                  items={formOptions.site}
                  title="사이트"
                  width="w-[33.3rem]"
                  value={link.site}
                  onChange={(v) => updateLink(index, 'site', v)}
                />
              </div>

              <div className="flex h-[4rem] w-[8rem] items-center justify-center gap-[1rem]">
                {/* 링크 추가 */}
                <button type="button" onClick={() => addLink()}>
                  <PlusIcon />
                </button>

                {/* 첫 번째 링크에는 Minus 버튼 표시하지 않음 */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setLinks((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <MinusIcon />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-[10rem] flex h-[4.8rem] items-center justify-center gap-[1rem] rounded-[0.8rem] bg-primary px-[8rem] py-[1rem] text-subtitle-16_Sb600 text-white"
      >
        저장
      </button>
    </div>
  );
};

export default Profile;
