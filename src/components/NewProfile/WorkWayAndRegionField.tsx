import FormLabel from '../FormLabel';
import Select from '../common/Select/BaseSelect';
import * as formOptions from '../../constants/formOptions';

interface WorkWayAndRegionFieldProps {
  workWay: string;
  setWorkWay: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
}

const WorkWayAndRegionField = ({
  workWay,
  setWorkWay,
  region,
  setRegion,
}: WorkWayAndRegionFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-[0.8rem]">
      <FormLabel title="선호 진행방식 및 지역" />
      <div className="flex flex-col sm:flex-row items-center gap-[1.8rem] self-stretch">
        <Select
          items={formOptions.workWays}
          title="진행 방식"
          value={workWay}
          onChange={setWorkWay}
          width="w-[32rem] sm:w-[30.1rem] md:w-[35.8rem]"
        />
        <Select
          items={formOptions.sido}
          title="지역 선택"
          value={region}
          onChange={setRegion}
          width="w-[32rem] sm:w-[30.1rem] md:w-[35.8rem]"
        />
      </div>
    </div>
  );
};

export default WorkWayAndRegionField;
