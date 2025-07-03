import {
  TagSize,
  TagPaddingStyles,
  TagColorStyles,
  TagTextStyles,
} from '../../../types/tag';

export const BASE_TAG_STYLES = `flex items-center gap-[0.6rem]`;

export const TAG_SIZE_STYLES: Record<TagSize, string> = {
  sm: 'h-[2.4rem]',
  lg: 'h-[3.2rem]',
  xl: 'h-[3.2rem] w-[15.2rem]',
};

export const TAG_TEXT_STYLES: TagTextStyles = {
  sm: {
    filled: 'text-caption-12_M500',
    outline: 'text-caption-12_M500',
  },
  lg: {
    filled: 'text-caption-13_Sb600',
    outline: 'text-caption-13_M500',
  },
  xl: {
    filled: 'text-caption-13_Sb600',
    outline: 'text-caption-13_M500',
  },
};

export const TAG_COLOR_STYLES: TagColorStyles = {
  basic: {
    filled: {
      bg: 'bg-black-40',
      text: 'text-black-130',
      border: 'border-transparent',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-black-130',
      border: 'border border-solid border-black-60',
    },
  },
  blue: {
    filled: {
      bg: 'bg-primary-10',
      text: 'text-black-130',
      border: 'border-transparent',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-primary-70',
      border: 'border border-solid border-primary-70',
    },
  },
  green: {
    filled: {
      bg: 'bg-green-10',
      text: 'text-black-130',
      border: 'border-transparent',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-green-70',
      border: 'border border-solid border-green-70',
    },
  },
  orange: {
    filled: {
      bg: 'bg-yellow-10',
      text: 'text-black-130',
      border: 'border-transparent',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-orange-70',
      border: 'border border-solid border-orange-70',
    },
  },
  red: {
    filled: {
      bg: 'bg-orange-10',
      text: 'text-black-130',
      border: 'border-transparent',
    },
    outline: {
      bg: 'bg-transparent',
      text: 'text-error',
      border: 'border border-solid border-error',
    },
  },
};

export const TAG_PADDING_STYLES: TagPaddingStyles = {
  sm: {
    square: 'px-[0.8rem]',
    circle: 'px-[1rem]',
  },
  lg: {
    square: 'px-[1rem]',
    circle: 'px-[1.6rem]',
  },
  xl: {
    square: 'justify-center',
    circle: 'justify-center',
  },
};

export const TAG_SHAPE_STYLES = {
  square: 'rounded-[0.4rem]',
  circle: 'rounded-[9.9rem]',
};

export const TAG_ICON_COLOR_STYLES = {
  basic: 'bg-black',
  blue: 'bg-primary',
  green: 'bg-green',
  orange: 'bg-orange',
  red: 'bg-error',
};
