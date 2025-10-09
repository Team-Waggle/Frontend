import SymbolIcon from '../../../assets/icons/ic_symbol_circle.svg?react';
import SearchIcon from '../../../assets/icons/ic_searchbar_blue_large.svg?react';
import { ChangeEvent, KeyboardEvent } from 'react';

interface MainSearchBarProps {
  keyword: string;
  setKeyword: (value: string) => void;
  onSearch: () => void;
}

const MainSearchBar = ({
  keyword,
  setKeyword,
  onSearch,
}: MainSearchBarProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="box-border flex h-[6rem] w-full min-w-[31.8rem] max-w-[58.2rem] items-center justify-between border-b-[0.3rem] border-solid border-primary-70 px-[0.4rem] md:w-[58.2rem]">
      <div className="my-[1.4rem] flex h-[3.2rem] gap-[1rem]">
        <SymbolIcon />
        <input
          className="h-[2.7rem] w-[22.6rem] border-none p-0 px-[1.8rem] text-title-18_Sb600 text-black-130 placeholder-black-60 outline-0 sm:w-[36.4rem] md:w-[48.8rem]"
          type="text"
          placeholder="검색어를 입력해주세요."
          value={keyword}
          onChange={handleChange}
          onKeyDown={handleKeydown}
        />
      </div>
      <button
        onClick={() => onSearch()}
        className="flex h-[4.4rem] w-[4.4rem] items-center justify-center"
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default MainSearchBar;
