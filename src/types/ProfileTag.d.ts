export type ProfileTagType = 'default' | 'creator';
export type ScreenSize = 'extraSmall' | 'medium' | 'extraLarge';

export interface ProfileTagProps {
  type?: ProfileTagType;
  size?: ScreenSize;
  path?: string;
  imageUrl?: string;
  name: string;
  jobRole?: string;
  yearCount: number;
  token?: string | null;
  setIsLoginSuggestionModalOpen: (open: boolean) => void;
}
