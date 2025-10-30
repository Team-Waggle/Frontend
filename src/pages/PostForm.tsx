import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useBeforeUnload,
  useBlocker,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { isEqual } from 'lodash';
import BaseButton from '../components/common/Button/BaseButton';
import BaseIconTextArea from '../components/common/InputBox/IconTextArea/BaseIconTextArea';
import BaseSelect from '../components/common/Select/BaseSelect';
import BaseBasicTextArea from '../components/common/InputBox/BasicTextArea/BaseBasicTextArea';
import CalendarIconTextArea from '../components/common/InputBox/IconTextArea/CalendarIconTextArea';
import RemainingPositionField, {
  Recruitment,
} from '../components/PostForm/RemainingPositionField';
import CurrentPositionField, {
  CurrentBlock,
} from '../components/PostForm/CurrentPositionField';
import FormLabel from '../components/FormLabel';
import KeywordTextArea from '../components/common/InputBox/KeywordTextArea/KeywordTextArea';
import KeywordChip from '../components/common/Chip/KeywordChip/KeywordChip';
import SkillIcons from '../components/SkillIcons';
import BaseModal from '../components/Modal/BaseModal';
import {
  industries,
  workWays,
  workPeriods,
  skills,
} from '../constants/formOptions';
import {
  useProjectsPostDetailQuery,
  useProjectsPostQuery,
  useProjectsUpdateQuery,
} from '../hooks/useProjectPost';
import { useGetUserAllQuery } from '../hooks/useUser';
import { getSkill } from '../utils/createMapper';
import { skillIconMapper } from '../utils/skillIconMapper';
import LogoCharacterIcon from '../assets/character/bubble-character.svg?react';
import RequireIcon from '../assets/icons/ic_require.svg?react';
import CompleteIcon from '../assets/icons/ic_snackbar_complete.svg?react';
import ModalIcon from '../assets/character/modal/large/ch_modal_basic_triangle_yellow_large.svg?react';
import { useScrollToInvalidField } from '../hooks/useScrollToInvalidField';

interface TextAreaprops {
  subject: string;
  progress: string;
  requirements: string;
  extraTitle: string;
  extraContent: string;
}

interface FormData {
  title?: string;
  industry?: string;
  work_way?: string;
  recruitment_end_date?: string;
  work_period?: string;
  skills?: string[];
  recruitments?: {
    position: string;
    remaining_count: number;
    current_count: number;
  }[];
  idKeywords?: string[];
  detail?: string;
  contact_url?: string;
  reference_url?: string;
}

