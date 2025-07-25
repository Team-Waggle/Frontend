export type ChipShape = 'circle' | 'square';
export type ChipSize = 24 | 32;

export interface BaseKeywordChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ChipShape;
  size?: ChipSize;
  children: React.ReactNode;
}