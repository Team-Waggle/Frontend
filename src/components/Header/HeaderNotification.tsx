import ArrowRightIcon from '../../assets/icons/ic_arrow_right_small.svg?react';
import ArrowLeftIcon from '../../assets/icons/ic_arrow_left_small.svg?react';
import BaseToggleSwitch from './BaseToggleSwitch';
import BlueModalIcon from '../../assets/character/modal/small/ch_modal_check_square_blue_small.svg?react';
import AlarmCircle from '../../assets/icons/ic_alarm_circle.svg?react';
import { useState } from 'react';
import BaseTag from '../common/Tag/BaseTag';

const HeaderNotification = () => {
  const [isOn, setIsOn] = useState(false);

  const [isEmailSetting, setIsEmailSetting] = useState(false);

  return (
    // pb 값 수정할 것
    <div className="absolute right-[-4.4rem] top-[5rem] flex h-[38.2rem] w-[32.4rem] flex-col gap-[2rem] rounded-[1.2rem] bg-black-10 px-[2rem] pb-[3.6rem] pt-[2.2rem] shadow-pop sm:right-0">
      <div className="flex h-[2.4rem] w-[28.4rem] justify-between">
        <span className="text-subtitle-16_Sb600">나의 활동</span>
        {!isEmailSetting && (
          <div className="flex gap-[0.4rem]">
            <span className="text-caption-12_M500 text-black-70">
              이메일 수신 설정
            </span>
            <ArrowRightIcon
              className="cursor-pointer"
              onClick={() => setIsEmailSetting(true)}
            />
          </div>
        )}
        {isEmailSetting && (
          <div className="flex gap-[0.4rem]">
            <BaseToggleSwitch
              isOn={isOn}
              onToggle={() => setIsOn((prev) => !prev)}
            />
            <ArrowLeftIcon
              className="cursor-pointer"
              onClick={() => setIsEmailSetting(false)}
            />
          </div>
        )}
      </div>
      {/* 데이터 없을 때 */}
      {/* <div className="flex h-[28rem] w-[28.4rem] items-center justify-center">
        <div className="flex h-[11.647rem] w-[15.6rem] flex-col items-center gap-[2rem]">
        <BlueModalIcon />
        <span className="text-body-14_M500">새로운 활동을 시작해보세요!</span>
        </div>
        </div> */}
      <div className="flex h-[28rem] w-[29rem] flex-col gap-[1.2rem] overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-[0.6rem]">
          <div className="flex gap-[0.4rem]">
            <AlarmCircle />
            <span className="text-caption-12_Sb600 text-black-70">
              03/05(수)18:50
            </span>
          </div>
          <div className="flex w-[29rem] flex-col gap-[0.2rem]">
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag
                  size="sm"
                  type="outline"
                  color="disabled"
                  shape="circle"
                >
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  세계 최초 반려동물 브리더 입양 플랫폼을 함께 만들어가실 개발자
                  팀원을 구합니다
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="blue" shape="circle">
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  마케팅 대시보드 플랫폼 백엔드 개발자 한분 추가
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="blue" shape="circle">
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  든든한 동료 있음! 초기 세팅, 와이어프레임 완료. 함께 웹 구현할
                  개발자를 찾습니다.
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="red" shape="circle">
                  D-7
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  커버곡 중심의 음악 플랫폼 Sing4U
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="blue" shape="circle">
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  사이드프로젝트 와글와글 서비스 제작 연락과 기대 부탁 드립니다.
                  네네네
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[0.6rem]">
          <div className="flex gap-[0.4rem]">
            <AlarmCircle />
            <span className="text-caption-12_Sb600 text-black-70">
              03/05(수)18:50
            </span>
          </div>
          <div className="flex w-[29rem] flex-col gap-[0.2rem]">
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag
                  size="sm"
                  type="outline"
                  color="disabled"
                  shape="circle"
                >
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  세계 최초 반려동물 브리더 입양 플랫폼을 함께 만들어가실 개발자
                  팀원을 구합니다
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="blue" shape="circle">
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  마케팅 대시보드 플랫폼 백엔드 개발자 한분 추가
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="blue" shape="circle">
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  든든한 동료 있음! 초기 세팅, 와이어프레임 완료. 함께 웹 구현할
                  개발자를 찾습니다.
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="red" shape="circle">
                  D-7
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  커버곡 중심의 음악 플랫폼 Sing4U
                </span>
              </div>
            </div>
            <div className="flex h-[3.2rem] w-full cursor-pointer items-center rounded-[0.6rem] bg-black-10 px-[1rem] hover:bg-primary-10">
              <div className="flex w-full gap-[0.6rem]">
                <BaseTag size="sm" type="outline" color="blue" shape="circle">
                  합격
                </BaseTag>
                <span className="truncate text-body-14_M500 text-black-70">
                  사이드프로젝트 와글와글 서비스 제작 연락과 기대 부탁 드립니다.
                  네네네
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNotification;
