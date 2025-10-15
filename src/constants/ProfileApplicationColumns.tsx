import type { ColumnDef, CellCtx } from '../types/table';
import BaseTag from '../components/common/Tag/BaseTag';
import SkillIcons from '../components/SkillIcons';
import { IconActions } from '../components/common/Table/cells/IconActions';

import EmailIc from '../assets/icons/profile/ic_email.svg?react';
import LinkIc from '../assets/icons/profile/ic_link.svg?react';
import TrashIc from '../assets/icons/profile/ic_trashcan.svg?react';

export type AppliedRow = {
  id: string;
  status?: string;
  deadline?: string;
  industry?: string | string[];
  title?: string;
  skills?: string[];
};
export type JoinProposalRow = Omit<AppliedRow, 'status'>;
export type JoinedRow = Omit<AppliedRow, 'status'>;

// 지원 완료
export const appliedColumns: ColumnDef<AppliedRow>[] = [
  {
    key: 'status',
    header: '진행 상태',
    variant: 'fixed',
    cell: ({ value }: CellCtx<AppliedRow, any>) => (
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
    cell: ({ value }: CellCtx<AppliedRow, any>) => (
      <span>{String(value ?? '')}</span>
    ),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<AppliedRow, any>) => (
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
    cell: ({ value }: CellCtx<JoinedRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '',
    headerVariant: 'icon3',
    cellVariant: 'icon3',
    accessor: (r) => r,
    cell: (ctx: CellCtx<JoinedRow, any>) => <IconActions {...ctx} />,
    meta: {
      size: 28,
      round: true,
      actions: [
        { key: 'email', icon: EmailIc, ariaLabel: 'email', title: '이메일' },
        { key: 'link', icon: LinkIc, ariaLabel: 'link', title: '링크' },
        { key: 'delete', icon: TrashIc, ariaLabel: 'delete', title: '삭제' },
      ],
    },
  },
];

// 합류 제안
export const joinProposalColumns: ColumnDef<JoinProposalRow>[] = [
  { key: 'deadline', header: '마감일', variant: 'default' },
  { key: 'industry', header: '산업 분야', variant: 'fixed' },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<JoinProposalRow, any>) => (
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
    cell: ({ value }: CellCtx<JoinedRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '참여',
    headerVariant: 'icon1',
    cellVariant: 'icon',
    accessor: (r) => r,
    cell: (ctx: CellCtx<JoinedRow, any>) => <IconActions {...ctx} />,
    meta: {
      preset: ['check'],
      round: true,
    },
  },
];

// 합류 완료
export const joinedColumns: ColumnDef<JoinedRow>[] = [
  { key: 'deadline', header: '마감일', variant: 'default' },
  { key: 'industry', header: '산업 분야', variant: 'fixed' },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<JoinedRow, any>) => (
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
    cell: ({ value }: CellCtx<JoinedRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
];
