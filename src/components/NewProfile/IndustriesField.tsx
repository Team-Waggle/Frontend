import FormLabel from "../FormLabel";
import BasicChipCircle from "../common/InputBox/BasicChipCircle/BaseBasicChipCircle";
import * as formOptions from '../../constants/formOptions';

interface IndustriesFieldProps {
  selectedIndustries: string[];
  toggleIndustry: (industry: string) => void;
  industryRequiredMessage: boolean;
}

const chunk = <T,>(arr: T[], size: number): T[][] =>
  arr.reduce<T[][]>((acc, _, i) => {
    if (i % size === 0) acc.push(arr.slice(i, i + size));
    return acc;
  }, []);

const industryChunks = chunk(formOptions.industries, 9);

const IndustriesField = ({ selectedIndustries, toggleIndustry, industryRequiredMessage }: IndustriesFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-[0.8rem]">
      <FormLabel
        title="관심 산업 분야"
        caption="최대 5개 선택 가능"
        isRequired
        requiredMessage={industryRequiredMessage}
      />
      <div className="flex flex-col pb-[1rem]">
        <div className="flex-wrap gap-[0.5rem] justify-start w-full sm:flex hidden">
          {formOptions.industries.map((industry) => (
            <BasicChipCircle
              key={industry.id}
              isActive={selectedIndustries.includes(industry.id)}
              onClick={() => toggleIndustry(industry.id)}
            >
              {industry.label}
            </BasicChipCircle>
          ))}
        </div>

        <div className="flex flex-wrap gap-y-[1rem] gap-x-[0.5rem] justify-start w-full sm:hidden">
          {industryChunks.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap gap-y-[1rem] gap-x-[0.5rem] w-full md:w-auto">
              {row.map((industry) => (
                <BasicChipCircle
                  key={industry.id}
                  isActive={selectedIndustries.includes(industry.id)}
                  onClick={() => toggleIndustry(industry.id)}
                >
                  {industry.label}
                </BasicChipCircle>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndustriesField;