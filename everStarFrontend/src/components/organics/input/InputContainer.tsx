import React, { useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

export interface InputContainerProps {
  headerText: string;
  letterCardType?: 'default' | 'send' | 'receive';
  letterCardColor?: 'white' | 'bgorange' | 'orange' | 'gray';
  letterCardState?: 'received' | 'notReceived';
  petName?: string;
  myName?: string;
  letterCardMessage?: string;
  myMessage?: string;
  letterCardClassName?: string;
  centered?: boolean;
  customText?: string; // 커스텀 텍스트 속성 추가
  dateTime?: string;
  textboxLabel: string;
  largeButtonText: string;
  smallButtonText: string;
  showPrimaryButton?: boolean;
  isRtc?: boolean;
  handleRtcPuzzleClick?: () => void;
  rtcPuzzleText?: string;
  onLeftIconClick?: () => void; // 추가된 속성
  primaryButtonDisabled?: boolean;
  ghostText?: string;
  onImageChange?: (image: string) => void;
  selectedImage?: string;
  onButtonClick?: () => void;
  onButtonClick2?: () => void;
  onTextChange?: (text: string) => void;
  value?: string;
  handleReplyClick?: () => void;
  handleSmallButtonDisabled?: boolean;
  className?: string;
}

export const InputContainer: React.FC<InputContainerProps> = ({
  headerText,
  letterCardType,
  letterCardColor = 'white', // 기본값 설정
  letterCardState = 'notReceived', // 기본값 설정
  letterCardMessage,
  myName,
  petName,
  myMessage,
  letterCardClassName = 'font-body !kor-subtitle-subtitle3', // 여기서 폰트 변경
  centered = true,
  customText = '', // 기본값 설정
  textboxLabel = '',
  largeButtonText,
  smallButtonText,
  dateTime,
  showPrimaryButton = true,
  isRtc = false,
  handleRtcPuzzleClick,
  rtcPuzzleText,
  onLeftIconClick, // 추가된 속성
  primaryButtonDisabled = false,
  ghostText,
  onTextChange,
  onButtonClick,
  onButtonClick2,
  handleReplyClick,
  handleSmallButtonDisabled = false,
  className = 'flex justify-center p-6',
}) => {
  const [text, setText] = useState('');

  const handleTextChange = (text: string) => {
    setText(text);
    if (onTextChange) onTextChange(text);
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  const handleButtonClick2 = () => {
    if (onButtonClick2) {
      onButtonClick2();
    }
  };

  return (
    <div className={className}>
      <div
        className='flex flex-col items-center w-full max-w-md gap-5 bg-white rounded-lg shadow-md p-9'
        style={{ maxHeight: '1156px', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <ModalHeader
          text={headerText}
          showLeftIcon={true}
          onLeftIconClick={onLeftIconClick}
        />

        {/* Content */}
        <div className='flex flex-col items-center w-full gap-8'>
          <div className='flex flex-col items-center w-full'>
            {/* Letter Card or Custom Text */}
            {letterCardType ? (
              <LetterCard
                name={myName ? `${myName}에게` : undefined}
                type='send'
                color={
                  letterCardType === 'receive' ? 'bgorange' : letterCardColor
                }
                state={letterCardState}
                message={letterCardMessage}
                className={letterCardClassName}
                centered={centered}
                dateTime={dateTime}
              />
            ) : (
              <div className='w-full'>
                <div
                  className="p-5 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
                  dangerouslySetInnerHTML={{ __html: customText }}
                />
              </div>
            )}
          </div>
          <div className='flex flex-col items-center w-full'>
            {isRtc && (
              <PrimaryButton
                theme='white'
                size='large'
                disabled={false}
                icon={null}
                onClick={handleRtcPuzzleClick}
              >
                {rtcPuzzleText}
              </PrimaryButton>
            )}
          </div>
          <div className='flex w-full'>
            {letterCardType === 'receive' ? (
              <div className='flex flex-col justify-center'>
                <LetterCard
                  name={`${petName}에게`}
                  type='receive'
                  color='white'
                  state={letterCardState}
                  message={myMessage}
                  className={letterCardClassName}
                  dateTime={dateTime}
                  centered={centered}
                />
                <div className='mt-4'>
                  <PrimaryButton
                    theme='white'
                    size='large'
                    disabled={primaryButtonDisabled}
                    onClick={handleReplyClick}
                  >
                    답장하기
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center w-full'>
                {/* Textbox */}
                <Textbox
                  type='large'
                  className=''
                  label={textboxLabel}
                  showStar={false}
                  ghostText={ghostText}
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                />

                {/* Large Primary Button */}
                {showPrimaryButton && (
                  <div className='flex justify-center w-full'>
                    <PrimaryButton
                      theme='white'
                      size='large'
                      onClick={handleButtonClick2}
                      disabled={false}
                      icon={null}
                    >
                      {largeButtonText}
                    </PrimaryButton>
                  </div>
                )}

                {/* Small Primary Button */}
                <div className='flex justify-end mt-8 w-80'>
                  <PrimaryButton
                    theme='white'
                    size='small'
                    onClick={handleButtonClick}
                    disabled={handleSmallButtonDisabled}
                    icon={null}
                  >
                    {smallButtonText}
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
