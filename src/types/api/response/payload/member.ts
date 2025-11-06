import { DaysOfWeekType } from '../../../constants/daysOfWeek.type';
import { IndustryType } from '../../../constants/industry.type';
import { IntroductionType } from '../../../constants/introduction.type';
import { PortfoliosType } from '../../../constants/portfolioType.type';
import { PositionType } from '../../../constants/position.type';
import { SidoType } from '../../../constants/sido.type';
import { SkillType } from '../../../constants/skill.type';
import { WorkTimeType } from '../../../constants/workTime.type';
import { WorkWayType } from '../../../constants/workWay.type';

export interface MemberPayload {
  id: string;
  provider: string;
  provider_id: string;
  profile_img_url: string;
  name: string;
  email: string;
  position: PositionType;
  year_count: number;
  industries: IndustryType[];
  skills: SkillType[];
  days_of_week: DaysOfWeekType[];
  preferred_work_time: WorkTimeType;
  preferred_work_way: WorkWayType;
  preferred_sido: SidoType;
  introductions: IntroductionType;
  detail: string;
  portfolios: PortfoliosType[];
  created_at: string;
  updated_at: string;
}
