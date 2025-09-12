import {
  industries,
  positions,
  skills,
  workPeriods,
  workWays,
} from '../constants/formOptions';

interface IData {
  id: string;
  label: string;
}

const createMapper = <T extends IData>(dataArray: T[]) => {
  const dataMap = new Map<string, string>(
    dataArray.map((item) => [item.id, item.label]),
  );
  return (id: string): string | undefined => dataMap.get(id);
};

export const getIndustry = createMapper(industries);

export const getWaysOfWorking = createMapper(workWays);

export const getWorkPeriod = createMapper(workPeriods);

export const getPosition = createMapper(positions);

export const getSkill = createMapper(skills);
