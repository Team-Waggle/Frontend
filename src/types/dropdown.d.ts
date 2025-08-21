export interface DropdownProps {
  leftIcon: React.ReactNode;
  title: string;
  contentList: { id: string; label: string }[];
  selected: string[];
  onChange: (label: string, checked: boolean, type: string) => void;
}
