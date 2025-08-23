export type TagSize = 'sm' | 'lg' | 'xl';
export type TagType = 'outline' | 'filled';
export type TagColor = 'basic' | 'blue' | 'green' | 'orange' | 'red';
export type TagShape = 'square' | 'circle';

export type TagPaddingStyles = Record<TagSize, Record<TagShape, string>>;
export type TagTextStyles = Record<TagSize, Record<TagType, string>>;

interface TagColorStyle {
  bg: string;
  text: string;
  border: string;
}

export type TagColorVariants = Record<TagType, TagColorStyle>;

export type TagColorStyles = Record<TagColor, TagColorVariants>;

export interface BaseTagProps {
  size: TagSize;
  type: TagType;
  color: TagColor;
  shape: TagShape;
  hasLeftIcon?: boolean;
  className?: string;
  children: React.ReactNode;
}
