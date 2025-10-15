// Api 연결을 아직 진행하지 않고, 테이블 값을 맞추기 위해 제작된 타입 정의입니다.
// 수정될 가능성이 용이하며, 자유로운 수정이 가능합니다.

// Likes
export interface BookmarkApiItem {
  id: string;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}

export interface FollowUser {
  userId: string;
  name: string;
  email: string;
  profileImageUrl?: string;
  position?: string;
  yearCount?: number;
}

// Applications
export interface AppliedApiItem {
  id: string;
  status: string;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}

export interface JoinProposalApiItem {
  id: string;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}

export interface JoinedApiItem {
  id: string;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}

// Posts
export interface PostManagementApiItem {
  id: string;
  status: string;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}

export interface PostApplicantApiItem {
  id: string;
  applicantsCount: number;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}

export interface PostMemberApiItem {
  id: string;
  status: string;
  deadline: string;
  industry: string;
  title: string;
  skills: string[];
}
