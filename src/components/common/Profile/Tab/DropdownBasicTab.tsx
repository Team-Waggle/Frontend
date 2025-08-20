import { useEffect, useState } from 'react';
import { teamPlay } from '../../../../constants/teamPlay';
import BasicTabIn from '../../InputBox/BasicTabIn/BasicTabIn';
import DropdownTab from '../../InputBox/DropdownTab/DropdownTab';

const DropdownBasicTab = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(teamPlay[0]);
  const [openedCategories, setOpenedCategories] = useState<string[]>([teamPlay[0]]);
  const [selectedOption, setSelectedOption] = useState<string[]>([]);
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

  return isMobile ? (
    <DropdownTab
      openedCategories={openedCategories}
      setOpenedCategories={setOpenedCategories}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  ) : (
    <BasicTabIn
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
    />
  );
};

export default DropdownBasicTab;
