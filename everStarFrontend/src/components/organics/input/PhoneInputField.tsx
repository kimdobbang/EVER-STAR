import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { InformationText } from 'components/atoms/texts/InformationText';
import { Lable } from 'components/atoms/texts/Lable';
import { CheckIcon } from 'components/atoms/icons/Check/CheckIcon';

interface PhoneInputFieldProps {
  label: string;
  showLabel: boolean;
  showValidationText: boolean;
  starshow: boolean;
  state: 'default' | 'focus' | 'disable' | 'done' | 'error';
  className?: string;
  text: string;
  showCheckIcon: boolean;
  placeholder?: string;
  readOnlyState?: boolean;
  onChange?: (value: string) => void;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  label,
  showLabel = true,
  showValidationText = true,
  starshow = true,
  state,
  className = '',
  text = '',
  showCheckIcon = false,
  placeholder,
  readOnlyState,
  onChange,
}) => {
  const [inputState, setInputState] = useState(state);
  const [inputText, setInputText] = useState(text);

  const handleFocus = () => {
    setInputState('focus');
  };

  const handleBlur = () => {
    setInputState(inputText.length > 0 ? 'done' : 'default');
  };

  const handleChange = (value: string) => {
    setInputText(value);
    if (onChange) {
      onChange(value);
    }

    if (inputState === 'error' && value.length > 0) {
      setInputState('focus');
    } else if (value.length > 0) {
      setInputState('done');
    }
  };

  let validationText = '';
  if (inputState === 'error') {
    validationText = '전화번호가 잘못되었습니다';
  } else if (['default', 'disable', 'done', 'focus'].includes(inputState)) {
    validationText = '전화번호를 입력해 주세요';
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
          <PhoneInput
            country={'kr'}
            onlyCountries={['kr']}
            value={inputText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            inputProps={{
              readOnly: readOnlyState,
              disabled: inputState === 'disable',
              placeholder: placeholder,
            }}
            containerClass={`flex-1 ${inputState === 'disable' ? 'bg-[#f0f2f6] text-[#c3c9d3]' : 'bg-white text-black'} border-none outline-none`}
            buttonClass="!hidden" // 국가 선택 버튼 숨기기
            inputClass="!w-full !border-none !outline-none !shadow-none !pl-0" // 국가번호 숨기기 위해 padding 조정
          />
          {showCheckIcon && (
            <CheckIcon size={24} color={inputState === 'done' ? 'orange' : 'gray'} />
          )}
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

PhoneInputField.propTypes = {
  label: PropTypes.string.isRequired,
  showLabel: PropTypes.bool.isRequired,
  showValidationText: PropTypes.bool.isRequired,
  starshow: PropTypes.bool.isRequired,
  state: PropTypes.oneOf(['default', 'focus', 'disable', 'done', 'error'])
    .isRequired as PropTypes.Validator<'default' | 'focus' | 'disable' | 'done' | 'error'>,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  showCheckIcon: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export type { PhoneInputFieldProps };
