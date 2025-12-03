import type { ColumnDef, CellCtx } from '../types/table';
import { IconActions } from '../components/common/Table/cells/IconActions';
import SkillIcons from '../components/SkillIcons';
import { skillIconMapper } from '../utils/skillIconMapper';
import { Link } from 'react-router-dom';
import BookmarkIc from '../assets/icons/nav/ic_nav_bookmark_large.svg?react';
import TrashIc from '../assets/icons/profile/ic_trashcan.svg?react';
import { isClosedKST } from '../utils/dateKST';

export type BookmarkRow = {
  id: string;
  deadline?: string;
  industry?: string | string[];
  title?: string;
  skills?: string[];
};

// 북마크 관련
export const BookmarkColumns = (
  onBookmarkClick: (projectId: number) => void,
): ColumnDef<BookmarkRow>[] => [
  { key: 'deadline', header: '마감일', variant: 'default' },
  {
    key: 'industry',
    header: '산업 분야',
    variant: 'fixed',
    cell: ({ value }: CellCtx<BookmarkRow, any>) => (
      <span>{String(value ?? '')}</span>
    ),
  },
  {
    key: 'title',
    header: '제목',
    variant: 'title',
    cell: ({ row }: CellCtx<BookmarkRow, any>) => (
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
    cell: ({ value }: CellCtx<BookmarkRow, any>) => (
      <SkillIcons iconKeys={value ?? []} size="large" limit={3} />
    ),
  },
  {
    key: 'actions',
    header: '',
    headerVariant: 'icon1',
    cellVariant: 'icon',
    accessor: (r) => r,
    cell: (ctx: CellCtx<BookmarkRow, any>) => {
      const { row, column } = ctx;
      const closed = isClosedKST(row.deadline);
      const actions = closed
        ? [{ key: 'delete', icon: TrashIc, ariaLabel: 'delete', title: '삭제' }]
        : [
            {
              key: 'bookmark',
              icon: () => <BookmarkIc className="text-primary" />,
              ariaLabel: 'bookmark',
              title: '북마크',
              onClick: (row: BookmarkRow) => {
                onBookmarkClick(Number(row.id));
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
            },
          }}
        />
      );
    },
    meta: { round: true },
  },
];
