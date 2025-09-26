import { useEffect, useState } from 'react';
import LogoCharacterIcon from '../assets/character/bubble-character.svg?react';
import RequireIcon from '../assets/icons/ic_require.svg?react';
import BaseButton from '../components/common/Button/BaseButton';
import BaseIconTextArea from '../components/common/InputBox/IconTextArea/BaseIconTextArea';
import BaseSelect from '../components/common/Select/BaseSelect';
import {
  industries,
  workWays,
  workPeriods,
  skills,
} from '../constants/formOptions';
import {
  useProjectsPostDetailQuery,
  useProjectsPostQuery,
} from '../hooks/useProjectPost';
import FormLabel from '../components/FormLabel';
import KeywordTextArea from '../components/common/InputBox/KeywordTextArea/KeywordTextArea';
import { getSkill } from '../utils/createMapper';
import { skillIconMapper } from '../utils/skillIconMapper';
import KeywordChip from '../components/common/Chip/KeywordChip/KeywordChip';
import SkillIcons from '../components/SkillIcons';
import BaseBasicTextArea from '../components/common/InputBox/BasicTextArea/BaseBasicTextArea';
import CalendarIconTextArea from '../components/common/InputBox/IconTextArea/CalendarIconTextArea';
import RemainingPositionField, {
  Recruitment,
} from '../components/PostForm/RemainingPositionField';
import CurrentPositionField, {
  CurrentBlock,
} from '../components/PostForm/CurrentPositionField';
import { useLocation, useParams } from 'react-router-dom';

interface TextAreaprops {
  subject: string;
  progress: string;
  requirements: string;
  extra: string;
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
  const { mutate } = useProjectsPostQuery();

