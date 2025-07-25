import { ChipShape, ChipSize } from '../../../../types/BasicChip';

type StyleMap = {
  [key in ChipShape]: {
    [key in ChipSize]?: string;
  };
};

export const CHIP_BASE_STYLE = 'inline-flex justify-center items-center shrink-0 border-solid border';
export const CHIP_STYLE_MAP: StyleMap = {
  circle: {
    32: 'h-[3.2rem] px-[1.6rem] rounded-[9.9rem] text-caption-13_M500',
  },
  square: {
    32: 'h-[3.2rem] px-[1rem] rounded-[0.4rem] text-caption-13_M500',
    42: 'h-[4.2rem] min-w-[4.2rem] rounded-[0.6rem] text-body-16_M500',
    64: 'h-[6.4rem] min-w-[6.4rem] rounded-[1rem] bg-black-10 text-caption-13_M500',
    80: 'h-[8rem] min-w-[8rem] rounded-[1rem] bg-black-10 text-caption-13_M500',
  },
};

export const CHIP_STATE_STYLE = {
  default: 'border-black-60 text-black-70',
  active: 'border-primary-70 text-black-130',
  hover: 'hover:border-primary-70 hover:text-black-130',
  error: 'border-[#F5552D] text-black-70'
};