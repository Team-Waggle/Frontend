import FormLabel from '../FormLabel';
import Select from '../common/Select/BaseSelect';
import * as formOptions from '../../constants/formOptions';

import { PlusMinusButton } from '../common/Button/OtherIconButton';

interface Row {
  job: string;
  exp: string;
}

interface JobExperienceFieldProps {
  rows: Row[];
  addRow: () => void;
  removeRow: (index: number) => void;
  updateRow: (index: number, key: 'job' | 'exp', value: string) => void;
}

const JobExperienceField = ({
  rows,
  addRow,
  removeRow,
  updateRow,
}: JobExperienceFieldProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-[0.8rem] self-stretch">
      <FormLabel title="직무 및 경력" isRequired />
      <div className="flex flex-col items-start gap-[1.125rem] self-stretch">
        {rows.map((row, index) => (
          <div key={index} className="flex items-center gap-[0.6rem]">
            <div className="flex items-center gap-[1.8rem]">
              <Select
                items={formOptions.positions}
                title="직무 선택"
                width="w-[30.7rem]"
                value={row.job}
                onChange={(v) => updateRow(index, 'job', v)}
              />
              <Select
                items={formOptions.workExperience}
                title="경력 선택"
                width="w-[30.7rem]"
                value={row.exp}
                onChange={(v) => updateRow(index, 'exp', v)}
              />
            </div>

            <div className="flex h-[4rem] items-center justify-center gap-[0.4rem]">
              <PlusMinusButton type="plus" onClick={addRow} />

              {index !== 0 && (
                <PlusMinusButton
                  type="minus"
                  onClick={() => removeRow(index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobExperienceField;
