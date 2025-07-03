import SearchIcon from '../../../assets/icons/ic_searchbar_gray_small.svg?react';

const BasicSearchBar = () => {
  return (
    <div className="flex w-[19rem] max-w-[19rem] items-center gap-[0.6rem] rounded-[0.4rem] border border-solid border-black-50 pl-[1.2rem] pr-[0.8rem]">
      <input
        className="h-[2.8rem] w-[14.4rem] text-caption-12_M500 text-black-130 placeholder-black-70"
        type="text"
        placeholder="검색어를 입력해주세요."
      />
      <div className="flex h-[2rem] w-[2rem] items-center justify-center">
        <SearchIcon />
      </div>
    </div>
  );
};

export default BasicSearchBar;
