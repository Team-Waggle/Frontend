export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  color?: ButtonColor;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
