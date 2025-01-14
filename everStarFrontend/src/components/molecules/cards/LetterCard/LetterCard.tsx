import { InformationText } from 'components/atoms/texts/InformationText';
import { LetterText } from 'components/atoms/texts/LetterText';

export type LetterType = 'default' | 'send' | 'receive';
export type LetterColor = 'white' | 'bgorange' | 'orange' | 'gray';
export type LetterState = 'received' | 'notReceived';

export interface ILetterProps {
  type: LetterType;
  color: LetterColor;
  state: LetterState;
  name?: string;
  sendMessage?: string;
  message?: string;
  dateTime?: string;
  className?: string;
  centered?: boolean;
  onClick?: () => void;
  visible?: boolean;
}

export const LetterCard = ({
  type,
  color,
  name,
  sendMessage,
  state,
  message,
  dateTime,
  className,
  centered = false,
  onClick,
  visible = true,
}: ILetterProps) => {
  if (!visible) return null;

  const getState = () => {
    if (state === 'received') return '읽음';
    else return '아직 읽지 않았어요!!';
  };

  const getTextColor = () => {
    if (color === 'orange') return 'white';
    else if (color === 'gray') return 'gray';
    else return 'black';
  };

  const getBgColor = () => {
    if (color === 'orange') return 'bg-mainprimary';
    if (color === 'white') return 'bg-greyscalewhite';
    if (color === 'bgorange') return 'bg-bgorange';
    if (color === 'gray') return 'bg-greyscaleblack-20';
  };

  const getAlignmentClass = () => {
    return centered ? 'items-center text-center' : '';
  };

  return (
    <button
      onClick={onClick}
      className={`${getBgColor()} ${getAlignmentClass()} flex flex-col gap-[16px] p-4 rounded-[20px] shadow-md ${type === 'default' ? 'w-[270px]' : 'w-[320px]'}`}
    >
      {name && (
        <LetterText
          size={type === 'default' ? 'small' : 'large'}
          color={getTextColor()}
          className={`${className} !text-start`}
        >
          {name}
        </LetterText>
      )}
      {type === 'default' && (
        <div
          className={`flex flex-col gap-[16px] ${centered ? 'items-center' : ''}`}
        >
          <div className='flex flex-row gap-[10px]'>
            <LetterText size='medium' color='black' className={className}>
              받은 편지
            </LetterText>
            <LetterText
              size='small'
              color={getTextColor()}
              className={className}
            >
              {sendMessage}
            </LetterText>
          </div>
          <div className='flex flex-row gap-[10px]'>
            <LetterText size='medium' color='black' className={className}>
              읽음 여부
            </LetterText>
            <LetterText
              size='small'
              color={getTextColor()}
              className={className}
            >
              {getState()}
            </LetterText>
          </div>
        </div>
      )}
      {(type === 'receive' || type === 'send') && (
        <div>
          <LetterText size='xl' color='black' className={className}>
            {message}
          </LetterText>
        </div>
      )}
      <div className='w-full'>
        <hr className='border-greyscaleblack-60 border-0.5' />
      </div>
      {dateTime && (
        <div className='flex justify-end w-full'>
          <InformationText
            state='default'
            divClassName={color === 'orange' ? 'text-greyscalewhite' : ''}
          >
            {dateTime}
          </InformationText>
        </div>
      )}
    </button>
  );
};
