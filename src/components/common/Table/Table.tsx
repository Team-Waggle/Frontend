import { useMemo } from 'react';
import type { ColumnDef } from '../../../types/table';
import { useCellRegistry, resolveCell } from './Registry';
import { ThFrame, TdFrame } from './CellFrame';

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
  stickyHeader?: boolean;
}

function useGridTemplate<T>(columns: ColumnDef<T>[]) {
  return useMemo(() => {
    const tracks = columns.map((c) => {
      const v = (c.cellVariant ?? c.headerVariant ?? c.variant) as string;
      if (v === 'title') return 'minmax(0, 1fr)';
      return 'auto';
    });
    return tracks.join(' ');
  }, [columns]);
}

export function Table<T>({
  columns,
  data,
  rowKey,
  stickyHeader = true,
}: TableProps<T>) {
  const reg = useCellRegistry();
  const template = useGridTemplate(columns);

  return (
    <div className="w-full overflow-x-auto">
      <div
        role="rowgroup"
        className="w-full"
        style={{ display: 'grid', gridTemplateColumns: template }}
      >
        {columns.map((c) => (
          <div
            key={`h-${c.key}`}
            role="columnheader"
            className={`${stickyHeader ? 'sticky top-0 z-10' : ''} min-w-0 overflow-hidden`}
          >
            <ThFrame
              variant={c.headerVariant ?? c.variant}
              className={c.headerClassName}
            >
              {c.header}
            </ThFrame>
          </div>
        ))}
      </div>

      <div role="rowgroup" className="w-full">
        {data.map((row, ri) => (
          <div
            key={String(rowKey ? rowKey(row, ri) : ((row as any)?.id ?? ri))}
            role="row"
            style={{ display: 'grid', gridTemplateColumns: template }}
          >
            {columns.map((c) => {
              const value = c.accessor
                ? c.accessor(row, ri)
                : (row as any)[c.key];
              const C = c.cell ? resolveCell(c.cell as any, reg) : null;
              return (
                <div
                  key={`c-${c.key}-${ri}`}
                  role="gridcell"
                  className="min-w-0 overflow-hidden"
                >
                  <TdFrame
                    variant={c.cellVariant ?? c.variant}
                    title={typeof value === 'string' ? value : undefined}
                    className={c.className}
                  >
                    {C ? (
                      (C as any)({ row, rowIndex: ri, value, column: c })
                    ) : (
                      <span className="block truncate">
                        {String(value ?? '')}
                      </span>
                    )}
                  </TdFrame>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
