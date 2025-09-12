import { useEffect, useState } from 'react';
import { teamPlay } from '../../../constants/teamPlay';
import BasicTabIn from '../InputBox/BasicTabIn/BasicTabIn';
import DropdownTab from '../InputBox/DropdownTab/DropdownTab';
import type { Introduction } from '../../../types/user';

interface DropdownBasicTabProps {
  introduction: Introduction;
  setIntroduction: React.Dispatch<React.SetStateAction<Introduction>>;
}

const DropdownBasicTab = ({ introduction, setIntroduction }: DropdownBasicTabProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(teamPlay[0]);
  const [openedCategories, setOpenedCategories] = useState<string[]>([teamPlay[0]]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 360);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 360);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setOpenedCategories([selectedCategory]);
    } else {
      setSelectedCategory(openedCategories[0] || teamPlay[0]);
    }
  }, [isMobile]);

  const getSelectedOptions = () => {
    switch (selectedCategory) {
      case '소통 스타일':
        return introduction.communication_styles;
      case '협업 성향':
        return introduction.collaboration_styles;
      case '말하는 방식':
        return introduction.work_styles;
      case '문제 해결방식':
        return introduction.problem_solving_approaches;
      case 'MBTI':
        return introduction.mbti ? [introduction.mbti] : [];
      default:
        return [];
    }
  };

const handleChange = (options: string[]) => {
  setIntroduction((prev: Introduction) => {  // ← 여기 타입 명시
    switch (selectedCategory) {
      case '소통 스타일':
        return { ...prev, communication_styles: options };
      case '협업 성향':
        return { ...prev, collaboration_styles: options };
      case '말하는 방식':
        return { ...prev, work_styles: options };
      case '문제 해결방식':
        return { ...prev, problem_solving_approaches: options };
      case 'MBTI':
        return { ...prev, mbti: options[0] || '' }; // 단일 선택
      default:
        return prev;
    }
  });
};

  return isMobile ? (
    <DropdownTab
      openedCategories={openedCategories}
      setOpenedCategories={setOpenedCategories}
      selectedOption={getSelectedOptions()}
      setSelectedOption={handleChange}
    />
  ) : (
    <BasicTabIn
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedOption={getSelectedOptions()}
      setSelectedOption={handleChange}
    />
  );
};

export default DropdownBasicTab;