import { useMemo, useState } from 'react';
import SearchIcon from '../../assets/icons/ic_searchbar_gray_small.svg?react';

type ProfileSearchBarProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function ProfileSearchBar({
  value,
  defaultValue = '',
  onChange,
  onSearch,
  placeholder = '검색어를 입력해주세요.',
  className = '',
}: ProfileSearchBarProps) {
  const isControlled = useMemo(() => value !== undefined, [value]);
  const [inner, setInner] = useState<string>(defaultValue);
  const cur = isControlled ? (value as string) : inner;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    if (!isControlled) setInner(next);
    onChange?.(next);
  };

  const triggerSearch = () => onSearch?.(cur);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') triggerSearch();
  };

  return (
    <div
      className={
        'flex w-[19rem] max-w-[19rem] items-center gap-[0.6rem] rounded-[0.4rem] border border-solid border-black-50 pl-[1.2rem] pr-[0.8rem] ' +
        className
      }
    >
      <input
        className="h-[2.8rem] w-[14.4rem] text-caption-12_M500 text-black-130 placeholder-black-70"
        type="text"
        placeholder={placeholder}
        value={cur}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        aria-label="검색어 입력"
      />
      <button
        type="button"
        className="flex h-[2rem] w-[2rem] items-center justify-center"
        onClick={triggerSearch}
        aria-label="검색"
        title="검색"
      >
        <SearchIcon />
      </button>
    </div>
  );
}
