import { BaseBasicChipProps } from '../../../../types/BasicChip';
import { CHIP_BASE_STYLE, CHIP_STYLE_MAP, CHIP_STATE_STYLE } from './styles';

const BaseBasicChip = ({
  shape = 'circle',
  size = 32,
  isActive = false,
  isError = false,
  className,
  children,
  ...rest
}: BaseBasicChipProps) => {
  const shapeStyle = CHIP_STYLE_MAP[shape]?.[size] ?? '';

  const stateStyle = isError
    ? CHIP_STATE_STYLE.error
    : isActive
    ? CHIP_STATE_STYLE.active
    : CHIP_STATE_STYLE.default;

  return (
    <button
      {...rest}
      className={`
        ${CHIP_BASE_STYLE}
        ${shapeStyle}
        ${stateStyle}
        ${CHIP_STATE_STYLE.hover}
        ${className ?? ''}
      `}
    >
      {children}
    </button>
  );
};

export default BaseBasicChip;
