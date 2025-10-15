import React from "react";

export type ColumnVariant =
  | "default"
  | "tag"
  | "fixed"
  | "skill"
  | "title"
  | "icon"
  | "icon1"
  | "icon2"
  | "icon3";

export type CellCtx<T, V = unknown> = {
  row: T;
  rowIndex: number;
  value: V;
  column: ColumnDef<T, V>;
};

export type CellRenderer<T, V = unknown> =
  | React.FC<CellCtx<T, V>>
  | ((ctx: CellCtx<T, V>) => React.ReactNode);

export interface ColumnDef<T, V = unknown> {
  meta?: Record<string, unknown>;
  key: string;
  header: React.ReactNode;
  variant?: ColumnVariant;
  headerVariant?: ColumnVariant;
  cellVariant?: ColumnVariant;
  className?: string;
  headerClassName?: string;
  accessor?: (row: T, rowIndex: number) => V;
  cell?: CellRenderer<T, V>;
}