import type { ColumnDef, CellCtx } from '../types/table';
import { IconActions } from '../components/common/Table/cells/IconActions';
import SkillIcons from '../components/SkillIcons';

import EditIc from '../assets/icons/profile/ic_edit.svg?react';
import TrashIc from '../assets/icons/profile/ic_trashcan.svg?react';
import BaseTag from '../components/common/Tag/BaseTag';

export type PostRow = {
  id: string;
  status?: string;
  deadline?: string;
  industry?: string | string[];
  title?: string;
  skills?: string[];
  applicantsCount?: number;
};

// 모집글 관리
export const postManagementColumns: ColumnDef<PostRow>[] = [
  {
    key: 'status',
    header: '진행 상태',
    variant: 'fixed',
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <BaseTag size="sm" type="filled" color="basic" shape="circle" hasLeftIcon>
        {String(value ?? '')}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <span>{String(value ?? '')}</span>
    ),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<PostRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <span className="block truncate">{row.title}</span>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => r.skills ?? [],
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '아이콘',
    variant: 'icon2',
    accessor: (r) => r,
    cell: (ctx: CellCtx<PostRow, any>) => <IconActions {...ctx} />,
    meta: {
      size: 28,
      round: true,
      actions: [
        { key: 'edit', icon: EditIc, ariaLabel: 'edit', title: '수정' },
        { key: 'delete', icon: TrashIc, ariaLabel: 'delete', title: '삭제' },
      ],
    },
  },
];

// 지원자 관리
export const applicantManagementColumns: ColumnDef<PostRow>[] = [
  {
    key: 'applicantsCount',
    header: '지원자 수',
    variant: 'fixed',
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <BaseTag size="sm" type="filled" color="basic" shape="circle" hasLeftIcon>
        {String(value ?? '')}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <span>{String(value ?? '')}</span>
    ),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<PostRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <span className="block truncate">{row.title}</span>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => r.skills ?? [],
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '아이콘',
    variant: 'icon1',
    accessor: (r) => r,
    cell: (ctx: CellCtx<PostRow, any>) => <IconActions {...ctx} />,
    meta: {
      preset: ['arrow'],
      round: true,
    },
  },
];

// 팀원 관리
export const memberManagementColumns: ColumnDef<PostRow>[] = [
  {
    key: 'status',
    header: '진행 상태',
    variant: 'fixed',
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <BaseTag size="sm" type="filled" color="basic" shape="circle" hasLeftIcon>
        {String(value ?? '')}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <span>{String(value ?? '')}</span>
    ),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<PostRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <span className="block truncate">{row.title}</span>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => r.skills ?? [],
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '아이콘',
    variant: 'icon1',
    accessor: (r) => r,
    cell: (ctx: CellCtx<PostRow, any>) => <IconActions {...ctx} />,
    meta: {
      preset: ['arrow'],
      round: true,
    },
  },
];

export const profilePostTabs = [
  {
    label: '모집글 관리',
    key: 'postManagement',
    columns: postManagementColumns,
  },
  {
    label: '지원자 관리',
    key: 'applicantManagement',
    columns: applicantManagementColumns,
  },
  {
    label: '팀원 관리',
    key: 'memberManagement',
    columns: memberManagementColumns,
  },
] as const;
