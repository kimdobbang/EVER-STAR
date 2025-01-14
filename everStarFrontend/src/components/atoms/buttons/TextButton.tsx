import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';

type TextButtonSize = 'large' | 'medium' | 'small';

interface ITextButtonProps {
  size: TextButtonSize;
  disabled: boolean;
  children: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const disabledStyle = 'disabled:text-greyscaleblack-60';

const fontStyle = {
  large: 'kor-h-h3',
  medium: 'kor-subtitle-subtitle2',
  small: 'kor-p-p4',
};

export default function PrimaryButton({
  size,
  children,
  onClick,
  disabled,
}: ITextButtonProps) {
  return (
    <button
      className={`
        flex
        items-center
        justify-between
        ${disabledStyle}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      <span className={`flex-grow pr-4 mx-auto text-center ${fontStyle[size]}`}>
        {children}
      </span>
      <div className='ml-auto'>
        <ArrowIcon
          color={disabled ? 'gray' : 'black'}
          size={size === 'small' ? 16 : 24}
          direction='right'
        />
      </div>
    </button>
  );
}
