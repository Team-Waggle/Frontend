export interface DropdownProps {
  leftIcon: React.ReactNode;
  title: string;
  contentList: { id: string; label: string }[];
  selected: string[];
  onChange: (id: string, label: string, checked: boolean, type: string) => void;
}
