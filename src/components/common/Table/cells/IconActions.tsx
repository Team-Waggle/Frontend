import React from "react";
import type { CellCtx } from "../../../../types/table";

import bookmarkIc from "../../../../assets/icons/profile/ic_bookmark.svg?react";
import emailIc from "../../../../assets/icons/profile/ic_email.svg?react";
import linkIc from "../../../../assets/icons/profile/ic_link.svg?react";
import deleteIc from "../../../../assets/icons/profile/ic_trashcan.svg?react";
import checkGreyIc from "../../../../assets/icons/profile/ic_check_grey.svg?react";
import checkGreenIc from "../../../../assets/icons/profile/ic_check_green.svg?react";
import editIc from "../../../../assets/icons/profile/ic_edit.svg?react";
import arrowIc from "../../../../assets/icons/ic_arrow_down_large.svg?react";

type IconSVG = React.FC<React.SVGProps<SVGSVGElement>>;

type PresetKey = "bookmark" | "email" | "link" | "delete" | "check" | "edit" | "arrow";

type IconAction<T> = {
  key: string;
  icon: IconSVG;
  ariaLabel: string;
  title?: string;
  onClick?: (row: T) => void;
};

type IconActionsMeta<T> = {
  actions?: IconAction<T>[];
  preset?: PresetKey[];
  presetIcons?: Partial<Record<PresetKey, IconSVG>>;
};

const PRESET_TEXT: Record<PresetKey, { label: string; title: string }> = {
  bookmark: { label: "bookmark", title: "북마크" },
  email: { label: "email", title: "이메일" },
  link: { label: "link", title: "링크" },
  delete: { label: "delete", title: "삭제" },
  check: { label: "check", title: "확인" },
  edit: { label: "edit", title: "수정" },
  arrow: { label: "arrow", title: "이동" },
};

const DEFAULT_PRESET_ICONS: Record<PresetKey, IconSVG> = {
  bookmark: bookmarkIc,
  email: emailIc,
  link: linkIc,
  delete: deleteIc,
  check: checkGreyIc,
  edit: editIc,
  arrow: arrowIc,
};

export function IconActions<T>({ row, column }: CellCtx<T>) {
  const {
    actions,
    preset,
    presetIcons,
  } = (column.meta || {}) as IconActionsMeta<T>;

  const fromPreset = (preset || [])
    .map<IconAction<T> | null>((k) => {
      const Icon = (presetIcons?.[k] ?? DEFAULT_PRESET_ICONS[k]) as IconSVG | undefined;
      if (!Icon) return null;
      const t = PRESET_TEXT[k];
      return { key: k, icon: Icon, ariaLabel: t.label, title: t.title };
    })
    .filter(Boolean) as IconAction<T>[];

  const list = (actions && actions.length ? actions : fromPreset) || [];
  if (!list.length) return null;

  return (
    <div className="flex gap-[1rem] justify-center items-center">
      {list.map((a) => {
        const Icon = a.icon;
        return (
          <button
            key={a.key}
            aria-label={a.ariaLabel}
            title={a.title || a.ariaLabel}
            onClick={a.onClick ? () => a.onClick!(row) : undefined}
            className="flex w-[3.2rem] h-[3.2rem] justify-center items-center"
          >
            <Icon />
          </button>
        );
      })}
    </div>
  );
}
