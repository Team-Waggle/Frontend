import React from 'react';
import BaseBasicChip from '../../Chip/BasicChip/BaseBasicChip';
import { BaseBasicChipProps } from '../../../../types/BasicChip';

interface BaseBasicChipSquareProps extends Omit<BaseBasicChipProps, 'shape' | 'size'> {}

const BaseBasicChipSquare = (props: BaseBasicChipSquareProps) => {
  return (
    <BaseBasicChip
      {...props}
      shape="square"
      size={42}
    />
  );
};

export default BaseBasicChipSquare;
