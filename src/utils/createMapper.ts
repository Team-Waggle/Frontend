import {
  industries,
  positions,
  skills,
  workPeriods,
  workWays,
  workExperience,
  day,
  workTime,
  sido,
  site,
} from '../constants/formOptions';
import { teamPlayOptionList } from '../constants/teamPlay';

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

export const getWorkExperience = createMapper(workExperience);

export const getDay = createMapper(day);

export const getWorkTime = createMapper(workTime);

export const getWorkWays = createMapper(workWays);

export const getSido = createMapper(sido);

export const getSite = createMapper(site);

export const getTeamPlayOptionList = createMapper(teamPlayOptionList);