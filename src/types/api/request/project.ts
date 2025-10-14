import { IndustryType } from '../../constants/industry.type';
import { PositionType } from '../../constants/position.type';
import { SkillType } from '../../constants/skill.type';
import { WorkWayType } from '../../constants/workWay.type';

export interface ProjectBody {
  memberEmails: string[];
  title: string;
  industry: IndustryType | string;
  work_way: WorkWayType | string;
  recruitment_end_date?: string;
  work_period: string;
  recruitments?: {
    position: PositionType | string;
    remaining_count: number;
    current_count: number;
  }[];
  skills?: SkillType[] | string[];
  detail?: string;
  contact_url?: string;
  reference_url?: string;
}
