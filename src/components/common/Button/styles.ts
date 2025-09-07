import { ButtonColor, ButtonSize } from '../../../types/button';

export const BASE_BUTTON_STYLES = `flex justify-center items-center`;

export const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-[2.8rem] px-[1.6rem] text-caption-12_Sb600 rounded-[0.4rem] gap-[0.6rem]',
  md: 'h-[3.2rem] px-[1.6rem] text-subtitle-14_Sb600 rounded-[0.4rem] gap-[0.6rem]',
  lg: 'h-[4.4rem] px-[3.2rem] text-title-18_Sb600 rounded-[0.6rem] gap-[0.8rem]',
  xl: 'min-w-[11.2rem] h-[4.8rem] px-[3.2rem] text-title-18_Sb600 rounded-[0.8rem] gap-[0.8rem]',
  full: 'h-[4.8rem] px-[8rem] text-title-18_Sb600 rounded-[0.8rem] gap-[0.8rem]',
};

export const BUTTON_COLOR_STYLES: Record<ButtonColor, string> = {
  primary:
    'bg-primary text-black-10 sm:hover:bg-primary-80 active:bg-primary-80 disabled:bg-black-50 disabled:text-black-70',
  secondary:
    'bg-primary-10 text-primary-80 sm:hover:bg-primary-20 active:bg-primary-20 border border-solid border-primary-70 disabled:sm:hover:bg-primary-10',
  line: 'bg-black-10 text-black-130 sm:hover:bg-black-30 active:bg-black-30 border border-solid border-black-60 disabled:sm:hover:bg-black-10',
  special:
    'bg-black-10 text-black-130 sm:hover:bg-black-30 active:bg-black-30 disabled:text-black-70 disabled:bg-text-70 disabled:sm:hover:bg-black-10',
  p_special:
    'bg-black-10 text-primary-70 sm:hover:bg-black-30 active:bg-black-30 disabled:text-black-70 disabled:bg-text-70 disabled:sm:hover:bg-black-10',
};
