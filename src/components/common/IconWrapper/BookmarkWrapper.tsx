import BookmarkIcon from '../../../assets/icons/nav/ic_nav_bookmark_small.svg?react';

interface BookmarkWrapperProps {
  isActive?: boolean;
  disabled?: boolean;
}

const BookmarkWrapper = ({ isActive, disabled }: BookmarkWrapperProps) => {
  return (
    <div
      className={`flex h-[2.4rem] w-[2.4rem] items-center justify-center ${
        disabled ? '' : 'cursor-pointer hover:bg-black-40'
      }`}
    >
      <BookmarkIcon
        className={
          disabled
            ? 'text-black-60'
            : isActive
              ? 'text-primary'
              : 'fill-transparent stroke-black-60'
        }
      />
    </div>
  );
};

export default BookmarkWrapper;
