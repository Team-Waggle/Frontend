import { IndustryType } from '../../../constants/industry.type';
import { PositionType } from '../../../constants/position.type';
import { SkillType } from '../../../constants/skill.type';
import { WorkPeriodType } from '../../../constants/workPeriod.type';
import { WorkWayType } from '../../../constants/workWay.type';
import { UserMePayload } from '../../../user';

export interface ProjectPayload {
  id: number;
  title: string;
  industry: IndustryType;
  work_way: WorkWayType;
  recruitment_end_date: string;
  work_period: WorkPeriodType;
  recruitments: {
    position: PositionType;
    remaining_count: number;
    current_count: number;
  }[];
  skills: SkillType[];
  detail: string;
  contact_url: string;
  reference_url: string;
  bookmark_cnt: number;
  user: UserMePayload;
  bookmarked: boolean;
  created_at: string;
  updated_at: string;
}
