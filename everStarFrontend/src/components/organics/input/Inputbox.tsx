import PropTypes from 'prop-types';
import React from 'react';
import { Lable } from '../../atoms/icons/inputfiled/Lable';
import { InformationText } from '../../atoms/icons/inputfiled/InformationText';
import { Placeholder } from '../../molecules/input/Placeholder';
import './Inputbox.css';

interface InputBoxProps {
  showLable: boolean;
  showValidationText: boolean;
  property1: 'variant-2' | 'default';
  className: string;
  buttonTextProp: string; // Placeholder에서 사용할 buttonText의 prop 속성
  colorBlackColor: string; // Placeholder에서 사용할 color 속성
}

export const InputBox = ({
  showLable = true,
  showValidationText = true,
  property1,
  className,
  buttonTextProp,
  colorBlackColor,
}: InputBoxProps): JSX.Element => {
  return (
    <div
      className={`inline-flex flex-col items-start gap-2 relative ${className}`}
    >
      {showLable && (
        <Lable className='!flex-[0_0_auto]' show font='default' prop='레이블' />
      )}

      {property1 === 'default' && (
        <>
          <div className='flex flex-col w-80 h-14 items-start justify-center gap-2 px-4 py-2 relative bg-white rounded-xl overflow-hidden shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]'>
            <Placeholder
              showLeftIcon={true}
              state='focus'
              className='!self-stretch !flex-[0_0_auto] !w-full'
              prop={buttonTextProp}
              size='large'
              color='black'
              divClassName={`!text-[${colorBlackColor}] !flex-1 !text-align:unset !w-[unset]`}
              show
              showIcon
            />
          </div>
          {showValidationText && (
            <InformationText
              className='!flex-[0_0_auto]'
              state='default'
              text='비밀번호를 입력해 주세요'
            />
          )}
        </>
      )}

      {property1 === 'variant-2' && (
        <div className='inline-flex flex-col items-start gap-1 relative flex-[0_0_auto]'>
          <div className='inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]'>
            <div className='inline-flex flex-col h-14 items-start justify-center gap-2 px-4 py-2 relative bg-white rounded-xl overflow-hidden shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99]'>
              <Placeholder
                showLeftIcon={true}
                state='focus'
                className='!flex-[0_0_auto]'
                prop={buttonTextProp}
                size='large'
                color='black'
                divClassName={`!text-[${colorBlackColor}]`}
                show
                showIcon
              />
            </div>
            <InformationText
              className='!flex-[0_0_auto]'
              state='default'
              text='비밀번호를 입력해 주세요'
            />
          </div>
        </div>
      )}
    </div>
  );
};

InputBox.propTypes = {
  showLable: PropTypes.bool,
  showValidationText: PropTypes.bool,
  property1: PropTypes.oneOf(['variant-2', 'default']),
};

export type { InputBoxProps };
