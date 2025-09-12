import ArrowLeftIcon from '../../../assets/icons/ic_arrow_left_large.svg?react';
import ArrowRightIcon from '../../../assets/icons/ic_arrow_right_large.svg?react';
import PaginationButton from '../Button/PaginationButton';

interface PaginationProps {
  currentPage: number; // 0-based
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const blockSize = 10;

  const renderPageItems = () => {
    const pages: number[] = [];
    const start = Math.floor(currentPage / blockSize) * blockSize;
    const end = Math.min(start + blockSize - 1, totalPages - 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
      <PaginationButton
        key={page}
        active={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page + 1}
      </PaginationButton>
    ));
  };

  const prevBlockStart =
    Math.floor(currentPage / blockSize) * blockSize - blockSize;
  const nextBlockStart =
    Math.floor(currentPage / blockSize) * blockSize + blockSize;

  const isPrevDisabled = prevBlockStart < 0;
  const isNextDisabled = nextBlockStart >= totalPages;

  return (
    <div className="mb-[3.2rem] mt-[4rem] flex h-[4rem] items-center justify-between">
      <div
        className={`flex h-[4rem] w-[6.6rem] items-center gap-[0.2rem] pl-[0.4rem] pr-[0.8rem] ${isPrevDisabled ? '' : 'cursor-pointer'} `}
        onClick={() =>
          !isPrevDisabled && onPageChange(Math.max(currentPage - blockSize, 0))
        }
      >
        <ArrowLeftIcon
          className={`${isPrevDisabled ? 'text-black-70' : 'text-black-90'}`}
        />
        <span
          className={`text-subtitle-18_R400 ${isPrevDisabled ? 'text-black-70' : 'text-black-90'}`}
        >
          이전
        </span>
      </div>
      <div className="flex h-full items-center gap-[0.4rem] overflow-x-auto">
        {renderPageItems()}
      </div>
      <div
        className={`flex h-[4rem] w-[6.6rem] items-center gap-[0.2rem] pl-[0.8rem] pr-[0.4rem] ${isNextDisabled ? '' : 'cursor-pointer'}`}
        onClick={() =>
          !isNextDisabled &&
          onPageChange(Math.min(currentPage + blockSize, totalPages - 1))
        }
      >
        <span
          className={`text-subtitle-18_R400 ${isNextDisabled ? 'text-black-70' : 'text-black-90'}`}
        >
          다음
        </span>
        <ArrowRightIcon
          className={`${isNextDisabled ? 'text-black-70' : 'text-black-90'}`}
        />
      </div>
    </div>
  );
};

export default Pagination;
