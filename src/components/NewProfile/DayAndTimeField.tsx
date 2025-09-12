import FormLabel from "../FormLabel";
import BasicChipSquare from "../common/InputBox/BasicChipSquare/BaseBasicChipSquare";
import Select from "../common/Select/BaseSelect";
import * as formOptions from "../../constants/formOptions"

interface DayAndTimeFieldProps {
  selectedDays: string[];
  toggleDay: (day: string) => void;
  preferredTime: string;
  setPreferredTime: (time: string) => void;
}

const DayAndTimeField = ({ selectedDays, toggleDay, preferredTime, setPreferredTime }: DayAndTimeFieldProps) => {

    return(
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel title="선호 요일 및 시간" />
          <div className="flex items-center gap-[1.6rem] self-stretch">
            <div className="flex flex-1 items-center justify-between rounded-[0.8rem]">
              {formOptions.day.map((day) => (
                <BasicChipSquare
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  isActive={selectedDays.includes(day.id)}
                >
                  {day.label}
                </BasicChipSquare>
              ))}
            </div>
            <div className="w-[35.8rem]">
              <Select
                items={formOptions.workTime}
                title="선호 시간"
                value={preferredTime}
                onChange={setPreferredTime}
              />
            </div>
          </div>
        </div>
    );
};

export default DayAndTimeField;