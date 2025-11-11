import { Link } from 'react-router-dom';
import type { ColumnDef, CellCtx } from '../types/table';
import { IconActions } from '../components/common/Table/cells/IconActions';
import type {
  IconAction as _IconAction,
  IconActionsMeta as _IconActionsMeta,
} from '../components/common/Table/cells/IconActions';
import SkillIcons from '../components/SkillIcons';
import { skillIconMapper } from '../utils/skillIconMapper';
import { industries } from './formOptions.ts';
import { isClosedKST } from '../utils/dateKST.ts';

import EditIc from '../assets/icons/profile/ic_edit.svg?react';
import TrashIc from '../assets/icons/profile/ic_trashcan.svg?react';
import BaseTag from '../components/common/Tag/BaseTag';
import ArrowIc from '../assets/icons/ic_arrow_down_large.svg?react';

export type PostRow = {
  id: string;
  status?: string;
  deadline?: string;
  industry?: string | string[];
  title?: string;
  skills?: string[];
  applicantsCount?: number;
};

const industryLabelMap: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  industries.forEach((it: any) => {
    const k = String(it?.id ?? it?.value ?? it?.key ?? it?.code ?? '')
      .trim()
      .toUpperCase();
    const label = String(it?.label ?? it?.name ?? '').trim();
    if (k && label) map[k] = label;
  });
  return map;
})();

const toIndustryLabel = (raw?: string | string[]): string | string[] => {
  if (!raw) return '';
  const toLabel = (s: string) => {
    const key = String(s).trim().toUpperCase();
    return industryLabelMap[key] ?? s;
  };
  return Array.isArray(raw) ? raw.map(toLabel) : toLabel(raw);
};

const renderIndustry = (value: any) => (
  <span>{Array.isArray(value) ? value.join(', ') : String(value ?? '')}</span>
);

export const isClosedPost = (deadline?: string) => isClosedKST(deadline);

// 모집글 관리
export const postManagementColumns: ColumnDef<PostRow>[] = [
  {
    key: 'status',
    header: '진행 상태',
    variant: 'fixed',
    accessor: (r) => {
      const expired = isClosedPost(r.deadline);
      return {
        label: expired ? '마감' : String(r.status ?? ''),
        color: expired ? 'disabled' : 'blue',
      };
    },
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <BaseTag
        size="sm"
        type="filled"
        color={value?.color}
        shape="circle"
        hasLeftIcon
      >
        {value?.label}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    accessor: (r) => toIndustryLabel(r.industry),
    cell: ({ value }: CellCtx<PostRow, any>) => renderIndustry(value),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<PostRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <Link
          to={`/post/${encodeURIComponent(row.id)}`}
          className="block truncate"
          title={row.title}
        >
          {row.title}
        </Link>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => (r.skills ?? []).map((s) => skillIconMapper[s] ?? s),
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
      confirmWithModal: true,
      actions: [
        {
          key: 'edit',
          icon: EditIc,
          ariaLabel: 'edit',
          title: '수정',
          onClick: (row: PostRow) => {
            window.dispatchEvent(
              new CustomEvent('post:edit', { detail: { id: row.id } }),
            );
          },
        },
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
    accessor: (r) => {
      const expired = isClosedPost(r.deadline);
      return {
        label: expired ? '마감' : String(r.applicantsCount ?? ''),
        color: expired ? 'disabled' : 'orange',
      };
    },
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <BaseTag
        size="sm"
        type="filled"
        color={value?.color}
        shape="circle"
        hasLeftIcon
      >
        {value?.label}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    accessor: (r) => toIndustryLabel(r.industry),
    cell: ({ value }: CellCtx<PostRow, any>) => renderIndustry(value),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<PostRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <Link
          to={`/post/${encodeURIComponent(row.id)}`}
          className="block truncate"
          title={row.title}
        >
          {row.title}
        </Link>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => (r.skills ?? []).map((s) => skillIconMapper[s] ?? s),
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '아이콘',
    variant: 'icon1',
    accessor: (r) => r,
    cell: (ctx: CellCtx<PostRow, any>) => {
      const { row, column } = ctx;
      const closed = isClosedPost(row.deadline);

      const actions = closed
        ? [{ key: 'delete', icon: TrashIc, ariaLabel: 'delete', title: '삭제' }]
        : [
            {
              key: 'arrow',
              icon: ArrowIc,
              ariaLabel: 'toggle-row-detail',
              title: '열고/닫기',
              onClick: (r: PostRow) => {
                window.dispatchEvent(
                  new CustomEvent('rowdetail:toggle', { detail: { id: r.id } }),
                );
              },
            },
          ];

      return (
        <IconActions
          {...ctx}
          column={{
            ...column,
            meta: {
              ...(column.meta || {}),
              actions,
              round: true,
              confirmWithModal: true,
              canDeleteAll: closed,
            },
          }}
        />
      );
    },
    meta: { round: true },
  },
];

// 팀원 관리
export const memberManagementColumns: ColumnDef<PostRow>[] = [
  {
    key: 'status',
    header: '진행 상태',
    variant: 'fixed',
    accessor: (r) => {
      const expired = isClosedPost(r.deadline);
      return {
        label: expired ? '마감' : String(r.status ?? ''),
        color: expired ? 'disabled' : 'green',
      };
    },
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <BaseTag
        size="sm"
        type="filled"
        color={value?.color}
        shape="circle"
        hasLeftIcon
      >
        {value?.label}
      </BaseTag>
    ),
  },
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    accessor: (r) => toIndustryLabel(r.industry),
    cell: ({ value }: CellCtx<PostRow, any>) => renderIndustry(value),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<PostRow, any>) => (
      <div className="w-0 min-w-0 flex-1">
        <Link
          to={`/post/${encodeURIComponent(row.id)}`}
          className="block truncate"
          title={row.title}
        >
          {row.title}
        </Link>
      </div>
    ),
  },
  {
    key: 'skills',
    header: '사용 스킬',
    variant: 'skill',
    accessor: (r) => (r.skills ?? []).map((s) => skillIconMapper[s] ?? s),
    cell: ({ value }: CellCtx<PostRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '아이콘',
    variant: 'icon1',
    accessor: (r) => r,
    cell: (ctx: CellCtx<PostRow, any>) => {
      const { row, column } = ctx;
      const closed = isClosedPost(row.deadline);

      const actions = closed
        ? [{ key: 'delete', icon: TrashIc, ariaLabel: 'delete', title: '삭제' }]
        : [
            {
              key: 'arrow',
              icon: ArrowIc,
              ariaLabel: 'toggle-row-detail',
              title: '열고/닫기',
              onClick: (r: PostRow) => {
                window.dispatchEvent(
                  new CustomEvent('rowdetail:toggle', { detail: { id: r.id } }),
                );
              },
            },
          ];

      return (
        <IconActions
          {...ctx}
          column={{
            ...column,
            meta: {
              ...(column.meta || {}),
              actions,
              round: true,
              canDeleteAll: closed,
              confirmWithModal: true,
            },
          }}
        />
      );
    },
    meta: { round: true },
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
