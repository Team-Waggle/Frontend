import React from 'react';
import IcXGrey from '../../../../assets/chip/ic_chip_x_grey.svg?react';
import IcXBlack from '../../../../assets/chip/ic_chip_x_black.svg?react';
import Iiicons from '../../../../assets/main/icon/skill/icon-skill-3ds_Max.svg?react';

export type ChipShape = 'circle' | 'square';
export interface BaseKeywordChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ChipShape;
  children: React.ReactNode;
}

const Icons = import.meta.glob(
  '../../../../assets/main/icon/skill/icon-skill-*.svg?react',
  {
    eager: true,
    import: 'default',
  },
) as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>;

const getIconComponent = (
  key: string,
): React.FC<React.SVGProps<SVGSVGElement>> | null => {
  const matchedPath = Object.keys(Icons).find((path) =>
    path.includes(`icon-skill-${key}.svg`),
  );
  return matchedPath ? Icons[matchedPath] : null;
};

const normalizeKey = (text: string) =>
  text
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[()]/g, '')
    .replace(/^./, (c) => c.toUpperCase());

const KeywordChip = ({
  shape = 'circle',
  className,
  children,
  ...rest
}: BaseKeywordChipProps) => {
  const key = typeof children === 'string' ? normalizeKey(children) : '';
  const Icon = shape === 'square' && key ? getIconComponent(key) : null;

  const baseStyle =
    'inline-flex px-[1rem] items-center gap-[0.8rem] flex-shirink-0';
  const shapeStyles = {
    circle:
      'h-[2.4rem] rounded-[9.9rem] bg-black-40 text-black-80 text-caption-12_M500',
    square:
      'h-[3.2rem] rounded-[0.4rem] bg-black-30 text-black-130 text-caption-13_M500 justify-center',
  };

  const combinedStyled = `${baseStyle} ${shapeStyles[shape]} ${className}`;

  return (
    <button {...rest} className={combinedStyled}>
      {shape === 'square' && Icon && (
        <Icon className="w-[1.6rem] h-[1.6rem]" />
      )}
      <span> {children} </span>
      <span className="flex h-[1.2rem] w-[1.2rem] items-center justify-center gap-4">
        {shape === 'square' ? <IcXBlack /> : <IcXGrey />}
      </span>
    </button>
  );
};

export default KeywordChip;
