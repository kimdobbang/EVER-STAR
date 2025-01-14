import React, { useEffect, useState } from 'react';
import { BookIcons } from 'components/atoms/symbols/Book/BookIcons';
import { Toggle } from 'components/atoms/buttons/Toggle';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Lable } from 'components/atoms/texts/Lable';

export interface ViewMemorialBookProps {
  onClick: () => void;
  toggleStatus?: 'on' | 'off';
  onToggleChange?: (status: 'on' | 'off') => void;
  isActive?: boolean;
  isOpen?: boolean;
  isOwner?: boolean;
}

export const ViewMemorialBook: React.FC<ViewMemorialBookProps> = ({
  onClick,
  toggleStatus,
  onToggleChange,
  isActive = false,
  isOpen = false,
  isOwner = false,
}) => {
  const [buttonText, setButtonText] = useState<string>('');
  const [buttonTheme, setButtonTheme] = useState<'focus' | 'hover' | 'white'>(
    'focus',
  );
  const [bookVariant, setBookVariant] = useState<'book-close' | 'book-open'>(
    'book-close',
  );
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const determineButtonText = () => {
    if (!isActive) {
      return '메모리얼북이 아직 활성화되지 않았어요';
    } else if (isOwner) {
      if (toggleStatus === 'on') {
        return '메모리얼북을 모두가 볼 수 있어요';
      } else if (toggleStatus === 'off') {
        return '메모리얼북을 나만 볼 수 있어요';
      } else {
        return '메모리얼북이 아직 활성화 되지 않았어요';
      }
    } else {
      if (toggleStatus === 'on') {
        return '메모리얼북을 볼 수 있어요';
      } else if (toggleStatus === 'off') {
        return '메모리얼북은 비공개 상태에요';
      } else {
        return '메모리얼북이 아직 활성화 되지 않았어요';
      }
    }
  };

  useEffect(() => {
    // 버튼 텍스트 및 상태 업데이트
    setButtonText(determineButtonText());

    if (!isActive) {
      setIsDisabled(true);
      setButtonTheme('white');
      setBookVariant('book-close');
    } else if (isOwner) {
      setIsDisabled(false);
      setButtonTheme('focus');
      setBookVariant(toggleStatus === 'on' ? 'book-open' : 'book-close');
    } else if (!isOpen) {
      setIsDisabled(true);
      setButtonTheme('white');
      setBookVariant('book-close');
    } else {
      setIsDisabled(false);
      setButtonTheme('focus');
      setBookVariant('book-open');
    }
  }, [toggleStatus, isActive, isOwner, isOpen]);

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='mb-6'>
        <BookIcons variant={bookVariant} />
      </div>
      <PrimaryButton
        theme={buttonTheme}
        size='full'
        disabled={isDisabled}
        onClick={onClick}
        fullWidth
      >
        {buttonText}
      </PrimaryButton>

      {/* 조건에 따라 토글 버튼을 숨김 */}
      {isActive && isOwner && (
        <div className='relative z-10 flex flex-col items-center justify-center my-6'>
          <Lable prop='메모리얼북 공개 상태' show={false} font='default' />
          <div className='mt-2'>
            <Toggle status={toggleStatus || 'off'} onChange={onToggleChange} />
          </div>
        </div>
      )}
    </div>
  );
};
