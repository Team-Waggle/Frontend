export type ProfileChipType = 'default' | 'control';
export type DefaultChipState = 'default' | 'hover' | 'active';
export type ControlChipState = 'default' | 'hover' | 'disabled';
export type ScreenSize = 'xs' | 'md' | 'xl';

interface DefaultProfileChipProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'default';
  state: DefaultChipState;
  size?: ScreenSize;
  onClick?: () => void;
}

interface ControlProfileChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  type: 'control';
  state: ControlChipState;
  size?: ScreenSize;
}

export type ProfileChipProps = DefaultProfileChipProps | ControlProfileChipProps;