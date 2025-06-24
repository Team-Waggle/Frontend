import { TextAreaType, DefaultTextAreaState, FixedTextAreaState } from "../../../../types/IconTextArea";

type StateStyleMap = {
  [key in TextAreaType]: Record<string, string>;
};

export const ICON_TEXT_AREA_STYLES: StateStyleMap = {
  default: {
    default: 'border-black-60 text-black-70 bg-black-10',
    typing: 'border-primary text-black-130 bg-black-10',
    complete: 'border-black-60 text-black-130 bg-black-10',
    error: 'border-red-500 text-black-70 bg-black-10',
  },
  fixed: {
    default: 'border-black-60 text-black-70 bg-black-10',
    typing: 'border-primary text-black-130 bg-black-10',
    complete: 'border-black-60 text-black-130 bg-black-10',
    disable: 'border-black-60 text-black-70 bg-black-50'
  },
};