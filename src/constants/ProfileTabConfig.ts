export type ColumnVariant = "default" | "fixed" | "title" | "skill" | "icon1" | "icon2" | "icon3";

export interface TabColumn {
  label: string;
  variant: ColumnVariant;
  dataKey?: string; // API에서 가져올 key + 수정 가능성 용이
}

export interface TabItem {
  label: string;
  key: string;
  columns: TabColumn[];
}

export interface PageTabs {
  [page: string]: TabItem[];
}

export const profileTabs: PageTabs = {
  ProfileLikes: [
    {
      label: "북마크",
      key: "bookmark",
      columns: [
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
        { label: "아이콘1", variant: "icon1" },
      ],
    },
    {
      label: "팔로잉",
      key: "following",
      columns: [{ label: "태그", variant: "title", dataKey: "name" }],
    },
    {
      label: "팔로워",
      key: "follower",
      columns: [{ label: "태그", variant: "title", dataKey: "name" }],
    },
  ],

  ProfileApplications: [
    {
      label: "지원 완료",
      key: "applied",
      columns: [
        { label: "진행 상태", variant: "fixed", dataKey: "status" },
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
        { label: "아이콘", variant: "icon1" },
      ],
    },
    {
      label: "합류 제안",
      key: "joinProposal",
      columns: [
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
      ],
    },
    {
      label: "합류 완료",
      key: "joined",
      columns: [
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
        { label: "아이콘", variant: "icon1" },
      ],
    },
  ],

  ProfilePosts: [
    {
      label: "모집글 관리",
      key: "postManagement",
      columns: [
        { label: "진행 상태", variant: "fixed", dataKey: "status" },
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
        { label: "아이콘2", variant: "icon2" },
      ],
    },
    {
      label: "지원자 관리",
      key: "applicantManagement",
      columns: [
        { label: "지원자 수", variant: "fixed", dataKey: "applicantsCount" },
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
        { label: "아이콘", variant: "icon1" },
      ],
    },
    {
      label: "팀원 관리",
      key: "memberManagement",
      columns: [
        { label: "진행 상태", variant: "fixed", dataKey: "status" },
        { label: "마감일", variant: "default", dataKey: "deadline" },
        { label: "산업 분야", variant: "fixed", dataKey: "industry" },
        { label: "제목", variant: "title", dataKey: "title" },
        { label: "사용 스킬", variant: "skill", dataKey: "skills" },
        { label: "아이콘", variant: "icon1" },
      ],
    },
  ],
};
