import React from 'react';
import { TableRowData, TabColumn } from '../components/common/Table/Table';
import { ContentType } from '../components/common/Table/TableCell';

/**
 * 범용 테이블 매퍼 (Tag & Icon 지원)
 *
 * - API에서 받아온 data 배열을 TableRowData[]로 변환
 * - columns 정의에 따라 cells와 variants를 자동으로 맞춤
 * - Tag나 Icon은 options로 외부 주입 가능
 */

export const profileTableRowMapper = (
  data: any[],
  columns: TabColumn[],
  options?: {
    iconMapper?: (item: any, col: TabColumn) => React.ReactNode;
    tagMapper?: (item: any, col: TabColumn) => React.ReactNode;
  },
): TableRowData[] => {
  return data.map((item) => {
    const cells: React.ReactNode[] = [];
    const variants: ContentType[] = [];

    columns.forEach((col) => {
      let variant: ContentType = 'default';
      let value: any = item[col.dataKey ?? col.label];

      switch (col.variant) {
        case 'fixed':
          variant = value && Array.isArray(value) ? 'tag' : 'fixed';
          cells.push(
            options?.tagMapper && variant === 'tag'
              ? options.tagMapper(item, col)
              : value ?? ''
          );
          break;

        case 'default':
          variant = 'default';
          cells.push(value ?? '');
          break;

        case 'title':
          variant = 'title';
          cells.push(item.title ?? item.name ?? '');
          break;

        case 'skill':
          variant = 'skill';
          if (Array.isArray(item.skills)) {
            cells.push(
              typeof item.skills[0] === 'string'
                ? item.skills.join(', ')
                : item.skills
            );
          } else {
            cells.push('');
          }
          break;

        case 'icon1':
        case 'icon2':
        case 'icon3':
          variant = 'icon';
          cells.push(
            options?.iconMapper ? options.iconMapper(item, col) : <span>⋮</span>
          );
          break;

        default:
          cells.push('');
      }

      variants.push(variant);
    });

    return { cells, variants };
  });
};