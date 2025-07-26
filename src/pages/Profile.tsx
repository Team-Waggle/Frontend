import { useState } from "react";

import ProfileSetting from "../assets/profile/icon/icon-profileSetting.svg?react";
import RequiredIcon from "../assets/profile/icon/icon-required.svg?react";
import PlusIcon from "../assets/profile/icon/icon-plus.svg?react";
import MinusIcon from "../assets/profile/icon/icon-minus.svg?react";

import FormLabel from "../components/Profile/FormLabel";
import StyledInput from "../components/Profile/StyledInput";
import IndustrySelect from "../components/Profile/IndustrySelect";
import DaySelect from "../components/Profile/DaySelect";

const Profile = () => {
    // 수정 (공부하기)
    const industryList = [
        "건강", "건설", "금융", "교육", "문화/예술",
        "미디어/광고", "부동산", "뷰티/패션", "소셜네트워크",
        "의료/헬스케어", "여행", "육아/출산", "엔터테인먼트",
        "이커머스", "인테리어", "종교", "판매/유통", "기타"
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

            <div className="max-w-[734px] flex flex-col items-start gap-[26px]">
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
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 직무 및 경력 <RequiredIcon /> </FormLabel>
                    <div className="flex gap-[6px]">
                        <select>
                            <option> IOS </option>
                            <option> 기획자 </option>
                            <option> 데브옵스 </option>
                            <option> 디자이너 </option>
                            <option> 마케터 </option>
                        </select>
                        <select>
                            <option> 0년차 </option>
                            <option> 1~3년차 </option>
                            <option> 4~6년차 </option>
                            <option> 7~10년차 </option>
                            <option> 10년차 이상 </option>
                        </select>
                        <PlusIcon />
                    </div>
                </div>

                {/* 관심 산업 분야 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 관심 산업 분야 <RequiredIcon /> 최대 5개 선택 가능 </FormLabel>
                    <div className="flex flex-col gap-[10px]">
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
                        <div className="flex flex-[1_0_0%] justify-between">
                            <DaySelect> 월 </DaySelect>
                            <DaySelect> 화 </DaySelect>
                            <DaySelect> 수 </DaySelect>
                            <DaySelect> 목 </DaySelect>
                            <DaySelect> 금 </DaySelect>
                            <DaySelect> 토 </DaySelect>
                            <DaySelect> 일 </DaySelect>
                        </div>
                        <select>
                            <option> 선호 시간 </option>
                        </select>
                    </div>
                </div>

                {/* 선호 진행방식 및 지역 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 선호 진행방식 및 지역 <RequiredIcon /> </FormLabel>
                    <div>
                        <select>
                            <option> 진행 방식 </option>
                        </select>
                        <select>
                            <option> 지역 선택 </option>
                        </select>
                    </div>
                </div>

                {/* 팀플 성향 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 팀플 성향 <RequiredIcon /> 최대 5개 선택 가능 </FormLabel>
                    <div>
                        <div className="flex">
                            <div> 소통 스타일 </div>
                            <div> 협업 성향 </div>
                            <div> 말하는 방식 </div>
                            <div> 문제 해결방식 </div>
                            <div> MBTI </div>
                        </div>
                        <div className="flex">
                            <div>
                                <div> 1-1 </div>
                                <div> 1-2</div>
                            </div>
                            <div>
                                <div> 2-1 </div>
                                <div> 2-2</div>
                            </div>
                            <div>
                                <div> 3-1 </div>
                                <div> 3-2</div>
                            </div>
                            <div>
                                <div> 4-1 </div>
                                <div> 4-2</div>
                            </div>
                            <div>
                                <div> 5-1 </div>
                                <div> 5-2</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 자기 소개 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 자기 소개 </FormLabel>
                    <textarea placeholder="나는 어떤 사람인지, 어떤 프로젝트를 찾고 있는지, 간단한 인사도 좋아요!" />
                </div>

                {/* 링크 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 링크 </FormLabel>
                    <div>
                        <input className="h-[var(---46-,46px)] pr-[8px] pl-[18px] py-0 items-center self-stretch border rounded-[8px] border-[#c4c4c6]"
                        placeholder="주소" />
                        <select>
                            <option> 사이트 </option>
                        </select>
                        <PlusIcon />
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