import { FormEvent, useState } from 'react';
import LogoCharacterIcon from '../assets/character/bubble-character.svg?react';
import RequireIcon from '../assets/icons/ic_require.svg?react';
import Dropdown from '../components/common/Select/BaseSelect';
import CalendarDropdown from '../components/CalendarDropdown';
import BaseButton from '../components/common/Button/BaseButton';
import BaseIconTextArea from '../components/common/InputBox/IconTextArea/BaseIconTextArea';
import BaseSelect from '../components/common/Select/BaseSelect';
// import DropdownWithLabel from "../components/DropdownWithLabel";
import MinusStepper from '../assets/button/btn_stepper_minus.svg?react';
import PlusStepper from '../assets/button/btn_stepper_plus.svg?react';
import {
  industries,
  workWays,
  workPeriods,
  positions,
} from '../constants/formOptions';
import { useProjectsPostQuery } from '../hooks/useProjectPost';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [workWay, setWorkWay] = useState('');
  const [workPeriod, setWorkPeriod] = useState('');
  const [currentPosition, setCurrentPosition] = useState('');
  const [remainingPosition, setRemainingPosition] = useState('');

  const { mutate } = useProjectsPostQuery();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // mutate({ title, industry, work_way: workWay, work_period: workPeriod });
  };

  return (
    <div className="flex flex-col items-center">
      <LogoCharacterIcon className="mt-[4.2rem]" />
      <form
        className="mb-[21.4rem] mt-[4.2rem] flex w-[73.4rem] flex-col items-center gap-[10rem]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-[14rem]">
          <div className="flex flex-col gap-[2.6rem]">
            <div className="flex flex-col gap-[2.6rem]">
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex gap-[0.2rem]">
                  <span className="text-subtitle-14_Sb600">프로젝트 제목</span>
                  <div className="flex items-center gap-[0.6rem]">
                    <RequireIcon />
                    <span className="text-caption-12_M500 text-error">
                      필수 입력입니다.
                    </span>
                  </div>
                </div>
                <BaseIconTextArea
                  value={title}
                  placeholder="내용을 입력하세요."
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              {/* 산업 분야, 진행 방식 */}
              <div className="flex flex-col gap-[2.6rem]">
                <div className="flex w-full gap-[1.8rem]">
                  <div className="flex flex-col gap-[0.8rem]">
                    <div className="flex items-center gap-[0.2rem]">
                      <span className="text-subtitle-14_Sb600">산업 분야</span>
                      <RequireIcon />
                    </div>
                    <BaseSelect
                      items={industries}
                      title="산업분야"
                      width="w-[35.8rem]"
                      value={industry}
                      onChange={(id) => setIndustry(id)}
                    />
                  </div>
                  <div className="flex flex-col gap-[0.8rem]">
                    <div className="flex items-center gap-[0.2rem]">
                      <span className="text-subtitle-14_Sb600">진행 방식</span>
                      <RequireIcon />
                    </div>
                    <BaseSelect
                      items={workWays}
                      title="진행 방식"
                      width="w-[35.8rem]"
                      value={workWay}
                      onChange={(id) => setWorkWay(id)}
                    />
                  </div>
                </div>
                {/* 프로젝트 주제, 진행기간 */}
                <div className="flex w-full gap-[1.8rem]">
                  <div className="flex flex-col gap-[0.8rem]">
                    <div className="flex items-center gap-[0.2rem]">
                      <span className="text-subtitle-14_Sb600">
                        프로젝트 마감일
                      </span>
                      <RequireIcon />
                    </div>
                    <BaseSelect
                      items={industries}
                      title="년-월-일"
                      width="w-[35.8rem]"
                      value=""
                    />
                  </div>
                  <div className="flex flex-col gap-[0.8rem]">
                    <div className="flex items-center gap-[0.2rem]">
                      <span className="text-subtitle-14_Sb600">진행 기간</span>
                      <RequireIcon />
                    </div>
                    <BaseSelect
                      items={workPeriods}
                      title="진행 기간"
                      width="w-[35.8rem]"
                      value={workPeriod}
                      onChange={(id) => setWorkPeriod(id)}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 사용 스킬 이후 */}
            <div className="flex flex-col gap-[2.6rem]">
              <div className="flex flex-col gap-[3.8rem]">
                <div className="flex flex-col gap-[0.8rem]">
                  <div className="flex items-center gap-[0.2rem]">
                    <span className="text-subtitle-14_Sb600">사용 스킬</span>
                    <div className="flex items-center gap-[0.6rem]">
                      <RequireIcon />
                      <span className="text-caption-12_M500 text-error">
                        필수 입력입니다.
                      </span>
                    </div>
                  </div>
                  {/* 스킬 input 자리 */}
                </div>
                <div className="flex flex-col gap-[2rem]">
                  <div className="flex gap-[5rem]">
                    <div className="flex flex-col gap-[0.8rem]">
                      <div className="flex items-center gap-[0.2rem]">
                        <span className="text-subtitle-14_Sb600">
                          모집 인원
                        </span>
                        <RequireIcon />
                      </div>
                      <BaseSelect
                        items={positions}
                        title="직무 선택"
                        width="w-[35.8rem]"
                        value={remainingPosition}
                        onChange={(id) => setRemainingPosition(id)}
                      />
                    </div>
                    <div className="flex items-end gap-[5rem]">
                      <div className="flex h-[4.6rem] items-center gap-[0.5rem] py-[0.8rem]">
                        <button className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
                          <MinusStepper className="text-white hover:text-black-30" />
                        </button>
                        <div className="px-[0.8rem] text-title-20_Sb600 text-primary">
                          1
                        </div>
                        <button className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
                          <PlusStepper className="text-white hover:text-black-30" />
                        </button>
                      </div>
                      <div className="flex h-[4.6rem] items-center gap-[0.8rem]">
                        <BaseButton>추가</BaseButton>
                        <BaseButton color="line">삭제</BaseButton>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-[5rem] border-t-2 border-solid border-black-40 pt-[2rem]">
                    <div className="flex flex-col gap-[0.8rem]">
                      <div className="flex items-center gap-[0.2rem]">
                        <span className="text-subtitle-14_Sb600">
                          현재 참여중인 인원
                        </span>
                        <RequireIcon />
                      </div>
                      <BaseSelect
                        items={positions}
                        title="직무 선택"
                        width="w-[35.8rem]"
                        value={currentPosition}
                        onChange={(id) => setCurrentPosition(id)}
                      />
                    </div>
                    <div className="flex items-end gap-[5rem]">
                      <div className="flex h-[4.6rem] items-center gap-[0.5rem] py-[0.8rem]">
                        <button className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
                          <MinusStepper className="text-white hover:text-black-30" />
                        </button>
                        <div className="px-[0.8rem] text-title-20_Sb600 text-primary">
                          1
                        </div>
                        <button className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
                          <PlusStepper className="text-white hover:text-black-30" />
                        </button>
                      </div>
                      <div className="flex h-[4.6rem] items-center gap-[0.8rem]">
                        <BaseButton>추가</BaseButton>
                        <BaseButton color="line">삭제</BaseButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 아이디 */}
              <div className=""></div>
              {/* 총 구성인원 */}
              <div className="border-black70 border-t-2 border-solid pt-[1rem]">
                <div className="flex justify-end gap-[0.8rem] text-title-18_Sb600">
                  <span>총 구성인원</span>
                  <div>
                    <span className="text-primary">0</span>
                    <span>명</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 프로젝트 주제 */}
          <div className=""></div>
        </div>
        <div className="flex gap-[0.8rem]">
          <BaseButton size="full" color="secondary" className="w-[23.9rem]">
            임시저장
          </BaseButton>
          <BaseButton size="full" className="w-[23.9rem]">
            등록
          </BaseButton>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
