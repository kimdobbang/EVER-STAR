import React, { useState, useEffect } from 'react';
import DatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { InformationText } from 'components/atoms/texts/InformationText';
import { Lable } from 'components/atoms/texts/Lable';

export interface DateInputFieldProps {
  label: string;
  showLabel: boolean;
  showValidationText: boolean;
  starshow: boolean;
  state: 'default' | 'focus' | 'disable' | 'done' | 'error';
  className?: string;
  date: Date | null;
  placeholder?: string;
  onChange?: (date: Date | null) => void;
}

export const DateInputField: React.FC<DateInputFieldProps> = ({
  label,
  showLabel = true,
  showValidationText = true,
  starshow = true,
  state,
  className = '',
  date = null,
  placeholder,
  onChange,
}) => {
  const [inputState, setInputState] = useState(state);
  const [selectedDate, setSelectedDate] = useState<Date | null>(date);

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  const handleFocus = () => {
    setInputState('focus');
  };

  const handleBlur = () => {
    setInputState(selectedDate ? 'done' : 'default');
  };

  const handleChange = (date: Date | null) => {
    setSelectedDate(date);
    if (onChange) {
      onChange(date);
    }
    if (inputState === 'error' && date) {
      setInputState('focus');
    } else if (date) {
      setInputState('done');
    }
  };

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: ReactDatePickerCustomHeaderProps) => (
    <div className="flex items-center justify-between mb-2">
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        {'<'}
      </button>
      <select
        value={date.getFullYear()}
        onChange={({ target: { value } }) => changeYear(Number(value))}
        className="mx-2"
      >
        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        value={date.getMonth()}
        onChange={({ target: { value } }) => changeMonth(Number(value))}
        className="mx-2"
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        {'>'}
      </button>
    </div>
  );

  let validationText = '';
  if (inputState === 'error') {
    validationText = '유효한 날짜를 입력해 주세요';
  } else if (['default', 'disable', 'done', 'focus'].includes(inputState)) {
    validationText = '날짜를 입력해 주세요';
  }

  return (
    <div className={`w-80 flex flex-col items-start gap-2 relative ${className}`}>
      {showLabel && (
        <Lable className="!flex-[0_0_auto]" prop={label} show={starshow} font="default" />
      )}
      <div
        className={`flex items-center px-4 py-2 relative w-full flex-col rounded-xl gap-2 self-stretch h-14 overflow-hidden justify-center
        ${inputState === 'focus' ? 'border-[#ff9078]' : inputState === 'error' ? 'border-[#fd2929]' : ''}
        ${['default', 'done'].includes(inputState) ? 'shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]' : inputState === 'focus' ? 'shadow-[0px_0px_24px_#ff90784c]' : inputState === 'error' ? 'shadow-[0px_0px_24px_#fd292933]' : ''}
        ${inputState === 'disable' ? 'bg-[#f0f2f6]' : 'bg-white'}
        ${['error', 'focus'].includes(inputState) ? 'border-2 border-solid' : ''}`}
      >
        <div className="w-full flex self-stretch items-center gap-1 flex-[0_0_auto] relative">
          <DatePicker
            selected={selectedDate}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            dateFormat="yyyy-MM-dd"
            placeholderText={placeholder}
            className={`flex-1 ${inputState === 'disable' ? 'bg-[#f0f2f6] text-[#c3c9d3]' : 'bg-white text-black'} border-none outline-none`}
            disabled={inputState === 'disable'}
            showYearDropdown
            showMonthDropdown
            dropdownMode="select"
            portalId="root-portal"
            popperClassName="custom-datepicker-popper"
            renderCustomHeader={renderCustomHeader} // 커스텀 헤더 추가
          />
        </div>
      </div>
      {showValidationText && (
        <InformationText
          className={inputState === 'error' ? '!flex-[0_0_auto]' : ''}
          state={inputState === 'error' ? 'error' : 'default'}
        >
          {validationText}
        </InformationText>
      )}
    </div>
  );
};
