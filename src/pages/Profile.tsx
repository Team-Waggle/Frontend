import { useState } from 'react';
import * as formOptions from '../constants/formOptions';

import ProfileIcon from '../components/common/Profile/ProfileIcon/BaseProfileIcon';
import ProfileChip from '../components/common/Profile/ProfileChip/BaseProfileChip';
import RequiredIcon from '../assets/inputBox/ic_input_required_red.svg?react';
import PlusIcon from '../assets/profile/icon/icon-plus.svg?react';
import MinusIcon from '../assets/profile/icon/icon-minus.svg?react';

import FormLabel from '../components/Profile/FormLabel';
import StyledInput from '../components/Profile/StyledInput';
import SkillInput from '../components/Profile/SkillInput';
import IndustrySelect from '../components/Profile/IndustrySelect';
import DaySelect from '../components/Profile/DaySelect';
import TeamPlayLabelBtn from '../components/Profile/TeamPlayLabelBtn';
import SelfIntroduction from '../components/Profile/SelfIntroduction';
import DropdownC from '../components/DropdownC';

import TestIMG from '../assets/profile/icon/test-img.png';

const Profile = () => {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleIndustry = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries((prev) => prev.filter((item) => item !== industry));
    } else {
      if (selectedIndustries.length < 5) {
        setSelectedIndustries((prev) => [...prev, industry]);
      }
    }
  };

  const toggleDay = (days: string) => {
    if (selectedDays.includes(days)) {
      setSelectedDays((prev) => prev.filter((item) => item !== days));
    } else {
      setSelectedDays((prev) => [...prev, days]);
    }
  };

  // 관심 산업 분야 chunk
  const chunk = <T,>(arr: T[], size: number): T[][] =>
    arr.reduce<T[][]>((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size));
      return acc;
    }, []);

  const industryChunks = chunk(formOptions.industryList, 9);

  return (
    <div className="flex w-[1200px] flex-col items-center">
      <div className="mb-[20px] mt-[42px]">
        <ProfileIcon size="lg" type="edit" />  
      </div>

      <div className="flex w-[734px] flex-col items-start gap-[26px]">
        {/* 닉네임 */}
        <div className="flex w-full flex-col gap-[8px]">
          <FormLabel>
            {' '}
            닉네임 <RequiredIcon />{' '}
          </FormLabel>
          <StyledInput
            placeholder="한글, 영어, 숫자 포함 2-10자리 가능"
            typingMessage="닉네임에 특수문자는 사용이 불가능합니다."
          />
        </div>

        {/* 이메일 */}
        <div className="flex w-full flex-col gap-[8px]">
          <FormLabel> 이메일 </FormLabel>
          {/* 이메일 받아오는 걸로 수정 */}
          <StyledInput
            className="pointer-events-none cursor-default bg-black-40"
            placeholder="waggle@gmail.com"
            readOnly
          />
        </div>

        {/* 직무 및 경력 */}
        <div className="flex w-full flex-col items-start gap-[8px] self-stretch">
          <FormLabel>
            {' '}
            직무 및 경력 <RequiredIcon />{' '}
          </FormLabel>
          <div className="flex items-center gap-[6px]">
            <div className="flex w-[642px] items-center gap-[18px]">
              <DropdownC
                items={formOptions.jobs}
                title="직무 선택"
                width="w-[312px]"
              />
              <DropdownC
                items={formOptions.workExperience}
                title="경력 선택"
                width="w-[312px]"
              />
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center gap-[10px]">
              <PlusIcon />
            </div>
          </div>
        </div>

        {/* 관심 산업 분야 */}
        <div className="flex w-full flex-col gap-[8px]">
          <FormLabel secondaryText={'최대 5개 선택 가능'}>
            {' '}
            관심 산업 분야 <RequiredIcon />{' '}
          </FormLabel>
          <div className="flex flex-col flex-wrap content-start items-start gap-x-[5px] gap-y-[10px] self-stretch pb-[10px]">
            {/* 수정할 수 있을 거 같은데 chunk 안 쓰고 wrap 쓰는 걸로 변경 그리고 한 개로 변경하자 */}
            {industryChunks.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-[5px]">
                {row.map((item) => (
                  <IndustrySelect
                    key={item}
                    isActive={selectedIndustries.includes(item)}
                    onClick={() => toggleIndustry(item)}
                  >
                    {item}
                  </IndustrySelect>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 사용 스킬 */}
        <div className="flex flex-col items-start gap-[8px] self-stretch">
          <FormLabel>
            {' '}
            사용 스킬 <RequiredIcon />{' '}
          </FormLabel>
          <SkillInput children={'Typescript'} />
        </div>

        {/* 선호 요일 및 시간 */}
        <div className="flex w-full flex-col gap-[8px]">
          <FormLabel> 선호 요일 및 시간 </FormLabel>
          <div className="flex items-center gap-[16px] self-stretch">
            <div className="flex flex-[1_0_0%] items-center justify-between rounded-[8px]">
              {formOptions.day.map((day) => (
                <DaySelect
                  onClick={() => toggleDay(day)}
                  isActive={selectedDays.includes(day)}
                >
                  {day}
                </DaySelect>
              ))}
            </div>
            <div className="w-[358px]">
              <DropdownC items={formOptions.preferredTime} title="선호 시간" />
            </div>
          </div>
        </div>

        {/* 선호 진행방식 및 지역 */}
        <div className="flex w-full flex-col gap-[8px]">
          <FormLabel>
            {' '}
            선호 진행방식 및 지역 <RequiredIcon />{' '}
          </FormLabel>
          <div className="flex items-center gap-[18px] self-stretch">
            <DropdownC items={formOptions.onOff} title="진행 방식" />
            <DropdownC items={formOptions.region} title="지역 선택" />
          </div>
        </div>

        {/* 팀플 성향 + 유지보수 쉽게 리팩토링 해야함 */}
        <div className="flex-start flex w-full flex-col gap-[20px] self-stretch">
          <FormLabel secondaryText={'최대 5개 선택 가능'}>
            {' '}
            팀플 성향 <RequiredIcon />{' '}
          </FormLabel>
          <TeamPlayLabelBtn />
        </div>

        {/* 자기 소개 */}
        <div className="flex w-full flex-col gap-[8px]">
          <FormLabel> 자기 소개 </FormLabel>
          <SelfIntroduction />
        </div>

        {/* 링크 */}
        <div className="flex w-full flex-col items-start gap-[8px] self-stretch">
          <FormLabel> 링크 </FormLabel>

          {/* 아래 CSS 수정 필요. dropdown w-[333px] 이 안 먹음 임시방편으로 주소Input에 291px 먹임*/}
          <div className="flex items-center gap-[6px]">
            <div className="flex w-[642px] items-center gap-[18px]">
              <div className="w-[291px]">
                <StyledInput
                  placeholder="주소"
                  useRegex={false}
                  useLengthValidation={false}
                />
              </div>
              <div className="flex w-[333px]">
                <DropdownC
                  items={formOptions.site}
                  title="사이트"
                  width="w-[333px]"
                />
              </div>
            </div>
            <div className="flex h-[40px] w-[40px] items-center justify-center gap-[10px]">
              <PlusIcon />
            </div>
          </div>
        </div>
      </div>

      <button className="mt-[100px] flex h-[48px] items-center justify-center gap-[10px] rounded-[8px] bg-primary px-[80px] py-[10px] text-subtitle-16_Sb600 text-white">
        저장
      </button>
    </div>
  );
};

export default Profile;
