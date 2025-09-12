import { UserMePayload } from './user';

export type ProjectIndustry =
  | 'FINANCE'
  | 'REAL_ESTATE'
  | 'INTERIOR'
  | 'MEDICAL_HEALTHCARE'
  | 'ECOMMERCE'
  | 'ENTERTAINMENT'
  | 'TRAVEL'
  | 'SOCIAL_NETWORK'
  | 'CULTURE_ART'
  | 'BEATUTY_FASHION'
  | 'RELIGION'
  | 'SALES_DISTRIBUTION'
  | 'EDUCATION'
  | 'CONSTRUCTION'
  | 'HEALTH'
  | 'PARENTING'
  | 'MEDIA_ADVERTISING';

export type ProjectWayofWorking = 'ONLINE' | 'OFFLINE' | 'ONLINE_OFFLINE';

export type ProjectWorkPeriod =
  | 'SHORT_TERM' // 1~3개월
  | 'MEDIUM_TERM' // 3~6개월
  | 'LONG_TERM' // 6개월 이상
  | 'UNDECIDED'; // 미정

export type ProjectPosition =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DESIGNER'
  | 'IOS'
  | 'ANDROID'
  | 'DEVOPS'
  | 'PLANNER'
  | 'MARKETER';

export type ProjectSkill =
  | 'JAVA'
  | 'JAVASCRIPT'
  | 'TYPESCRIPT'
  | 'NODE_JS'
  | 'NEXT_JS'
  | 'NEST_JS'
  | 'SVELTE'
  | 'VUE'
  | 'REACT'
  | 'SPRING'
  | 'GO'
  | 'KOTLIN'
  | 'EXPRESS'
  | 'MYSQL'
  | 'MONGODB'
  | 'PYTHON'
  | 'DJANGO'
  | 'PHP'
  | 'GRAPHQL'
  | 'FIREBASE'
  | 'FLUTTER'
  | 'SWIFT'
  | 'REACT_NATIVE'
  | 'UNITY'
  | 'AWS'
  | 'KUBERNATES'
  | 'DOCKER'
  | 'GIT'
  | 'FIGMA'
  | 'XD'
  | 'ZEPLIN'
  | 'JEST'
  | 'MS_OFFICE'
  | 'ILLUSTRATOR'
  | 'PHOTOSHOP'
  | 'INDESIGN'
  | 'PREMIERE_PRO'
  | 'AFTER_EFFECTS'
  | 'MAX_3D'
  | 'BLENDER'
  | 'CINEMA_4D';

export interface ProjectPayload {
  id: number;
  title: string;
  industry: ProjectIndustry;
  ways_of_working: ProjectWayofWorking;
  recruitment_end_date: string;
  work_period: ProjectWorkPeriod;
  recruitments: {
    position: ProjectPosition;
    remaining_count: number;
    current_count: number;
  }[];
  skills: ProjectSkill[];
  detail: string;
  connect_url: string;
  reference_url: string;
  bookmark_cnt: number;
  user: UserMePayload;
  bookmarked: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectResponse {
  code: number;
  message: string;
  payload: ProjectPayload;
  timestamp: string;
  success: boolean;
}
