// DropdownBasicTab.tsx
import { useEffect, useState } from 'react';
import { teamPlay } from '../../../../constants/teamPlay';
import BasicTabIn from '../../InputBox/BasicTabIn/BasicTabIn';
import DropdownTab from '../../InputBox/DropdownTab/DropdownTab';

const DropdownBasicTab = () => {
  const [openedCategories, setOpenedCategories] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 360);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 360);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <DropdownTab
      openedCategories={openedCategories}
      setOpenedCategories={setOpenedCategories}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  ) : (
    <BasicTabIn
      selectedCategory={openedCategories[0] || teamPlay[0]}
      setSelectedCategory={(label) => setOpenedCategories([label])}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
};

export default DropdownBasicTab;
