import BaseBasicChip from '../../Chip/BasicChip/BaseBasicChip';
import { BaseBasicChipProps } from '../../../../types/BasicChip';

interface BaseBasicChipCircleProps extends Omit<BaseBasicChipProps, 'shape' | 'size'> {}

const BaseBasicChipCircle = (props: BaseBasicChipCircleProps) => {
  return (
    <BaseBasicChip
      {...props}
      shape="circle"
      size={32}
    />
  );
};

export default BaseBasicChipCircle;
