import React, { useState } from 'react';

import IconTextArea from '../IconTextArea/BaseIconTextArea';
import BaseBasicChip from '../../Chip/BasicChip/BaseBasicChip';
import KeywordChip from '../../Chip/KeywordChip/KeywordChip';

// KeywordTextArea

/**
 * value: 현재 선택된 키워드 ID 배열
 * items: 선택 가능한 키워드 목록 { id: string, label: string } 형태
 * placeholder: 입력창 플레이스홀더
 * renderChip: 기본 Chip 대신 다른 Chip 사용 가능
 */

interface KeywordItem {
  id: string;
  label: string;
}

interface KeywordTextAreaProps {
  value: string[];
  onChange: (ids: string[]) => void;
  items: KeywordItem[];
  placeholder?: string;
  renderChip?: (item: KeywordItem, onRemove: () => void) => React.ReactNode;
}

const KeywordTextArea = ({
  value,
  onChange,
  items,
  placeholder = '',
  renderChip,
}: KeywordTextAreaProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (item: KeywordItem) => {
    onChange([...value, item.id]);
    setInputValue('');
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  const filterList = items.filter(
    (item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase()) &&
      !value.includes(item.id),
  );

  return (
    <div className="flex flex-col items-start self-stretch">
      <IconTextArea
        className="w-[734px] items-center"
        placeholder={placeholder}
        value={inputValue}
        useRegex={false}
        useLengthValidation={false}
        onChange={(e) => setInputValue(e.target.value)}
        showIcon
      />

      {inputValue && filterList.length > 0 && (
        <div className="flex max-h-fit min-h-[64px] flex-wrap items-center self-stretch rounded-[0.8rem] border border-solid border-black-50 px-[1rem] py-[1.8rem]">
          <div className="flex flex-wrap content-center items-center gap-[1rem]">
            {filterList.map((item) => (
              <BaseBasicChip
                shape="square"
                size={32}
                key={item.id}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </BaseBasicChip>
            ))}
          </div>
        </div>
      )}

      {value.length > 0 &&
        value.some((id) => items.find((i) => i.id === id)) && (
          <div className="mt-[18px] flex h-[30px] flex-wrap content-start items-start gap-[1rem] self-stretch">
            {value.map((id) => {
              const item = items.find((i) => i.id === id);
              if (!item) return null;
              return renderChip ? (
                renderChip(item, () => handleRemove(item.id))
              ) : (
                <KeywordChip
                  key={item.id}
                  shape="circle"
                  label={item.label}
                  onRemove={() => handleRemove(item.id)}
                />
              );
            })}
          </div>
        )}
    </div>
  );
};

export default KeywordTextArea;