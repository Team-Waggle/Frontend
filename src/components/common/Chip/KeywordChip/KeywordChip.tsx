import React from "react";
import IcXGrey from "../../../../assets/chip/ic_chip_x_grey.svg?react";
import IcXBlack from "../../../../assets/chip/ic_chip_x_black.svg?react";

// KeywordChip

/**
 * Shape: circle, square
 * label: Chip display text
 * icon: square Shape에서 사용되는 추가 아이콘
 */

export type ChipShape = "circle" | "square";

export interface BaseKeywordChipProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shape?: ChipShape;
  label: string;
  icon?: React.ReactNode;
  onRemove?: () => void;
}

const KeywordChip = ({
  shape = "circle",
  className,
  label,
  icon,
  onRemove,
  ...rest
}: BaseKeywordChipProps) => {
  const baseStyle =
    "inline-flex px-[1rem] items-center gap-[0.8rem] flex-shrink-0";
  const shapeStyles = {
    circle:
      "h-[2.4rem] rounded-[9.9rem] bg-black-40 text-black-80 text-caption-12_M500",
    square:
      "h-[3.2rem] rounded-[0.4rem] bg-black-30 text-black-130 text-caption-13_M500 justify-center",
  };

  const combinedStyle = `${baseStyle} ${shapeStyles[shape]} ${className ?? ""}`;

  return (
    <button {...rest} className={combinedStyle}>
      {shape === "square" && icon}
      <span>{label}</span>
      <span
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
        className="flex h-[1.2rem] w-[1.2rem] items-center justify-center gap-4"
      >
        {shape === "square" ? <IcXBlack /> : <IcXGrey />}
      </span>
    </button>
  );
};

export default KeywordChip;
