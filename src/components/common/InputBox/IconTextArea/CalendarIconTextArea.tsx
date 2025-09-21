import React, { useRef, useState } from 'react';
import Calendar from 'react-calendar';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import { DefaultTextAreaState } from '../../../../types/IconTextArea';
import CalendarIcon from '../../../../assets/icons/ic_calendar.svg?react';
import LeftBtnIcon from '../../../../assets/button/btn_left.svg?react';
import RightBtnIcon from '../../../../assets/button/btn_right.svg?react';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarIconTextArea = ({
  value,
  onChange,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  const [hasError, setHasError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<ValuePiece>(null);

  const textAreaRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(textAreaRef, () => setIsOpen(false));

  const ICON_TEXT_AREA_STYLES: Record<DefaultTextAreaState, string> = {
    default: 'border-black-60 text-black-70 bg-black-10',
    typing: 'border-primary text-black-130 bg-black-10',
    complete: 'border-black-60 text-black-130 bg-black-10',
    error: 'border-red-500 text-black-70 bg-black-10',
  };

  // YYYY-MM-DD 포맷 변환
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // YYYY-MM-DD 형식 + 실제 날짜 유효성 검사
  const isValidDate = (val: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(val)) return false;

    const [year, month, day] = val.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);

      const formatted = formatDate(value);
      setInputValue(formatted);
      setHasError(false);

      onChange?.({
        target: { value: formatted },
      } as React.ChangeEvent<HTMLInputElement>);

      setIsOpen(false);
    } else {
      setSelectedDate(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setInputValue(newVal);
    onChange?.(e);

    if (newVal.length === 0) {
      setHasError(false);
      setSelectedDate(null);
    } else if (isValidDate(newVal)) {
      const [year, month, day] = newVal.split('-').map(Number);
      const newDate = new Date(year, month - 1, day);

      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간 제거

      if (newDate < today) {
        // 오늘 이전 날짜면 에러
        setSelectedDate(null);
        setHasError(true);
      } else {
        setSelectedDate(newDate);
        setHasError(false);
      }
    } else {
      setSelectedDate(null);
      setHasError(true);
    }
  };

  const getCurrentState = (): DefaultTextAreaState => {
    if (hasError) return 'error';
    if (isFocused) return 'typing';
    if (inputValue.toString().length > 0) return 'complete';
    return 'default';
  };

  const currentState = getCurrentState();
  const styleByState = ICON_TEXT_AREA_STYLES[currentState];

  return (
    <div
      className={`relative flex h-[4.6rem] w-[35.8rem] items-center rounded-[0.8rem] border border-solid pl-[1.8rem] pr-[0.8rem] ${styleByState}`}
      ref={textAreaRef}
    >
      <input
        className="w-[30rem] bg-transparent text-body-16_M500"
        type="text"
        placeholder="년-월-일"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...rest}
      />
      <button
        type="button"
        className="flex h-[3.2rem] w-[3.2rem] items-center justify-center"
      >
        <CalendarIcon onClick={() => setIsOpen((prev) => !prev)} />
      </button>
      {isOpen && (
        <div className="absolute left-[-0.1rem] top-[5.6rem] z-10 h-[42rem] w-[35.8rem] rounded-[0.8rem] border border-solid border-black-40 bg-black-10 px-[3.3rem] shadow-dropbox">
          <Calendar
            className="custom-calendar"
            calendarType="gregory"
            prev2Label={null}
            next2Label={null}
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()}
            formatMonthYear={(locale, date) => {
              const year = date.getFullYear();
              const month = date.getMonth() + 1;
              const formattedMonth = month < 10 ? `0${month}` : `${month}`;

              return `${year}.${formattedMonth}`;
            }}
            formatDay={(locale, date) => `${date.getDate()}`}
            tileClassName={({ date }) =>
              selectedDate &&
              date.toDateString() === selectedDate.toDateString()
                ? 'bg-primary text-white rounded-full'
                : undefined
            }
            prevLabel={<LeftBtnIcon />}
            nextLabel={<RightBtnIcon />}
            // navigation__label 클릭해도 기능 못하게 막기
            minDetail="month"
            maxDetail="month"
            defaultView="month"
          />
        </div>
      )}
    </div>
  );
};

export default CalendarIconTextArea;
