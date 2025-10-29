import type { ColumnDef, CellCtx } from '../types/table';
import { IconActions } from '../components/common/Table/cells/IconActions';
import SkillIcons from '../components/SkillIcons';
import { skillIconMapper } from '../utils/skillIconMapper';

export type BookmarkRow = {
  id: string;
  deadline?: string;
  industry?: string | string[];
  title?: string;
  skills?: string[];
};

// 북마크 관련
export const BookmarkColumns: ColumnDef<BookmarkRow>[] = [
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
        <span className="block truncate">{row.title}</span>
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
    cell: (ctx: CellCtx<BookmarkRow, any>) => <IconActions {...ctx} />,
    meta: {
      preset: ['bookmark'],
      round: true,
    },
  },
];
