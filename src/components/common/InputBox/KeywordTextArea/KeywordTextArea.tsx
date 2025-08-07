import React, { useState } from 'react';

import IconTextArea from '../IconTextArea/BaseIconTextArea';
import BaseBasicChip from '../../Chip/BasicChip/BaseBasicChip';
import KeywordChip from '../../Chip/KeywordChip/KeywordChip';

const SkillList = [
  '3D_Max',
  'Adobe_After_Effects',
  'Adobe_Illustrator',
  'Adobe_inDesign',
  'Adobe_Photoshop',
  'Adobe_Premiere',
  'Adobe_XD',
  'AWS',
  'Blender',
  'C',
  'C#',
  'C++',
  'Cinema_4D',
  'Django',
  'Docker',
  'Express',
  'Figma',
  'Firebase',
  'Flutter',
  'Git',
  'GO',
  'GraphQL',
  'Java',
  'Javascript',
  'Jest',
  'Kotlin',
  'Kubernetes',
  'meatball',
  'MongoDB',
  'MS_office',
  'MySQL',
  'Nestjs',
  'Nextjs',
  'Nodejs',
  'php',
  'Python',
  'React',
  'Spring_Boot',
  'Svelte',
  'Swift',
  'TypeScript',
  'Unity',
  'Vue',
  'Zeplin',
];

const KeywordTextArea = () => {
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleSelectKeyword = (keyword: string) => {
    if (!selectedKeywords.includes(keyword)) {
      setSelectedKeywords((prev) => [...prev, keyword]);
    }
    setInputValue('');
  };

  const handleRemove = (keyword: string) => {
    setSelectedKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const filterList = SkillList.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedKeywords.includes(s),
  );

  return (
    <div className="flex flex-col items-start self-stretch">
      <IconTextArea
        className="w-[734px] items-center"
        placeholder="프로그램 이름을 입력하세요."
        useRegex={false}
        useLengthValidation={false}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />

      {inputValue && filterList.length > 0 && (
        <div className="flex max-h-fit min-h-[64px] flex-wrap items-center self-stretch rounded-[0.8rem] border border-solid border-black-50 px-[1rem] py-[1.8rem]">
          <div className="flex flex-wrap content-center items-center gap-[1rem]">
            {filterList.map((keyword) => (
              <BaseBasicChip
                shape="square"
                size={32}
                key={keyword}
                onClick={() => handleSelectKeyword(keyword)}
              >
                {keyword}
              </BaseBasicChip>
            ))}
          </div>
        </div>
      )}

      {selectedKeywords.length > 0 && (
        <div className="mt-[18px] flex h-[30px] flex-wrap content-start items-start gap-[1rem] self-stretch">
          {selectedKeywords.map((keyword) => (
            <KeywordChip
              shape="square"
              keyword={keyword}
              key={keyword}
              onRemove={() => handleRemove(keyword)}
            >
              {keyword}
            </KeywordChip>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeywordTextArea;
