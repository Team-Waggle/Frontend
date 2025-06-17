export type ProfileIconSize = 'sm' | 'md' | 'lg';
export type ProfileIconType = 'default' | 'edit';

export interface BaseProfileIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ProfileIconSize;
  blur?: boolean;
  type?: ProfileIconType;
  imageUrl?: string;
  onFileSelect?: (file: File) => void;
}