  const [formTextArea, setFormTextArea] = useState<TextAreaprops>({
    subject: '',
    progress: '',
    requirements: '',
    extra: '',
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

  const makeDetail = (inputs: TextAreaprops): FormData => {
    return {
      detail: `프로젝트 주제: ${inputs.subject}\n\n진행 상황: ${inputs.progress}\n\n지원 자격: ${inputs.requirements}\n\n추가 내용: ${inputs.extra}`,
    };
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
      recruitments: mergeRecruitments(),
      detail: makeDetail(formTextArea),
    };
    console.log('submit payload ->', payload);
    // mutate(payload);
  };

  // Edit 모드일 경우 초기값 세팅
  useEffect(() => {
    if (isEdit && data) {
      setFormData({
        title: data.title ?? '',
        industry: data.industry ?? '',
        work_way: data.ways_of_working ?? '',
        recruitment_end_date: data.recruitment_end_date ?? '',
        work_period: data.work_period ?? '',
        skills: data.skills ?? [],
        // idKeywords: data.idKeywords ?? [],
        detail: data.detail ?? '',
        // contact_url: data.contact_url ?? '',
        reference_url: data.reference_url ?? '',
      });
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

  return (
    <div className="flex flex-col items-center">
      <LogoCharacterIcon className="mt-[4.2rem]" />
      <div className="mb-[21.4rem] mt-[4.2rem] flex w-[73.4rem] flex-col items-center gap-[10rem]">
        <div className="flex w-full flex-col gap-[14rem]">
          <div className="flex flex-col gap-[2.6rem]">
            <div className="flex flex-col gap-[2.6rem]">
              <div className="flex flex-col gap-[0.8rem]">
                <FormLabel title="프로젝트 제목" isRequired requiredMessage />
                <BaseIconTextArea
                  value={formData.title}
                  placeholder="내용을 입력하세요."
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>
              {/* 산업 분야, 진행 방식 */}
              <div className="flex flex-col gap-[2.6rem]">
                <div className="flex w-full gap-[1.8rem]">
                  <div className="flex flex-col gap-[0.8rem]">
                    <FormLabel title="산업 분야" isRequired />
                    <BaseSelect
                      items={industries}
                      title="산업분야"
                      width="w-[35.8rem]"
                      value={formData.industry}
                      onChange={(id) =>
                        setFormData((prev) => ({ ...prev, industry: id }))
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-[0.8rem]">
                    <FormLabel title="진행 방식" isRequired />
                    <BaseSelect
                      items={workWays}
                      title="진행 방식"
                      width="w-[35.8rem]"
                      value={formData.work_way}
                      onChange={(id) =>
                        setFormData((prev) => ({ ...prev, work_way: id }))
                      }
                    />
                  </div>
                </div>
                {/* 프로젝트 주제, 진행기간 */}
                <div className="flex w-full gap-[1.8rem]">
                  <div className="flex flex-col gap-[0.8rem]">
                    <FormLabel title="프로젝트 마감일" isRequired />
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
                  <div className="flex flex-col gap-[0.8rem]">
                    <FormLabel title="진행 기간" isRequired />
                    <BaseSelect
                      items={workPeriods}
                      title="진행 기간"
                      width="w-[35.8rem]"
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
                <div className="flex flex-col gap-[0.8rem]">
                  <FormLabel title="사용 스킬" isRequired requiredMessage />
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
                    value={remainingBlocks}
                    onChange={setRemainingBlocks}
                  />
                  <CurrentPositionField
                    value={currentBlocks}
                    onChange={setCurrentBlocks}
                  />
                </div>
              </div>
              {/* 아이디 */}
              <KeywordTextArea
                value={formData.idKeywords || []}
                onChange={(ids) =>
                  setFormData((prev) => ({ ...prev, idKeywords: ids }))
                }
                // items 수정할 것
                items={skills}
                placeholder="@ 아이디 최대 6글자"
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
                          <SkillIcons iconKeys={[iconFileName]} size="small" />
                        ) : null
                      }
                    />
                  );
                }}
              />
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
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex flex-col">
                  <div className="flex gap-[0.2rem]">
                    <span className="text-title-20_Sb600">프로젝트 주제</span>
                    <RequireIcon />
                  </div>
                  <span className="text-caption-13_M500">
                    프로젝트 주제에 대해 적어주세요.
                  </span>
                </div>
                <BaseBasicTextArea
                  value={formTextArea.subject || ''}
                  onChange={(value) =>
                    setFormTextArea((prev) => ({ ...prev, subject: value }))
                  }
                  size="lg"
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex flex-col">
                  <div className="flex gap-[0.2rem]">
                    <span className="text-title-20_Sb600">진행 상황</span>
                    <RequireIcon />
                  </div>
                  <span className="text-caption-13_M500">
                    진행 상황을 구체적으로 적할수록 지원 확률이 올라가요!
                  </span>
                </div>
                <BaseBasicTextArea
                  value={formTextArea.progress || ''}
                  onChange={(value) =>
                    setFormTextArea((prev) => ({ ...prev, progress: value }))
                  }
                  size="lg"
                />
              </div>
              <div className="flex flex-col gap-[0.8rem]">
                <div className="flex flex-col">
                  <div className="flex gap-[0.2rem]">
                    <span className="text-title-20_Sb600">지원 자격</span>
                    <RequireIcon />
                  </div>
                  <span className="text-caption-13_M500">
                    지원 요건은 간결하게 작성하고, 작성자의 경력 및 이력을
                    간단히 소개하면 지원 확률이 높아져요!
                  </span>
                </div>
                <BaseBasicTextArea
                  value={formTextArea.requirements || ''}
                  onChange={(value) =>
                    setFormTextArea((prev) => ({
                      ...prev,
                      requirements: value,
                    }))
                  }
                  size="lg"
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
                  <BaseIconTextArea placeholder="제목" />
                </div>
                <BaseBasicTextArea
                  value={formTextArea.extra || ''}
                  onChange={(value) =>
                    setFormTextArea((prev) => ({ ...prev, extra: value }))
                  }
                  size="lg"
                />
              </div>
            </div>
            {/* 연락 방법 & 참고 링크 */}
            <div className="flex flex-col gap-[2.6rem]">
              <div className="flex flex-col gap-[0.8rem]">
                <FormLabel title="연락 방법" isRequired requiredMessage />
                <BaseIconTextArea
                  value={formData.contact_url || ''}
                  placeholder="오픈채팅, 구글폼, 이메일 등 하나를 입력하세요."
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
        <div className="flex gap-[0.8rem]">
          <BaseButton size="full" color="secondary" className="w-[23.9rem]">
            임시저장
          </BaseButton>
          <BaseButton
            onClick={handleSubmit}
            size="full"
            className="w-[23.9rem]"
          >
            등록
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
