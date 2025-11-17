// Base URL 설정
export const BASE_URL = import.meta.env.VITE_BASE_URL;

// 인증 API
export const LOGOUT_URL = '/v2/auth/logout'; // 로그아웃
export const REISSUE_URL = '/v2/auth/tokens/reissue'; // 액세스 토큰 재발급

// 사용자 API
export const USER_SEARCH_URL = '/v1/users'; //사용자 검색
export const USER_URL = (userId: string) => `/v1/users/${userId}`; // 특정 사용자 조회
export const USER_ME_URL = '/v1/users/me'; // 현재 사용자 조회, 수정, 삭제
export const USER_PROFILE_IMAGE = '/v1/users/me/profile-image'; // 현재 사용자 이미지
export const USER_PROJECT = '/v1/users/me/projects'; // 현재 사용자의 프로젝트

// 팔로우 API
export const FOLLOW_URL = '/v1/follows'; // 팔로우, 언팔로우 토글
export const USER_FOLLOEES = '/v1/users/me/followees';
export const USER_FOLLOWERS = '/v1/users/me/followers';
export const USER_COUNT_FOLLOWERS = '/v1/users/${userId}/follow-count';

// 프로젝트 모집 게시글 API
export const PROJECTS_URL = '/v1/projects/post'; // 프로젝트 모집글 목록 조회, 생성
export const PROJECTS_DETAIL_URL = (projectId: number) =>
  `/v1/projects/post/${projectId}`; // 프로젝트 모집글 조회, 수정, 삭제

// 프로젝트 지원 API
export const PROJECTS_APPLY_URL = (projectId: number) =>
  `/v1/projects/${projectId}`; // 프로젝트 지원, 취소
export const PROJECTS_APPLICATION_URL = (projectId: number) =>
  `/v1/projects/${projectId}/applications`; // 프로젝트 지원자 조회
export const PROJECTS_CONFIRM_URL = (projectId: number) =>
  `/v1/projects/${projectId}/confirm`; // 프로젝트 지원 확정
export const PROJECTS_APPROVAL_URL = (projectId: number, userId: string) =>
  `/v1/projects/${projectId}/users/${userId}/approval`; // 프로젝트 모집글 참여자 승인
export const PROJECTS_REJECT_URL = (projectId: number, userId: string) =>
  `/v1/projects/${projectId}/users/${userId}/rejection`; // 프로젝트 모집글 참여자 거절
export const PROJECT_ME_URL = '/v1/projects/who/me'; //내가 지원한 프로젝트 조회

// 프로젝트 멤버 API
export const PROJECTS_MEMBER_URL = (projectId: number) =>
  `/v1/projects/member/${projectId}`; // 프로젝트 모집글 참여자 조회, 탈퇴
export const PROJECTS_MEMBER_DELEGATE_URL = (
  projectId: number,
  userId: string,
) => `/v1/projects/member/${projectId}/delegate/${userId}`; // 프로젝트 리더 위임
export const PROJECTS_MEMBER_REJECT_URL = (projectId: number, userId: string) =>
  `/v1/projects/member/${projectId}/reject/${userId}`; // 프로젝트 모집글 참여자 강제 퇴장
export const PROJECT_MEMBER_WHO_URL = (userId: string) =>
  `/v1/projects/member/who/${userId}`; // 특정 사용자가 참가한 프로젝트 모집글 조회
export const PROJECT_MEMBER_WHO_ME_URL = '/v1/projects/member/who/me'; // 내가 참가한 프로젝트의 모집글 조회

// 프로젝트 북마크 API
export const PROJECTS_BOOKMARK_URL = (projectId: number) =>
  `/v1/projects/bookmark/${projectId}`; // 프로젝트 모집글 북마크 추가/제거
export const PROJECTS_BOOKMARK_ME_URL = '/v1/projects/bookmark/who/me'; // 북마크한 프로젝트 모집글 조회

// 참조 데이터 API
export const DAYS_OF_WEEK_URL = '/days-of-week'; // 요일 조회
export const INDUSTRIES_URL = '/industries'; // 산업 분야 조회
export const INTRODUCTION_TYPES_URL = '/introduction-types'; // 자기소개서 키워드 대분류 조회
export const JOB_ROLES_URL = '/job-roles'; // 직무 조회
export const PORTFOLIO_TYPES_URL = '/portfolio-types'; // 포트폴리오 링크 종류 조회
export const SIDOS_URL = '/sidos'; // 시/도 조회
export const SKILLS_URL = '/skills'; // 사용 기술 조회
export const WORK_PERIODS_URL = '/work-periods'; // 진행 기간 조회
export const WORK_TIMES_URL = '/work-times'; // 진행 시간대 조회
export const WORK_WAYS_URL = '/work-ways'; // 진행 방식 조회

// 인앱 알림 API
export const NOTIFICATIONS_URL = '/v1/notifications'; // 알림 목록 조회
export const NOTIFICATIONS_READALL_URL = '/v1/notifications/read-all'; // 모든 알림 읽음 처리
export const NOTIFICATIONS_UNREAD_COUNT_URL = '/v1/notifications/unread-count'; // 읽지 않은 알림 개수 조회
