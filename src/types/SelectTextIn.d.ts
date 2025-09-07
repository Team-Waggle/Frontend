export interface SelectTextInProps {
  items: { id: string; label: string }[];
  title: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  type?: 'default' | 'outline';
  state?: 'up' | 'down';
}
