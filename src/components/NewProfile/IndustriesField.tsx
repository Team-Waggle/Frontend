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
    return(
        <div className="flex w-full flex-col gap-[0.8rem]">
          <FormLabel
            title="관심 산업 분야"
            caption="최대 5개 선택 가능"
            isRequired
            requiredMessage={industryRequiredMessage}
          />
          <div className="flex flex-col flex-wrap content-start items-start gap-x-[0.5rem] gap-y-[1rem] self-stretch pb-[1rem]">
            {industryChunks.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-[0.5rem]">
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
    );
};

export default IndustriesField;