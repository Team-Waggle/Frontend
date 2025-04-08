import { useState } from "react";

import ProfileSetting from "../assets/profile/icon/icon-profileSetting.svg?react";
import RequiredIcon from "../assets/profile/icon/icon-required.svg?react";
import PlusIcon from "../assets/profile/icon/icon-plus.svg?react";
import MinusIcon from "../assets/profile/icon/icon-minus.svg?react";

import FormLabel from "../components/Profile/FormLabel";
import StyledInput from "../components/Profile/StyledInput";
import IndustrySelect from "../components/Profile/IndustrySelect";
import DaySelect from "../components/Profile/DaySelect";

import Dropdown from "../components/Dropdown";
import DropdownC from "../components/DropdownC";
import CalendarDropdown from "../components/CalendarDropdown";
import DropdownWithLabel from "../components/DropdownWithLabel";

// 1. 드롭다운 2. 팀플 성향 그리드 3. 자기소개 4. 사용 스킬 자동 완성
// 그 다음으로 Active, Hover 작업
// 최대 5개 선택 가능 텍스트 size / bold 변경

// 직무 및 경력 - 드롭다운
// 관심 산업 분야 - 최대 5개 선택 가능 텍스트 size, bold
// 선호 시간 - 드롭다운
// 선호 진행방식 및 지역 - 드롭다운
// 팀플 성향 - 그리드, 최대 5개 선택 가능 텍스트 size, bold
// 자기소개 - textarea
// 링크 - input, 드롭다운

const Profile = () => {
    const jobs = [
        "IOS", "기획자", "데브옵스", "디자이너", "마케터",
    ];

    const industryList = [
        "건강", "건설", "금융", "교육", "문화/예술",
        "미디어/광고", "부동산", "뷰티/패션", "소셜네트워크",
        "의료/헬스케어", "여행", "육아/출산", "엔터테인먼트",
        "이커머스", "인테리어", "종교", "판매/유통", "기타",
    ];

    const workExperience = [
        "0년차", "1~3년차", "4~6년차", "7~10년차", "10년차 이상"
    ];

    const preferredTime = [
        "오전 (6:00~12:00)", "오후 (12:00~18:00)", "저녁 (18:00~22:00)",
        "심야 (22:00~02:00)", "새벽 (02:00~06:00)"
    ];

    const onOff = [
        "온라인만", "오프라인만", "온/오프라인"
    ];

    const region = [
        "서울특별시", "경기도", "인천광역시", "강원특별자치도", "대전광역시", "추가예정"
    ];

    // 이미지 추가
    const site = [
        "Branch story", "Dribbble", "GitHub", "Instagram", "Notion", "추가예정"
    ];

    // 수정 (공부하기)
    const chunk = <T,>(arr: T[], size: number): T[][] =>
        arr.reduce<T[][]>((acc, _, i) => {
            if (i % size === 0) acc.push(arr.slice(i, i + size));
            return acc;
        }, []);

    // 수정 (공부하기)
    const industryChunks = chunk(industryList, 9);

    return (
        <div className="flex flex-col items-center w-[1200px]">
            <div className="mt-[42px] mb-[20px]"> <ProfileSetting /> </div>

            <div className="w-[734px] flex flex-col items-start gap-[26px]">
                {/* 닉네임 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 닉네임 <RequiredIcon /> </FormLabel>
                    <StyledInput placeholder="한글, 영어, 숫자 포함 2-10자리 가능" />
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 이메일 </FormLabel>
                    {/* 이메일 받아오는 걸로 수정 */}
                    <StyledInput className="bg-[#F1F1F1]" placeholder="waggle@gmail.com" readOnly />
                </div>

                {/* 직무 및 경력 */}
                <div className="flex items-start flex-col self-stretch gap-[8px] w-full">
                    <FormLabel> 직무 및 경력 <RequiredIcon /> </FormLabel>
                    <div className="flex items-center gap-[6px]">
                        <div className="flex w-[642px] items-center gap-[18px]">
                            <DropdownC
                                items={jobs}
                                title="직무 선택"
                            />
                            <DropdownC
                                items={workExperience}
                                title="경력 선택"
                            />
                        </div>
                        <div className="flex w-[40px] h-[40px] justify-center items-center gap-[10px]">
                            <PlusIcon />
                        </div>
                    </div>
                </div>

                {/* 관심 산업 분야 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 관심 산업 분야 <RequiredIcon /> 최대 5개 선택 가능 </FormLabel>
                    <div className="flex flex-col items-start content-start self-stretch flex-wrap gap-y-[10px] gap-x-[5px] pb-[10px]">
                        {industryChunks.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-[5px]">
                                {row.map((item) => (
                                    <IndustrySelect key={item}>{item}</IndustrySelect>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 사용 스킬 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 사용 스킬 <RequiredIcon /> </FormLabel>
                    <StyledInput placeholder="프로그램 이름을 입력하세요." />
                </div>

                {/* 선호 요일 및 시간 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 선호 요일 및 시간 </FormLabel>
                    <div className="flex gap-[16px] items-center self-stretch">
                        <div className="flex flex-[1_0_0%] items-center justify-between rounded-[8px]">
                            <DaySelect> 월 </DaySelect>
                            <DaySelect> 화 </DaySelect>
                            <DaySelect> 수 </DaySelect>
                            <DaySelect> 목 </DaySelect>
                            <DaySelect> 금 </DaySelect>
                            <DaySelect> 토 </DaySelect>
                            <DaySelect> 일 </DaySelect>
                        </div>
                        <div className="w-[358px]">
                            <DropdownC
                                items={preferredTime}
                                title="선호 시간"
                            />
                        </div>
                    </div>
                </div>

                {/* 선호 진행방식 및 지역 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 선호 진행방식 및 지역 <RequiredIcon /> </FormLabel>
                    <div className="flex items-center gap-[18px] self-stretch">
                        <DropdownC
                            items={onOff}
                            title="진행 방식"
                        />
                        <DropdownC
                            items={region}
                            title="지역 선택"
                        />
                    </div>
                </div>

                {/* 팀플 성향 + 유지보수 쉽게 리팩토링 해야함 */}
                <div className="flex flex-col flex-start self-stretch gap-[20px] w-full">
                    <FormLabel> 팀플 성향 <RequiredIcon /> 최대 5개 선택 가능 </FormLabel>
                    <div className="flex flex-col items-start gap-[14px] slef-stretch">
                        <div className="flex justify-between items-start self-stretch">
                            <div className="flex w-[140px] h-[32px] justify-center items-center rounded-[4px] bg-[#D9E8FF]
                            text-[#000] text-[13px] font-[500] leading-[150%] text-center"> 
                                소통 스타일
                            </div>
                            <div className="flex w-[140px] h-[32px] justify-center items-center rounded-[4px] bg-[#fff]
                            text-[#949598] text-[13px] font-[500] leading-[150%] text-center"> 
                                협업 성향
                            </div>
                            <div className="flex w-[140px] h-[32px] justify-center items-center rounded-[4px] bg-[#fff]
                            text-[#949598] text-[13px] font-[500] leading-[150%] text-center"> 
                                말하는 방식
                            </div>
                            <div className="flex w-[140px] h-[32px] justify-center items-center rounded-[4px] bg-[#fff]
                            text-[#949598] text-[13px] font-[500] leading-[150%] text-center"> 
                                문제 해결방식
                            </div>
                            <div className="flex w-[140px] h-[32px] justify-center items-center rounded-[4px] bg-[#fff]
                            text-[#949598] text-[13px] font-[500] leading-[150%] text-center"> 
                                MBTI
                            </div>
                        </div>
                        {/* 형식 변경 */}
                        <div className="flex justify-between items-start content-start self-stretch flex-wrap">
                            <div>
                                <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF] mb-[10px]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 1-1 </div>
                                <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 1-2 </div>
                            </div>
                            <div>
                            <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF] mb-[10px]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 2-1 </div>
                                <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 2-2 </div>
                            </div>
                            <div>
                            <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF] mb-[10px]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 3-1 </div>
                                <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 3-2 </div>
                            </div>
                            <div>
                            <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF] mb-[10px]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 4-1 </div>
                                <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 4-2 </div>
                            </div>
                            <div>
                            <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF] mb-[10px]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 5-1 </div>
                                <div className="flex w-[140px] h-[80px] justify-center items-center
                                rounded-[10px] border border-[#C4C4C6] bg-[#FFFFFF]
                                text-center text-[#949598] text-[13px] font-[500] leading-[150%]"> 5-2 </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 자기 소개 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 자기 소개 </FormLabel>
                    <div className="flex flex-col items-start gap-[6px] self-stretch">
                        <textarea
                        maxLength={300}
                        className="flex h-[212px] pt-[16px] pr-[18px] pb-[20px] pl-[18px] items-start gap-[10px] self-stretch
                        rounded-[8px] border border-[#C4C4C6] bg-[#FFFFFF]"
                        placeholder="나는 어떤 사람인지, 어떤 프로젝트를 찾고 있는지, 간단한 인사도 좋아요!" />
                        <div className="self-stretch text-[#949598] text-[14px] font-[500] leading-[168%] text-right"> N / 300 </div>
                    </div>
                </div>

                {/* 링크 */}
                <div className="flex flex-col items-start self-stretch gap-[8px] w-full">
                    <FormLabel> 링크 </FormLabel>

                    {/* 아래 CSS 수정 필요. dropdown w-[333px] 이 안 먹음 임시방편으로 주소Input에 291px 먹임*/}
                    <div className="flex items-center gap-[6px]">
                        <div className="flex w-[642px] items-center gap-[18px]">
                            <div className="w-[291px]"> <StyledInput placeholder="주소" /> </div>
                            <div className="flex w-[333px]">
                                <DropdownC
                                    items={site}
                                    title="사이트"
                                />
                            </div>
                        </div>
                        <div className="flex w-[40px] h-[40px] justify-center items-center gap-[10px]">
                            <PlusIcon />
                        </div>
                    </div>
                </div>
            </div>

            <button className="mt-[100px] flex h-[var(---48-,48px)] py-[var(--,10px)] px-[var(--S48-,80px)] 
            items-center justify-center gap-[10px] text-[#ffffff] bg-[#0066FF] rounded-[8px]">
                저장
            </button>

        </div>
    );
};

export default Profile;