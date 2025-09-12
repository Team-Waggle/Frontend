import { useRef, useState, useEffect } from 'react';
import ArrowCircleLeftIcon from '../../assets/icons/ic_arrow_circle_left.svg?react';
import ArrowCircleRightIcon from '../../assets/icons/ic_arrow_circle_right.svg?react';
import KeywordChip from '../common/Chip/KeywordChip/KeywordChip';

interface TagScrollerProps {
  keywords: string[];
  onRemove: (label: string) => void;
}

export default function TagScroller({ keywords, onRemove }: TagScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', checkScrollPosition);
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [keywords]);

  return (
    <div className="relative flex w-[21rem] items-center sm:w-[34.8rem] md:w-[47.4rem]">
      {showLeftArrow && (
        <div className="absolute left-0 flex w-[5rem] justify-start bg-gradient-l">
          <button onClick={scrollLeft}>
            <ArrowCircleLeftIcon />
          </button>
        </div>
      )}

      <div
        ref={scrollRef}
        className="flex items-center gap-[0.4rem] overflow-x-hidden"
      >
        {keywords.map((tag, index) => (
          <KeywordChip key={index} label={tag} onRemove={() => onRemove(tag)} />
        ))}
      </div>

      {showRightArrow && (
        <div className="absolute right-0 flex w-[5rem] justify-end bg-gradient-r">
          <button onClick={scrollRight}>
            <ArrowCircleRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
