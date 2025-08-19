import React, { useEffect, useState } from 'react';
import IcXGrey from '../../../../assets/chip/ic_chip_x_grey.svg?react';
import IcXBlack from '../../../../assets/chip/ic_chip_x_black.svg?react';

import { getDisplayName, getIconKey } from '../../../../utils/skillNamemap';
import { getSkillIcon } from '../../../../utils/getSkillIcon';

export type ChipShape = 'circle' | 'square';

export interface BaseKeywordChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ChipShape;
  keyword: string;
  children: React.ReactNode;
  onRemove?: () => void;
}

const KeywordChip = ({
  shape = 'circle',
  className,
  children,
  onRemove,
  ...rest
}: BaseKeywordChipProps) => {
  const [Icon, setIcon] = useState<React.FC<
    React.SVGProps<SVGSVGElement>
  > | null>(null);

  const key = typeof children === 'string' ? children.trim() : '';
  const displayText = getDisplayName(key);

  useEffect(() => {
    let isMounted = true;

    const fetchIcon = async () => {
      if (shape === 'square' && key) {
        const iconKey = getIconKey(key);
        const component = await getSkillIcon(iconKey);
        if (isMounted) setIcon(() => component);
      }
    };

    fetchIcon();

    return () => {
      isMounted = false;
    };
  }, [key, shape]);

  const baseStyle =
    'inline-flex px-[1rem] items-center gap-[0.8rem] flex-shrink-0';
  const shapeStyles = {
    circle:
      'h-[2.4rem] rounded-[9.9rem] bg-black-40 text-black-80 text-caption-12_M500',
    square:
      'h-[3.2rem] rounded-[0.4rem] bg-black-30 text-black-130 text-caption-13_M500 justify-center',
  };

  const combinedStyle = `${baseStyle} ${shapeStyles[shape]} ${className ?? ''}`;

  return (
    <button {...rest} className={combinedStyle}>
      {shape === 'square' && Icon && <Icon className="h-[1.6rem] w-[1.6rem]" />}
      <span>{displayText}</span>
      <span
        onClick={(e) => {
          e.stopPropagation(); // button의 onClick 방지
          onRemove?.();
        }}
        className="flex h-[1.2rem] w-[1.2rem] items-center justify-center gap-4"
      >
        {shape === 'square' ? <IcXBlack /> : <IcXGrey />}
      </span>
    </button>
  );
};

export default KeywordChip;
