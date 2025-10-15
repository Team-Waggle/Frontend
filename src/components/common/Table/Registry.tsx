import React from "react";
import type { CellRenderer } from "../../../types/table";

const CellRegistryContext = React.createContext<Record<string, CellRenderer<any>>>({});

export function CellProvider({ registry, children }: { registry: Record<string, CellRenderer<any>>; children: React.ReactNode; }) {
  return <CellRegistryContext.Provider value={registry}>{children}</CellRegistryContext.Provider>;
}

export function useCellRegistry() { return React.useContext(CellRegistryContext); }

export function resolveCell<T>(cell: string | CellRenderer<T>, reg: Record<string, CellRenderer<T>>): CellRenderer<T> {
  return typeof cell === "string" ? reg[cell] : cell;
}
