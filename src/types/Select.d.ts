export interface BaseSelectProps {
  items: { id: string; label: string }[];
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  width?: string;
  className?: string;
  disabled?: boolean;
  hasError?: boolean;
  renderItem?: (item: { id: string; label: string }) => React.ReactNode;
}
