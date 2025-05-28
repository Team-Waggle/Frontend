import { useState } from "react";
import * as formOptions from '../constants/formOptions';

import ProfileSetting from "../assets/profile/icon/icon-profileSetting.svg?react";
import RequiredIcon from "../assets/profile/icon/icon-required.svg?react";
import PlusIcon from "../assets/profile/icon/icon-plus.svg?react";
import MinusIcon from "../assets/profile/icon/icon-minus.svg?react";

import FormLabel from "../components/Profile/FormLabel";
import StyledInput from "../components/Profile/StyledInput";
import SkillInput from "../components/Profile/SkillInput";
import IndustrySelect from "../components/Profile/IndustrySelect";
import DaySelect from "../components/Profile/DaySelect";
import TeamPlayLabelBtn from "../components/Profile/TeamPlayLabelBtn";
import SelfIntroduction from "../components/Profile/SelfIntroduction";
import Dropdown from "../components/DropdownC";

// 1. 드롭다운
// 2. 사용 스킬 자동 완성
// 3. + - 추가
// 4. 에러 사항 디테일

const Profile = () => {
    const [openedDropdown, setOpenedDropdown] = useState<string | null>(null);

    const [jobs, setJobs] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [preferredTime, setPreferredTime] = useState('');
    const [onOff, setOnOff] = useState('');
    const [region, setRegion] = useState('');
    const [site, setSite] = useState('');

    // 사용할 예정
    const [nickname, setNickname] = useState('');
    const [skillList, setSkillList] = useState<string[]>([]);
    const [teamPlay, setTeamPlay] = useState('');

    const clickDropdown = (id: string) => {
        setOpenedDropdown(prev => (prev === id ? null : id));
    };

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

    const handleSubmit = () => {
        if (!nickname || !jobs || !workExperience || skillList.length === 0 || !teamPlay) {
            // 나중에 삭제
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }
    };

    return (
        <div className="flex flex-col items-center w-[1200px]">
            <div className="mt-[42px] mb-[20px]"> <ProfileSetting /> </div>

            <div className="w-[734px] flex flex-col items-start gap-[26px]">
                {/* 닉네임 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 닉네임 <RequiredIcon /> </FormLabel>
                    <StyledInput placeholder="한글, 영어, 숫자 포함 2-10자리 가능"
                        typingMessage="닉네임에 특수문자는 사용이 불가능합니다." />
                </div>

                {/* 이메일 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 이메일 </FormLabel>
                    {/* 이메일 받아오는 걸로 수정 */}
                    <StyledInput className="bg-black-40 pointer-events-none cursor-default" placeholder="waggle@gmail.com" readOnly />
                </div>

                {/* 직무 및 경력 */}
                <div className="flex items-start flex-col self-stretch gap-[8px] w-full">
                    <FormLabel> 직무 및 경력 <RequiredIcon /> </FormLabel>
                    <div className="flex items-center gap-[6px]">
                        <div className="flex w-[642px] items-center gap-[18px]">
                            <Dropdown
                                id="jobs"
                                items={formOptions.jobs}
                                title={jobs || "직무 선택"}
                                width="w-[312px]"
                                isOpen={openedDropdown === "jobs"}
                                onToggle={clickDropdown}
                                onChange={(value: string) => setJobs(value)}
                            />
                            <Dropdown
                                id="workExperience"
                                items={formOptions.workExperience}
                                title={workExperience || "경력 선택"}
                                width="w-[312px]"
                                isOpen={openedDropdown === "workExperience"}
                                onToggle={clickDropdown}
                                onChange={(value: string) => setWorkExperience(value)}
                            />
                        </div>
                        <div className="flex w-[40px] h-[40px] justify-center items-center gap-[10px]">
                            <PlusIcon />
                        </div>
                    </div>
                </div>

                {/* 관심 산업 분야 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel secondaryText={"최대 5개 선택 가능"}> 관심 산업 분야 <RequiredIcon /> </FormLabel>
                    <div className="flex flex-col items-start content-start self-stretch flex-wrap gap-y-[10px] gap-x-[5px] pb-[10px]">
                        {/* 수정할 수 있을 거 같은데 chunk 안 쓰고 wrap 쓰는 걸로 변경 그리고 한 개로 변경하자 */}
                        {industryChunks.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex gap-[5px]">
                                {row.map((item) => (
                                    <IndustrySelect
                                        key={item}
                                        isActive={selectedIndustries.includes(item)}
                                        onClick={() => toggleIndustry(item)}>
                                        {item}
                                    </IndustrySelect>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 사용 스킬 */}
                <div className="flex flex-col items-start gap-[8px] self-stretch">
                    <FormLabel> 사용 스킬 <RequiredIcon /> </FormLabel>
                    <SkillInput children={"Typescript"} />
                </div>

                {/* 선호 요일 및 시간 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 선호 요일 및 시간 </FormLabel>
                    <div className="flex gap-[16px] items-center self-stretch">
                        <div className="flex flex-[1_0_0%] items-center justify-between rounded-[8px]">
                            {formOptions.day.map((day) => (
                                <DaySelect 
                                    onClick={() => toggleDay(day)}
                                    isActive={selectedDays.includes(day)}>
                                    {day}
                                </DaySelect>
                            ))}
                        </div>
                        <div className="w-[358px]">
                            <Dropdown
                                id="preferredTime"
                                items={formOptions.preferredTime}
                                title={preferredTime || "선호 시간"}
                                isOpen={openedDropdown === "preferredTime"}
                                onToggle={clickDropdown}
                                onChange={(item) => {
                                    console.log("선택된 값:", item);
                                    setPreferredTime(item); // 실제 상태 변경
                                  }}
                            />
                        </div>
                    </div>
                </div>

                {/* 선호 진행방식 및 지역 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 선호 진행방식 및 지역 <RequiredIcon /> </FormLabel>
                    <div className="flex items-center gap-[18px] self-stretch">
                        <Dropdown
                            id="onOff"
                            items={formOptions.onOff}
                            title={onOff || "진행 방식"}
                            isOpen={openedDropdown === "onOff"}
                            onToggle={clickDropdown}
                            onChange={(value: string) => setOnOff(value)}
                        />
                        <Dropdown
                            id="region"
                            items={formOptions.region}
                            title={region || "지역 선택"}
                            isOpen={openedDropdown === "region"}
                            onToggle={clickDropdown}
                            onChange={(value: string) => setRegion(value)}
                        />
                    </div>
                </div>

                {/* 팀플 성향 + 유지보수 쉽게 리팩토링 해야함 */}
                <div className="flex flex-col flex-start self-stretch gap-[20px] w-full">
                    <FormLabel secondaryText={"최대 5개 선택 가능"}> 팀플 성향 <RequiredIcon /> </FormLabel>
                    <TeamPlayLabelBtn />
                </div>

                {/* 자기 소개 */}
                <div className="flex flex-col gap-[8px] w-full">
                    <FormLabel> 자기 소개 </FormLabel>
                    <SelfIntroduction />
                </div>

                {/* 링크 */}
                <div className="flex flex-col items-start self-stretch gap-[8px] w-full">
                    <FormLabel> 링크 </FormLabel>

                    {/* 아래 CSS 수정 필요. dropdown w-[333px] 이 안 먹음 임시방편으로 주소Input에 291px 먹임*/}
                    <div className="flex items-center gap-[6px]">
                        <div className="flex w-[642px] items-center gap-[18px]">
                            <div className="w-[291px]">
                                <StyledInput placeholder="주소"
                                    useRegex={false}
                                    useLengthValidation={false} />
                            </div>
                            <div className="flex w-[333px]">
                                <Dropdown
                                    id="site"
                                    items={formOptions.site}
                                    title={site || "사이트"}
                                    width="w-[333px]"
                                    isOpen={openedDropdown === "site"}
                                    onToggle={clickDropdown}
                                    onChange={(value: string) => setSite(value)}
                                />
                            </div>
                        </div>
                        <div className="flex w-[40px] h-[40px] justify-center items-center gap-[10px]">
                            <PlusIcon />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={handleSubmit} className="mt-[100px] flex h-[48px] py-[10px] px-[80px] text-subtitle-16_Sb600
            items-center justify-center gap-[10px] text-white bg-primary rounded-[8px]">
                저장
            </button>

        </div>
    );
};

export default Profile;