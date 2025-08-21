export interface BaseCheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  children: React.ReactNode;
}
