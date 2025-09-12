export type ProfileTagType = 'default' | 'creator';
export type ScreenSize = 'extraSmall' | 'medium' | 'extraLarge';

export interface ProfileTagProps {
  type?: ProfileTagType;
  size?: ScreenSize;
  name: string;
  jobRole: string;
  yearCount: number;
}