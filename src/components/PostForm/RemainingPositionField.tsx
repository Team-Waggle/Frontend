import BaseSelect from '../common/Select/BaseSelect';
import FormLabel from '../FormLabel';
import MinusStepper from '../../assets/button/btn_stepper_minus.svg?react';
import PlusStepper from '../../assets/button/btn_stepper_plus.svg?react';
import BaseButton from '../common/Button/BaseButton';
import { positions } from '../../constants/formOptions';

export interface Recruitment {
  id: number;
  position: string;
  remaining_count: number;
  current_count: number;
}

interface Props {
  value: Recruitment[];
  onChange: (recruitments: Recruitment[]) => void;
}

const RemainingPositionField = ({ value, onChange }: Props) => {
  const handleAddBlock = () => {
    const newBlock: Recruitment = {
      id: Date.now(),
      position: '',
      remaining_count: 1,
      current_count: 0,
    };
    onChange([...value, newBlock]);
  };

  const handleRemoveBlock = (id: number) => {
    onChange(value.filter((b) => b.id !== id));
  };

  const handlePositionChange = (id: number, position: string) => {
    onChange(value.map((b) => (b.id === id ? { ...b, position } : b)));
  };

  const handleCountChange = (id: number, delta: number) => {
    onChange(
      value.map((b) =>
        b.id === id
          ? { ...b, remaining_count: Math.max(1, b.remaining_count + delta) }
          : b,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-[2.4rem]">
      {value.map((block, index) => (
        <div key={block.id} className="flex gap-[5rem]">
          <div className="flex flex-col gap-[0.8rem]">
            {index === 0 && <FormLabel title="모집 인원" isRequired />}
            <BaseSelect
              items={positions}
              title="직무 선택"
              width="w-[32rem] sm:w-[30.1rem] md:w-[35.8rem]"
              value={block.position}
              onChange={(id) => handlePositionChange(block.id, id)}
            />
          </div>

          <div className="flex items-end gap-[5rem]">
            <div className="flex h-[4.6rem] items-center gap-[0.5rem] py-[0.8rem]">
              <button
                type="button"
                className="flex h-[4rem] w-[4rem] items-center justify-center"
                onClick={() => handleCountChange(block.id, -1)}
              >
                <MinusStepper />
              </button>
              <span className="flex h-[4rem] w-[4rem] items-center justify-center px-[0.8rem] text-title-20_Sb600 text-primary">
                {block.remaining_count}
              </span>
              <button
                type="button"
                className="flex h-[4rem] w-[4rem] items-center justify-center"
                onClick={() => handleCountChange(block.id, 1)}
              >
                <PlusStepper />
              </button>
            </div>

            <div className="flex h-[4.6rem] items-center gap-[0.8rem]">
              {index === value.length - 1 && (
                <BaseButton className="w-[6.9rem]" onClick={handleAddBlock}>
                  추가
                </BaseButton>
              )}
              {value.length > 1 && (
                <BaseButton
                  className="w-[6.9rem]"
                  color="line"
                  onClick={() => handleRemoveBlock(block.id)}
                >
                  삭제
                </BaseButton>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RemainingPositionField;
