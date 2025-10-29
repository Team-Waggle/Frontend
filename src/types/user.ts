// /v1/users/me (PUT)
// 직무/경력

// 포트폴리오
export interface PortfolioUrl {
  portfolio_type: string;
  url: string;
}

// MBTI 및 스타일
export interface Introduction {
  communication_styles: string[];
  collaboration_styles: string[];
  work_styles: string[];
  problem_solving_approaches: string[];
  mbti: string;
}

// User 정보
export interface UserMePayload {
  id: string;
  name: string;
  email: string;
  profile_img_url: string;
  detail: string;
  skills: string[];
  position: string;
  year_count: number;
  days_of_week: string[];
  introductions: Introduction;
  portfolios: PortfolioUrl[];
  industries: string[];
  preferred_work_time: string;
  preferred_sido: string;
  preferred_work_way: string;
  created_at: string;
  updated_at: string;
}

// API Response
export interface UserMeResponse {
  code: number;
  message: string;
  payload: UserMePayload;
  timestamp: string;
  success: boolean;
}

// 유저 업데이트 DTO
export type UpdateUserDto = Partial<
  Omit<UserMePayload, 'id' | 'created_at' | 'updated_at'>
> & {
  preferred_days_of_week?: string[];
  introduction?: Introduction;
};