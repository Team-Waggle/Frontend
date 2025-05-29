import { ButtonColor, ButtonSize } from '../../../types/button';

export const BASE_BUTTON_STYLES = `
  flex
  items-center
`;

export const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-[2.8rem] px-[1.6rem] text-caption-12_Sb600 rounded-[0.4rem] gap-[0.6rem]',
  md: 'h-[3.2rem] px-[1.6rem] text-subtitle-14_Sb600 rounded-[0.4rem] gap-[0.6rem]',
  lg: 'h-[4.4rem] px-[3.2rem] text-title-18_Sb600 rounded-[0.6rem] gap-[0.8rem]',
  xl: 'h-[4.8rem] px-[3.2rem] text-title-18_Sb600 rounded-[0.8rem] gap-[0.8rem]',
  full: 'h-[4.8rem] px-[8rem] text-title-18_Sb600 rounded-[0.8rem] gap-[0.8rem]',
};

export const BUTTON_COLOR_STYLES: Record<ButtonColor, string> = {
  primary:
    'bg-primary text-black-10 hover:bg-primary-80 disabled:bg-black-50 disabled:text-black-70',
  secondary:
    'bg-primary-10 text-primary-80 hover:bg-primary-20 border border-solid border-primary-70',
  line: 'bg-black-10 text-black-130 hover:bg-black-30 border border-solid border-black-60',
  special:
    'text-black-130 hover:bg-black-30 disabled:text-black-70 disabled:bg-text-70',
  p_special:
    'text-primary-70 hover:bg-black-30 disabled:text-black-70 disabled:bg-text-70',
};
