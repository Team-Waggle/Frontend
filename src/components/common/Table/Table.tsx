import { useMemo } from 'react';
import type { ColumnDef } from '../../../types/table';
import { useCellRegistry, resolveCell } from './Registry';
import { ThFrame, TdFrame } from './CellFrame';

export interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  rowKey?: (row: T, index: number) => string | number;
  stickyHeader?: boolean;
  renderRowDetail?: (row: T, index: number) => React.ReactNode | null;
  isRowExpanded?: (row: T, index: number) => boolean;
  isRowClosed?: (row: T) => boolean;
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
  renderRowDetail,
  isRowExpanded,
  isRowClosed,
}: TableProps<T>) {
  const reg = useCellRegistry();
  const template = useGridTemplate(columns);

  return (
    <div className="w-full overflow-x-auto overflow-y-auto scrollbar-none md:overflow-x-visible">
      <div className="relative grid min-w-[81.8rem] sm:min-w-[72rem] md:min-w-full">
        <div
          role="rowgroup"
          className="relative grid min-w-full"
          style={{
            gridTemplateColumns: template,
          }}
        >
          {columns.map((c) => (
            <div
              key={`h-${c.key}`}
              role="columnheader"
              className={`min-w-0 overflow-hidden border-b border-black-100 bg-white ${
                stickyHeader ? 'sticky top-0 z-20' : ''
              }`}
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

        <div className="min-w-full">
          {data.map((row, ri) => {
            const k = String(
              rowKey ? rowKey(row, ri) : ((row as any)?.id ?? ri),
            );
            const closed = isRowClosed?.(row) ?? false;

            return (
              <div key={k}>
                <div
                  role="row"
                  className={`grid ${closed ? 'text-black-70' : undefined}`}
                  style={{ gridTemplateColumns: template }}
                  data-row-closed={closed ? 'true' : 'false'}
                >
                  {columns.map((c) => {
                    const value = c.accessor
                      ? c.accessor(row, ri)
                      : (row as any)[c.key];
                    const C = c.cell ? resolveCell(c.cell as any, reg) : null;
                    const variant = (c.cellVariant ?? c.variant) as
                      | string
                      | undefined;

                    return (
                      <div
                        key={`c-${c.key}-${ri}`}
                        role="gridcell"
                        className={[
                          'min-w-0 overflow-hidden border border-x-0 border-t-0 border-solid border-black-50',
                          closed ? 'text-black-70' : '',
                          'whitespace-nowrap',
                        ].join(' ')}
                        data-variant={variant}
                      >
                        <TdFrame
                          variant={c.cellVariant ?? c.variant}
                          title={typeof value === 'string' ? value : undefined}
                          className={`${c.className ?? ''} ${closed ? 'text-black-70' : ''}`}
                        >
                          {C ? (
                            (C as any)({ row, rowIndex: ri, value, column: c })
                          ) : (
                            <span className="block">{String(value ?? '')}</span>
                          )}
                        </TdFrame>
                      </div>
                    );
                  })}
                </div>

                {renderRowDetail && (isRowExpanded?.(row, ri) ?? false) && (
                  <div
                    className="grid min-w-full"
                    style={{ gridTemplateColumns: template }}
                  >
                    <div style={{ gridColumn: '1 / -1' }}>
                      {renderRowDetail(row, ri)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
