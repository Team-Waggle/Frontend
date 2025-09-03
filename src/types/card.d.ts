export type CardIndustry =
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
  | 'MEDAI_ADVERTISING';

export type CardWayofWorking = 'ONLINE' | 'OFFLINE' | 'ONLINE_OFFLINE';

export type CardWorkPeriod =
  | 'SHORT_TERM' // 1~3개월
  | 'MEDIUM_TERM' // 3~6개월
  | 'LONG_TERM' // 6개월 이상
  | 'UNDECIDED'; // 미정

export type CardPosition =
  | 'FRONTEND'
  | 'BACKEND'
  | 'DESIGNER'
  | 'IOS'
  | 'ANDROID'
  | 'DEVOPS'
  | 'PLANNER'
  | 'MARKETER';

export type CardSkill =
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

export interface CardData {
  id: number;
  bookmarked: boolean;
  title: string;
  industry: CardIndustry;
  ways_of_working: CardWayofWorking;
  recruitment_end_date: string;
  work_period: CardWorkPeriod;
  recruitments: {
    position: CardPosition;
    remaining_count: number;
    current_count: number;
  }[];
  skills: CardSkill[];
  detail: string;
  connect_url: string;
  reference_url: string;
  created_at: string;
}