const PostForm = () => {
  const { projectId } = useParams();
  const { pathname } = useLocation();

  const isEdit = Boolean(projectId) && pathname.includes('/edit');

  const { data } = useProjectsPostDetailQuery(Number(projectId));
  const { mutate: postMutate } = useProjectsPostQuery();
  const { mutate: updateMutate } = useProjectsUpdateQuery(Number(projectId));
  const { data: usersAllData } = useGetUserAllQuery('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isValidated, setIsValidated] = useState(false);

  const [formTextArea, setFormTextArea] = useState<TextAreaprops>({
    subject: '',
    progress: '',
    requirements: '',
    extraTitle: '',
    extraContent: '',
  });

  const [formData, setFormData] = useState<FormData>({
    title: '',
    industry: '',
    work_way: '',
    recruitment_end_date: '',
    work_period: '',
    skills: [],
    recruitments: [],
    idKeywords: [],
    detail: '',
    contact_url: '',
    reference_url: '',
  });

  // 모집 / 현재 참여 인원
  const [remainingBlocks, setRemainingBlocks] = useState<Recruitment[]>([
    { id: Date.now(), position: '', remaining_count: 1, current_count: 0 },
  ]);
  const [currentBlocks, setCurrentBlocks] = useState<CurrentBlock[]>([
    { id: Date.now() + 1, position: '', count: 1 },
  ]);

  // 총 구성인원
  const totalPeople =
    remainingBlocks.reduce((sum, r) => sum + r.remaining_count, 0) +
    currentBlocks.reduce((sum, c) => sum + c.count, 0);

  const mergeRecruitments = () => {
    const map: Record<
      string,
      { position: string; remaining_count: number; current_count: number }
    > = {};
    remainingBlocks.forEach((r) => {
      if (!r.position) return;
      map[r.position] = {
        position: r.position,
        remaining_count: r.remaining_count,
        current_count: 0,
      };
    });
    currentBlocks.forEach((c) => {
      if (!c.position) return;
      if (map[c.position]) map[c.position].current_count = c.count;
      else
        map[c.position] = {
          position: c.position,
          remaining_count: 0,
          current_count: c.count,
        };
    });
    return Object.values(map);
  };

  const makeDetail = (inputs: TextAreaprops): string => {
    return `${inputs.subject}___SPLIT___${inputs.progress}___SPLIT___${inputs.requirements}___SPLIT___${inputs.extraTitle}___SPLIT___${inputs.extraContent}`;
  };

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

  // 1. 초기 상태 저장
  const initialState = useRef({
    formData,
    formTextArea,
    remainingBlocks,
    currentBlocks,
  });

  // 2. dirty 여부 확인
  const isDirty =
    !isEqual(initialState.current.formData, formData) ||
    !isEqual(initialState.current.formTextArea, formTextArea) ||
    !isEqual(initialState.current.remainingBlocks, remainingBlocks) ||
    !isEqual(initialState.current.currentBlocks, currentBlocks);

  const blocker = useBlocker(() => isDirty);

  useBeforeUnload(
    useCallback((e) => {
      e.preventDefault();
    }, []),
  );

  // 임시저장
  const handleTempSave = () => {
    setIsValidated(true);

    const isValid =
      formData.title?.trim() &&
      formData.industry?.trim() &&
      formData.work_way?.trim() &&
      formData.recruitment_end_date?.trim() &&
      formData.work_period?.trim() &&
      formData.skills &&
      formData.skills.length > 0 &&
      remainingBlocks.length > 0 &&
      currentBlocks.length > 0 &&
      formTextArea.subject.trim() &&
      formTextArea.progress.trim() &&
      formTextArea.requirements.trim() &&
      formData.contact_url?.trim();

    if (!isValid) {
      scrollToFirstInvalidField();
      return;
    }

    const tempPayload = {
      formData,
      formTextArea,
      remainingBlocks,
      currentBlocks,
    };
    localStorage.setItem('tempPostForm', JSON.stringify(tempPayload));
    toast.success('임시저장 되었습니다!', {
      icon: <CompleteIcon />,
      className: 'text-black-80 text-body-16_M500 text-caption-16_M500',
    });
  };

  // 등록
  const handleSubmit = () => {
    setIsValidated(true);

    const isValid =
      formData.title?.trim() &&
      formData.industry?.trim() &&
      formData.work_way?.trim() &&
      formData.recruitment_end_date?.trim() &&
      formData.work_period?.trim() &&
      formData.skills &&
      formData.skills.length > 0 &&
      remainingBlocks.length > 0 &&
      currentBlocks.length > 0 &&
      formTextArea.subject.trim() &&
      formTextArea.progress.trim() &&
      formTextArea.requirements.trim() &&
      formData.contact_url?.trim();

    if (!isValid) {
      scrollToFirstInvalidField();
      return;
    }

    const payload = {
      memberEmails: [''],
      title: formData.title ?? '',
      industry: formData.industry ?? '',
      work_way: formData.work_way ?? '',
      recruitment_end_date: formData.recruitment_end_date ?? '',
      work_period: formData.work_period ?? '',
      skills: formData.skills ?? [],
      recruitments: mergeRecruitments(),
      detail: makeDetail(formTextArea),
      contact_url: formData.contact_url ?? '',
      reference_url: formData.reference_url ?? '',
    };

    initialState.current = {
      formData,
      formTextArea,
      remainingBlocks,
      currentBlocks,
    };

    setTimeout(() => {
      if (isEdit) {
        updateMutate(payload);
      } else {
        postMutate(payload);
      }
    }, 0);
  };

  const refs = {
    title: useRef<HTMLDivElement>(null),
    industry: useRef<HTMLDivElement>(null),
    work_way: useRef<HTMLDivElement>(null),
    recruitment_end_date: useRef<HTMLDivElement>(null),
    work_period: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    remaining: useRef<HTMLDivElement>(null),
    current: useRef<HTMLDivElement>(null),
    subject: useRef<HTMLDivElement>(null),
    progress: useRef<HTMLDivElement>(null),
    requirements: useRef<HTMLDivElement>(null),
    contact_url: useRef<HTMLDivElement>(null),
  };

  const { scrollToFirstInvalidField } = useScrollToInvalidField(refs, {
    title: () => !!formData.title?.trim(),
    industry: () => !!formData.industry?.trim(),
    work_way: () => !!formData.work_way?.trim(),
    recruitment_end_date: () => !!formData.recruitment_end_date?.trim(),
    work_period: () => !!formData.work_period?.trim(),
    skills: () => Boolean(formData.skills && formData.skills.length > 0),
    remaining: () =>
      remainingBlocks.every((r) => r.position.trim() && r.remaining_count > 0),
    current: () => currentBlocks.every((c) => c.position.trim() && c.count > 0),
    subject: () => !!formTextArea.subject.trim(),
    progress: () => !!formTextArea.progress.trim(),
    requirements: () => !!formTextArea.requirements.trim(),
    contact_url: () => !!formData.contact_url?.trim(),
  });

  // Edit 모드일 경우 초기값 세팅
  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        title: data.title ?? '',
        industry: data.industry ?? '',
        work_way: data.work_way ?? '',
        recruitment_end_date: data.recruitment_end_date ?? '',
        work_period: data.work_period ?? '',
        skills: data.skills ?? [],
        // idKeywords: data.idKeywords ?? [],
        detail: data.detail ?? '',
        contact_url: data.contact_url ?? '',
        reference_url: data.reference_url ?? '',
      });

      setFormTextArea(parseDetail(data.detail ?? ''));

      // 기존 recruitments 데이터가 있으면 remaining / current 분리
      if (data.recruitments && data.recruitments.length > 0) {
        const remaining: Recruitment[] = data.recruitments.map((r) => ({
          id: Date.now() + Math.random(),
          position: r.position,
          remaining_count: r.remaining_count,
          current_count: r.current_count,
        }));
        const current: CurrentBlock[] = data.recruitments
          .filter((r) => r.current_count > 0)
          .map((r) => ({
            id: Date.now() + Math.random(),
            position: r.position,
            count: r.current_count,
          }));
        setRemainingBlocks(remaining);
        setCurrentBlocks(
          current.length > 0
            ? current
            : [{ id: Date.now() + 1, position: '', count: 1 }],
        );
      }
    }
  }, [data]);

  // Edit 모드가 아니고, 서버 데이터가 없을 때만 임시 저장 데이터를 불러옴
  useEffect(() => {
    if (isEdit) return;

    const tempData = localStorage.getItem('tempPostForm');
    if (!tempData) return;

    try {
      const parsed = JSON.parse(tempData);

      if (parsed.formData) setFormData(parsed.formData);
      if (parsed.formTextArea) setFormTextArea(parsed.formTextArea);
      if (parsed.remainingBlocks) setRemainingBlocks(parsed.remainingBlocks);
      if (parsed.currentBlocks) setCurrentBlocks(parsed.currentBlocks);
    } catch (error) {
      console.error('임시 저장 데이터 파싱 오류:', error);
    }
  }, [isEdit]);

  useEffect(() => {
    if (blocker.state === 'blocked' && !isModalOpen) {
      setIsModalOpen(true);
    }
  }, [blocker.state, isModalOpen]);

  return (
    <div className="flex flex-col items-center">
      <LogoCharacterIcon className="mt-[4.2rem]" />
      <div className="mb-[21.4rem] mt-[4.2rem] flex w-[32rem] flex-col items-center gap-[10rem] sm:w-[62rem] md:w-[73.4rem]">
        <div className="flex w-full flex-col gap-[14rem]">
          <div className="flex flex-col gap-[2.6rem]">
            <div className="flex flex-col gap-[2.6rem]">
              <div ref={refs.title} className="flex flex-col gap-[0.8rem]">
                <FormLabel
                  title="프로젝트 제목"
                  isRequired
                  requiredMessage={isValidated && !formData.title?.trim()}
                />
                <BaseIconTextArea
                  value={formData.title}
                  placeholder="내용을 입력하세요."
                  useRegex={false}
                  maxLength={100}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              {/* 산업 분야, 진행 방식 */}
              <div className="flex flex-col gap-[2.6rem]">
                <div className="flex w-full gap-[1.8rem]">
                  <div
                    ref={refs.industry}
                    className="flex flex-col gap-[0.8rem]"
                  >
                    <FormLabel
                      title="산업 분야"
                      isRequired
                      requiredMessage={
                        isValidated && !formData.industry?.trim()
                      }
                    />
                    <BaseSelect
                      items={industries}
                      title="산업분야"
                      width="w-[32rem] sm:w-[30.1rem] md:w-[35.8rem]"
                      value={formData.industry}
                      onChange={(id) =>
                        setFormData((prev) => ({ ...prev, industry: id }))
                      }
                    />
                  </div>
                  <div
                    ref={refs.work_way}
                    className="flex flex-col gap-[0.8rem]"
                  >
                    <FormLabel
                      title="진행 방식"
                      isRequired
                      requiredMessage={
                        isValidated && !formData.work_way?.trim()
                      }
                    />
                    <BaseSelect
                      items={workWays}
                      title="진행 방식"
                      width="w-[32rem] sm:w-[30.1rem] md:w-[35.8rem]"
                      value={formData.work_way}
                      onChange={(id) =>
                        setFormData((prev) => ({ ...prev, work_way: id }))
                      }
                    />
                  </div>
                </div>
                {/* 프로젝트 주제, 진행기간 */}
                <div className="flex w-full gap-[1.8rem]">
                  <div
                    ref={refs.recruitment_end_date}
                    className="flex flex-col gap-[0.8rem]"
                  >
                    <FormLabel
                      title="프로젝트 마감일"
                      isRequired
                      requiredMessage={
                        isValidated && !formData.recruitment_end_date?.trim()
                      }
                    />
                    <CalendarIconTextArea
                      value={formData.recruitment_end_date || ''}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          recruitment_end_date: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div
                    ref={refs.work_period}
                    className="flex flex-col gap-[0.8rem]"
                  >
                    <FormLabel
                      title="진행 기간"
                      isRequired
                      requiredMessage={
                        isValidated && !formData.work_period?.trim()
                      }
                    />
                    <BaseSelect
                      items={workPeriods}
                      title="진행 기간"
                      width="w-[32rem] sm:w-[30.1rem] md:w-[35.8rem]"
                      value={formData.work_period}
                      onChange={(id) =>
                        setFormData((prev) => ({ ...prev, work_period: id }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* 사용 스킬 이후 */}
            <div className="flex flex-col gap-[2.6rem]">
              <div className="flex flex-col gap-[3.8rem]">
                <div ref={refs.skills} className="flex flex-col gap-[0.8rem]">
                  <FormLabel
                    title="사용 스킬"
                    isRequired
                    requiredMessage={
                      isValidated &&
                      (!formData.skills || formData.skills.length === 0)
                    }
                  />
                  {/* 스킬 input 자리 */}
                  <KeywordTextArea
                    value={formData.skills || []}
                    onChange={(ids) =>
                      setFormData((prev) => ({ ...prev, skills: ids }))
                    }
                    items={skills}
                    placeholder="스킬을 입력하세요."
                    renderChip={(skill, onRemove) => {
                      const displayLabel = getSkill(skill.id) || skill.label;
                      const iconFileName = skillIconMapper[skill.id];
                      return (
                        <KeywordChip
                          key={skill.id}
                          shape="square"
                          label={displayLabel}
                          onRemove={onRemove}
                          icon={
                            iconFileName ? (
                              <SkillIcons
                                iconKeys={[iconFileName]}
                                size="small"
                              />
                            ) : null
                          }
                        />
                      );
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[2rem]">
                  <RemainingPositionField
                    ref={refs.remaining}
                    value={remainingBlocks}
                    onChange={setRemainingBlocks}
                    isValidated={isValidated}
                  />
                  <CurrentPositionField
                    ref={refs.current}
                    value={currentBlocks}
                    onChange={setCurrentBlocks}
                    isValidated={isValidated}
                  />
                </div>
              </div>
              {/* 이메일 */}
              <div className="flex flex-col gap-[0.8rem]">
                <FormLabel title="함께하는 동료 태그하기" />
                <KeywordTextArea
                  value={formData.idKeywords || []}
                  onChange={(ids) =>
                    setFormData((prev) => ({ ...prev, idKeywords: ids }))
                  }
                  // items 수정할 것
                  items={skills}
                  placeholder="@ 이메일을 입력해 주세요"
                  // renderChip 수정할 것
                  renderChip={(skill, onRemove) => {
                    const displayLabel = getSkill(skill.id) || skill.label;
                    const iconFileName = skillIconMapper[skill.id];
                    return (
                      <KeywordChip
                        key={skill.id}
                        shape="square"
                        label={displayLabel}
                        onRemove={onRemove}
                        icon={
                          iconFileName ? (
                            <SkillIcons
                              iconKeys={[iconFileName]}
                              size="small"
                            />
                          ) : null
                        }
                      />
                    );
                  }}
                />
              </div>

              {/* 총 구성인원 */}
              <div className="border-black70 border-t-2 border-solid pt-[1rem]">
                <div className="flex justify-end gap-[0.8rem] text-title-18_Sb600">
                  <span>총 구성인원</span>
                  <div>
                    <span className="text-primary">{totalPeople}</span>
                    <span>명</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 프로젝트 주제 */}
          <div className="flex flex-col gap-[7.6rem]">
            {/* TextArea */}
            <div className="flex flex-col gap-[4rem]">
              <div ref={refs.subject} className="flex flex-col gap-[0.8rem]">
                <div className="flex flex-col">
                  <div className="flex items-center gap-[0.2rem]">
                    <span className="text-title-20_Sb600">프로젝트 주제</span>
                    <div className="flex h-[1.8rem] items-center gap-[0.6rem]">
                      <RequireIcon />
                      {isValidated && !formTextArea.subject.trim() && (
                        <span className="text-caption-12_M500 text-error">
                          필수 입력입니다.
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-caption-13_M500">
                    프로젝트 주제에 대해 적어주세요.
                  </span>
                </div>
                <BaseBasicTextArea
                  value={formTextArea.subject || ''}
                  placeholder="안녕하세요 :) 이번 프로젝트에서는 우리 일상 속에서 당연하게 겪고 있던 불편함을 조금 더 나은 방향으로 바꿔보는 걸 목표로 하고 있습니다."
                  onChange={(value) =>
                    setFormTextArea((prev) => ({ ...prev, subject: value }))
                  }
                  size="lg"
                  showCount={false}
                />
              </div>
              <div ref={refs.progress} className="flex flex-col gap-[0.8rem]">
                <div className="flex flex-col">
                  <div className="flex items-center gap-[0.2rem]">
                    <span className="text-title-20_Sb600">진행 상황</span>
                    <div className="flex h-[1.8rem] items-center gap-[0.6rem]">
                      <RequireIcon />
                      {isValidated && !formTextArea.progress.trim() && (
                        <span className="text-caption-12_M500 text-error">
                          필수 입력입니다.
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-caption-13_M500">
                    진행 상황을 구체적으로 적할수록 지원 확률이 올라가요!
                  </span>
                </div>
                <BaseBasicTextArea
                  value={formTextArea.progress || ''}
                  placeholder="현재 기능 명세서까지 완료되었어요. 2개월 동안 디자인 및 개발 진행 예정이고 총 제작 기간 4개월로 보고 있어요!"
                  onChange={(value) =>
                    setFormTextArea((prev) => ({ ...prev, progress: value }))
                  }
                  size="lg"
                  showCount={false}
                />
              </div>
              <div
                ref={refs.requirements}
                className="flex flex-col gap-[0.8rem]"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-[0.2rem]">
                    <span className="text-title-20_Sb600">지원 자격</span>
                    <div className="flex h-[1.8rem] items-center gap-[0.6rem]">
                      <RequireIcon />
                      {isValidated && !formTextArea.requirements.trim() && (
                        <span className="text-caption-12_M500 text-error">
                          필수 입력입니다.
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-caption-13_M500">
                    지원 요건은 간결하게 작성하고, 작성자의 경력 및 이력을
                    간단히 소개하면 지원 확률이 높아져요!
                  </span>
                </div>
                <BaseBasicTextArea
                  value={formTextArea.requirements || ''}
                  placeholder="현재 저는 유통 회사에서 근무 중이며, 해당 분야에서 2년 경력을 쌓았어요. 협업 프로젝트는 처음입니다! 프로젝트 경험이 있으신 분을 우대하고 있어요!"
                  onChange={(value) =>
                    setFormTextArea((prev) => ({
                      ...prev,
                      requirements: value,
                    }))
                  }
                  size="lg"
                  showCount={false}
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex flex-col gap-[0.8rem]">
                  <div className="flex flex-col">
                    <div className="flex gap-[0.2rem]">
                      <span className="text-title-20_Sb600">
                        추가 내용 작성
                      </span>
                    </div>
                    <span className="text-caption-13_M500">
                      자유롭게 글을 적어주세요 .
                    </span>
                  </div>
                  <BaseIconTextArea
                    value={formTextArea.extraTitle}
                    placeholder="제목"
                    useRegex={false}
                    maxLength={100}
                    onChange={(e) =>
                      setFormTextArea((prev) => ({
                        ...prev,
                        extraTitle: e.target.value,
                      }))
                    }
                  />
                </div>
                <BaseBasicTextArea
                  value={formTextArea.extraContent || ''}
                  placeholder="내용을 입력하세요."
                  onChange={(value) =>
                    setFormTextArea((prev) => ({
                      ...prev,
                      extraContent: value,
                    }))
                  }
                  size="lg"
                  showCount={false}
                />
              </div>
            </div>
            {/* 연락 방법 & 참고 링크 */}
            <div className="flex flex-col gap-[2.6rem]">
              <div
                ref={refs.contact_url}
                className="flex flex-col gap-[0.8rem]"
              >
                <FormLabel
                  title="연락 방법"
                  isRequired
                  requiredMessage={isValidated && !formData.contact_url?.trim()}
                />
                <BaseIconTextArea
                  value={formData.contact_url || ''}
                  placeholder="오픈채팅, 구글폼, 이메일 등 하나를 입력하세요."
                  maxLength={300}
                  useRegex={false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact_url: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <FormLabel title="참고 링크" />
                <BaseIconTextArea
                  value={formData.reference_url || ''}
                  placeholder="깃허브, 배포 링크 등 참고 링크를 공유해 주세요."
                  maxLength={300}
                  useRegex={false}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      reference_url: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-[31.1rem] gap-[0.8rem] sm:w-[48.6rem]">
          <BaseButton
            onClick={handleTempSave}
            size="full"
            color="secondary"
            className="w-[14.3rem] whitespace-nowrap sm:w-[23.9rem]"
          >
            임시저장
          </BaseButton>
          <BaseButton
            onClick={handleSubmit}
            size="full"
            className="w-[16rem] whitespace-nowrap sm:w-[23.9rem]"
          >
            등록
          </BaseButton>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        closeButton={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
      {blocker.state === 'blocked' ? (
        <BaseModal
          size="large"
          CharacterComponent={ModalIcon}
          title="저장하지 않고 나가시겠습니까?"
          content="저장하지 않고 나가면 작성 중인 글이 사라져요."
          isOpen={isModalOpen}
          handleDone={() => blocker.proceed?.()}
          onClose={() => {
            setIsModalOpen(false);
            blocker.reset?.();
          }}
        />
      ) : null}
    </div>
  );
};

export default PostForm;
