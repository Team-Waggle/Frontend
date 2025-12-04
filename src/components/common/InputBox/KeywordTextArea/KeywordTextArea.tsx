import React, { useState, useEffect, useMemo } from 'react';

import IconTextArea from '../IconTextArea/BaseIconTextArea';
import BaseBasicChip from '../../Chip/BasicChip/BaseBasicChip';
import KeywordChip from '../../Chip/KeywordChip/KeywordChip';
import { useDebouncedValue } from '../../../../hooks/useDebounced';

// KeywordTextArea

/**
 * value: 현재 선택된 키워드 ID 배열
 * items: 선택 가능한 키워드 목록 { id: string, label: string } 형태
 * placeholder: 입력창 플레이스홀더
 * renderChip: 기본 Chip 대신 다른 Chip 사용 가능
 * onSearchChange: API 호출용
 * useDebounce: true / false. 기본값: false. (true시 디바운스 사용. SkillField에서 사용하는 KeywordTextArea와 겹쳐 추가해두었습니다.)
 * debounceDelay: 디바운스 지연 시간 (ms). 기본값: 300(ms)
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
  onSearchChange?: (keyword: string) => void;
  useDebounce?: boolean;
  debounceDelay?: number;
}

const KeywordTextArea = ({
  value,
  onChange,
  items,
  placeholder = '',
  renderChip,
  onSearchChange,
  useDebounce = false,
  debounceDelay = 300,
}: KeywordTextAreaProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleSelect = (item: KeywordItem) => {
    onChange([...value, item.id]);
    setInputValue('');
  };

  const handleRemove = (id: string) => {
    onChange(value.filter((v) => v !== id));
  };

  const filterList = useMemo(
    () =>
      items.filter(
        (item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase()) &&
          !value.includes(item.id),
      ),
    [items, inputValue, value],
  );

  const effectiveKeyword = useDebouncedValue(
    inputValue,
    debounceDelay,
    useDebounce && !!onSearchChange,
  );

  useEffect(() => {
    if (!onSearchChange) return;
    onSearchChange(effectiveKeyword);
  }, [effectiveKeyword, onSearchChange]);

  return (
    <div className="flex flex-col items-start self-stretch">
      <IconTextArea
        className="w-[32rem] items-center sm:w-[62rem] md:w-[73.4rem]"
        placeholder={placeholder}
        value={inputValue}
        useRegex={false}
        useLengthValidation={false}
        onChange={(e) => setInputValue(e.target.value)}
        showIcon
      />

      {inputValue && filterList.length > 0 && (
        <div className="flex flex-wrap items-center self-stretch rounded-[0.8rem] border border-solid border-black-50 px-[1rem] py-[1.8rem]">
          <div className="flex flex-wrap gap-[1rem]">
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
          <div className="mt-[1.8rem] flex flex-wrap content-start items-start gap-[1rem] self-stretch">
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
