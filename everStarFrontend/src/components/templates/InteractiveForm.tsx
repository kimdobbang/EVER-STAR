import React from 'react';
import { InputContainer, InputContainerProps } from 'components/organics/input/InputContainer';
import { Glass } from 'components/molecules/Glass/Glass';

interface InteractiveFormProps extends InputContainerProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  customText?: string; // 커스텀 텍스트 속성 추가
  onLeftIconClick?: () => void; // 추가된 속성
  primaryButtonDisabled?: boolean;
  ghostText?: string;
  onButtonClick?: () => void;
  onButtonClick2?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleReplyClick?: () => void;
  isRtc?: boolean;
  handleRtcPuzzleClick?: () => void;
  rtcPuzzleText?: string;
  handleSmallButtonDisabled?: boolean;
  glassEffect?: boolean;
  className?: string;
}

export const InteractiveForm: React.FC<InteractiveFormProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  headerText,
  letterCardType,
  letterCardColor,
  letterCardState,
  letterCardMessage,
  letterCardClassName,
  centered,
  textboxLabel,
  largeButtonText,
  smallButtonText,
  showPrimaryButton,
  customText, // 커스텀 텍스트 속성 추가
  petName,
  myName,
  myMessage,
  dateTime,
  onLeftIconClick, // 추가된 속성
  primaryButtonDisabled = false,
  ghostText,
  onButtonClick,
  onButtonClick2,
  value = '',
  onTextChange,
  handleReplyClick,
  isRtc,
  handleRtcPuzzleClick,
  handleSmallButtonDisabled,
  glassEffect,
  className,
  rtcPuzzleText,
}) => {
  // const [image, setImage] = useState<string | null>(selectedImage || null);

  // Override headerText and letterCardMessage for this specific component
  const customHeaderText = headerText;
  const customLetterCardMessage = letterCardMessage;
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <Glass
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        showPageIndicator={false}
        glassEffect={glassEffect}
        className="w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5"
      />
      <div className="absolute inset-0 flex justify-center">
        <InputContainer
          headerText={customHeaderText}
          letterCardType={letterCardType}
          letterCardColor={letterCardColor}
          letterCardState={letterCardState}
          letterCardMessage={customLetterCardMessage}
          letterCardClassName={letterCardClassName}
          centered={centered}
          textboxLabel={textboxLabel}
          largeButtonText={largeButtonText}
          smallButtonText={smallButtonText}
          showPrimaryButton={showPrimaryButton}
          customText={customText} // 커스텀 텍스트 속성 전달
          petName={petName}
          myName={myName}
          myMessage={myMessage}
          dateTime={dateTime}
          onLeftIconClick={onLeftIconClick} // 추가된 속성 전달
          primaryButtonDisabled={primaryButtonDisabled}
          ghostText={ghostText}
          value={value} // 텍스트 값
          onTextChange={onTextChange} // 텍스트 변경 핸들러
          onButtonClick={onButtonClick}
          onButtonClick2={onButtonClick2}
          handleReplyClick={handleReplyClick}
          isRtc={isRtc}
          handleRtcPuzzleClick={handleRtcPuzzleClick}
          rtcPuzzleText={rtcPuzzleText}
          handleSmallButtonDisabled={handleSmallButtonDisabled}
          className={className}
        />
      </div>
    </div>
  );
};
