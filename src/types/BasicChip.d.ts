export type ChipShape = 'circle' | 'square';
export type ChipSize = 32 | 42 | 64 | 80;

export interface BaseBasicChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ChipShape;
  size?: ChipSize;
  isActive?: boolean;
  children: React.ReactNode;
}