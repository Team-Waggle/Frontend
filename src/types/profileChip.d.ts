export type ProfileChipType = 'default' | 'control';
export type DefaultChipState = 'default' | 'hover' | 'active';
export type ControlChipState = 'default' | 'hover' | 'disabled';
export type ScreenSize = 'extraSmall' | 'medium' | 'extraLarge';

interface DefaultProfileChipProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'default';
  state: DefaultChipState;
  size?: ScreenSize;
  onClose?: () => void;
  onClick?: () => void;
}

interface ControlProfileChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'control';
  state: ControlChipState;
  size?: ScreenSize;
}

interface ProfileChipContentProps {
  name: string;
  jobRole: string;
  yearCount: string;
}

export type ProfileChipProps = 
  | (DefaultProfileChipProps & ProfileChipContentProps)
  | (ControlProfileChipProps & ProfileChipContentProps);