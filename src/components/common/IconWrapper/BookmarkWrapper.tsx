import { MouseEvent, useState } from 'react';
import { usePostBookmarkQuery } from '../../../hooks/useBookmark';
import BookmarkIcon from '../../../assets/icons/nav/ic_nav_bookmark_small.svg?react';
import { useAccessTokenStore } from '../../../stores/authStore';
import LoginSuggestionModal from '../../Modal/LoginSuggestionModal';

interface BookmarkWrapperProps {
  projectId: number;
  isBookmarked?: boolean;
  disabled?: boolean;
}

const BookmarkWrapper = ({
  projectId,
  isBookmarked,
  disabled,
}: BookmarkWrapperProps) => {
  const updateBookmark = usePostBookmarkQuery();
  const [isActive, setIsActive] = useState(isBookmarked);
  const [isLoginSuggestionModalOpen, setIsLoginSuggestionModalOpen] =
    useState(false);

  const token = useAccessTokenStore.getState().accessToken;

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    if (!token) {
      setIsLoginSuggestionModalOpen(true);
      return;
    }
    updateBookmark.mutate(projectId);
    setIsActive((prev) => !prev);
  };

  return (
    <div
      className={`flex h-[2.4rem] w-[2.4rem] items-center justify-center ${
        disabled ? '' : 'cursor-pointer hover:bg-black-40'
      }`}
    >
      <BookmarkIcon
        onClick={handleClick}
        className={
          disabled
            ? isActive
              ? 'fill-primary stroke-transparent opacity-30' // 마감 O 북마크 O
              : 'fill-transparent stroke-black-70 opacity-30' // 마감 O 북마크 X
            : isActive
              ? 'fill-primary stroke-transparent' // 마감 X 북마크 O
              : 'fill-transparent stroke-black-70' // 마감 X 북마크 X
        }
      />
      <LoginSuggestionModal
        size="large"
        isOpen={isLoginSuggestionModalOpen}
        onClose={(e: MouseEvent) => {
          e.stopPropagation();
          setIsLoginSuggestionModalOpen(false);
        }}
      />
    </div>
  );
};

export default BookmarkWrapper;
