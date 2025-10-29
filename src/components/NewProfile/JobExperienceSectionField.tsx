import FormLabel from '../FormLabel';
import Select from '../common/Select/BaseSelect';
import * as formOptions from '../../constants/formOptions';

interface JobExperienceFieldProps {
  position: string;
  onChangePosition: (v: string) => void;
  yearCount: string;
  onChangeYearCount: (v: string) => void;
}

const JobExperienceField = ({
  position,
  onChangePosition,
  yearCount,
  onChangeYearCount,
}: JobExperienceFieldProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
      <FormLabel title="직무 및 경력" isRequired />
      <div className="flex items-center gap-[1.8rem]">
        <Select
          items={formOptions.positions}
          title="직무 선택"
          value={position}
          onChange={onChangePosition}
        />
        <Select
          items={formOptions.workExperience}
          title="경력 선택"
          value={yearCount}
          onChange={onChangeYearCount}
        />
      </div>
    </div>
  );
};

export default JobExperienceField;
