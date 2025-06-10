import { ProfileChipType, ScreenSize } from '../../../../styles/types/profileChip';

const COMMON_DEFAULT_BORDER_STYLE = 'border-solid border-[1px] border-black-50 rounded-lg';
const DEFAULT_PADDING = 'pl-8 pr-4 py-0 gap-[2.2rem]';
const CONTROL_PADDING = 'p-[1.4rem] pr-[2.4rem] pl-[1.6rem] gap-[1.4rem]';

export const PROFILE_CHIP_SIZE: Record<ProfileChipType, Record<ScreenSize, string>> = {
  default: {
    xs: 'w-[26.8rem]',
    md: 'w-[21.6rem]',
    xl: 'w-[24.8rem]',
  },
  control: {
    xs: 'w-[20.8rem]',
    md: 'w-[20.8rem]',
    xl: 'w-[17.8rem]',
  },
};

export const PROFILE_CHIP_STYLES: Record<ProfileChipType, Record<string, string>> = {
  default: {
    default: `bg-black-10 ${COMMON_DEFAULT_BORDER_STYLE} ${DEFAULT_PADDING}`,
    hover: `bg-black-30 ${COMMON_DEFAULT_BORDER_STYLE} ${DEFAULT_PADDING}`,
    active: `bg-black-30 ${COMMON_DEFAULT_BORDER_STYLE} ${DEFAULT_PADDING}`,
  },
  control: {
    default: `bg-black-10 ${COMMON_DEFAULT_BORDER_STYLE} ${CONTROL_PADDING}`,
    hover: `bg-black-60 ${COMMON_DEFAULT_BORDER_STYLE} ${CONTROL_PADDING}`,
    disabled: `bg-black-30 ${COMMON_DEFAULT_BORDER_STYLE} ${CONTROL_PADDING}`,
  },
};