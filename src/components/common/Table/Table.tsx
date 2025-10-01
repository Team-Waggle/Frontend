import React from "react";
import { ContentCell, DivisionCell, DivisionType, ContentType } from "./TableCell";

export interface TabColumn {
  label: string;
  variant: DivisionType;
  dataKey?: string;
}

interface HeaderRowProps {
  columns: TabColumn[];
}

export const HeaderRow: React.FC<HeaderRowProps> = ({ columns }) => (
  <thead className="h-[3.2rem]">
    <tr>
      {columns.map((col, idx) => (
        <DivisionCell key={idx} variant={col.variant}>
          {col.label}
        </DivisionCell>
      ))}
    </tr>
  </thead>
);

export interface TableRowData {
  cells: React.ReactNode[];
  variants: ContentType[];
}

interface TableRowProps {
  row: TableRowData;
}

export const TableRow: React.FC<TableRowProps> = ({ row }) => (
  <tr>
    {row.cells.map((cell, idx) => (
      <ContentCell key={idx} variant={row.variants[idx]}>
        {cell}
      </ContentCell>
    ))}
  </tr>
);

export interface TableData {
  columns: TabColumn[];
  rows: TableRowData[];
}

interface TableProps {
  data: TableData;
}

export const Table: React.FC<TableProps> = ({ data }) => (
  <table className="table-fixed border-collapse">
    <HeaderRow columns={data.columns} />
    <tbody>
      {data.rows.map((row, idx) => (
        <TableRow key={idx} row={row} />
      ))}
    </tbody>
  </table>
);