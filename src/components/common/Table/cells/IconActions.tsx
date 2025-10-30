import React, { useMemo } from 'react';
import type { CellCtx } from '../../../../types/table';

import bookmarkIc from '../../../../assets/icons/profile/ic_bookmark.svg?react';
import emailIc from '../../../../assets/icons/profile/ic_email.svg?react';
import linkIc from '../../../../assets/icons/profile/ic_link.svg?react';
import deleteIc from '../../../../assets/icons/profile/ic_trashcan.svg?react';
import checkGreyIc from '../../../../assets/icons/profile/ic_check_grey.svg?react';
import checkGreenIc from '../../../../assets/icons/profile/ic_check_green.svg?react';
import editIc from '../../../../assets/icons/profile/ic_edit.svg?react';
import arrowIc from '../../../../assets/icons/ic_arrow_down_large.svg?react';

import { useProjectsDeleteQuery } from '../../../../hooks/useProjectPost';

export type IconSVG = React.FC<React.SVGProps<SVGSVGElement>>;

export type PresetKey =
  | 'bookmark'
  | 'email'
  | 'link'
  | 'delete'
  | 'check'
  | 'edit'
  | 'arrow';

export type IconAction<T> = {
  key: string;
  icon: IconSVG;
  ariaLabel: string;
  title?: string;
  onClick?: (row: T) => void;
  canDelete?: boolean;
};

export type IconActionsMeta<T> = {
  actions?: IconAction<T>[];
  preset?: PresetKey[];
  presetIcons?: Partial<Record<PresetKey, IconSVG>>;
  canDeleteAll?: boolean;
  deleteConfirmText?: string;
  getId?: (row: T) => number | string;
  confirmWithModal?: boolean;
};

const PRESET_TEXT: Record<PresetKey, { label: string; title: string }> = {
  bookmark: { label: 'bookmark', title: '북마크' },
  email: { label: 'email', title: '이메일' },
  link: { label: 'link', title: '링크' },
  delete: { label: 'delete', title: '삭제' },
  check: { label: 'check', title: '확인' },
  edit: { label: 'edit', title: '수정' },
  arrow: { label: 'arrow', title: '이동' },
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
    canDeleteAll = true,
    deleteConfirmText = '정말 삭제하시겠습니까?',
    getId,
    confirmWithModal = false,
  } = (column.meta || {}) as IconActionsMeta<T>;

  const fromPreset = useMemo(() => {
    return (preset || [])
      .map<IconAction<T> | null>((k) => {
        const Icon = (presetIcons?.[k] ?? DEFAULT_PRESET_ICONS[k]) as
          | IconSVG
          | undefined;
        if (!Icon) return null;
        const t = PRESET_TEXT[k];
        return { key: k, icon: Icon, ariaLabel: t.label, title: t.title };
      })
      .filter(Boolean) as IconAction<T>[];
  }, [preset, presetIcons]);

  const list = (actions && actions.length ? actions : fromPreset) || [];
  if (!list.length) return null;

  const { mutate: deleteMutate, isPending } = useProjectsDeleteQuery();

  const renderList = useMemo(() => {
    return list.map((a) => {
      if (a.key !== 'delete' || a.onClick) return a;
      const injected: IconAction<T> = {
        ...a,
        onClick: (r: T) => {
          if (a.canDelete === false || !canDeleteAll) return;
          const rawId = getId ? getId(r) : (r as any)?.id;
          const numId =
            typeof rawId === 'number' && Number.isFinite(rawId)
              ? Math.trunc(rawId)
              : typeof rawId === 'string' && /^\d+$/.test(rawId.trim())
                ? parseInt(rawId, 10)
                : NaN;
          if (Number.isNaN(numId)) {
            alert('유효한 숫자 ID가 아닙니다.');
            return;
          }

          if (confirmWithModal) {
            window.dispatchEvent(
              new CustomEvent('post:delete:open', { detail: { id: numId, row: r } })
            );
            return;
          }

          if (!confirm(deleteConfirmText)) return;
          deleteMutate(numId);
        },
      };
      return injected;
    });
  }, [list, canDeleteAll, deleteConfirmText, confirmWithModal, deleteMutate, getId]);

  return (
    <div className="flex items-center justify-center gap-[1rem]">
      {renderList.map((a) => {
        const Icon = a.icon;
        const isDelete = a.key === 'delete';
        const disabled =
          (isDelete && (a.canDelete === false || !canDeleteAll)) || isPending;

        return (
          <button
            key={a.key}
            aria-label={a.ariaLabel}
            title={a.title || a.ariaLabel}
            onClick={disabled || !a.onClick ? undefined : () => a.onClick!(row)}
            className={`flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded ${disabled ? 'pointer-events-none opacity-50' : 'hover:bg-black-10'}`}
            type="button"
          >
            <div className='h-[3.2rem] w-[3.2rem] flex items-center justify-center rounded-[6px] hover:bg-black-40'>
              <Icon />
            </div>
          </button>
        );
      })}
    </div>
  );
}
