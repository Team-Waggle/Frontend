import { useMemo } from 'react';
import { BaseTagProps } from '../../../types/tag';
import {
  BASE_TAG_STYLES,
  TAG_COLOR_STYLES,
  TAG_ICON_COLOR_STYLES,
  TAG_PADDING_STYLES,
  TAG_SHAPE_STYLES,
  TAG_SIZE_STYLES,
  TAG_TEXT_STYLES,
} from './style';

const BaseTag = ({
  size,
  type,
  color,
  shape,
  hasLeftIcon = false,
  className,
  children,
}: BaseTagProps) => {
  const tagStyles = useMemo(() => {
    return `${BASE_TAG_STYLES} ${TAG_SIZE_STYLES[size]} ${TAG_SHAPE_STYLES[shape]} ${TAG_PADDING_STYLES[size][shape]} ${TAG_TEXT_STYLES[size][type]}
    ${TAG_COLOR_STYLES[color][type].bg} ${TAG_COLOR_STYLES[color][type].text}
    ${TAG_COLOR_STYLES[color][type].border} ${className || ''}`;
  }, [size, shape, type, color, className]);

  const iconColor = TAG_ICON_COLOR_STYLES[color];

  return (
    <div className={tagStyles}>
      {hasLeftIcon && (
        <span className={`h-[0.6rem] w-[0.6rem] rounded-full ${iconColor}`} />
      )}
      {children}
    </div>
  );
};
export default BaseTag;
