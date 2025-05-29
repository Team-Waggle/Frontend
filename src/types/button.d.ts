export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'line'
  | 'special'
  | 'p_special';

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
