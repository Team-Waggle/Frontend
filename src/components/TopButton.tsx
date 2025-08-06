import { useEffect, useState } from 'react';
import TopBtn from '../assets/icons/ic_topbtn_up.svg?react';

const TopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 위치에 따라 버튼 표시 여부 설정
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 스크롤 맨 위로
  const scrollToTop = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div
      onClick={scrollToTop}
      className={`fixed bottom-[4.4rem] right-[4.4rem] cursor-pointer ${isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      aria-label="Scroll to top"
    >
      <TopBtn />
    </div>
  );
};

export default TopButton;
