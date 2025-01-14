import React from 'react';

interface IInformationText {
  children: string;
  state: 'error' | 'default';
  className?: string;
  divClassName?: string;
  align?: 'left' | 'center' | 'right';
}

export const InformationText = ({
  children = '2019-10-08 09:38:07',
  state,
  className = '',
  divClassName = '',
  align = 'center',
}: IInformationText): JSX.Element => {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };

  return (
    <div
      className={`relative inline-flex gap-2 ${alignmentClasses[align]} ${className}`}
    >
      <div
        className={`whitespace-nowrap kor-p-p4 font-normal ${
          state === 'error' ? 'w-fit text-mainerror' : 'text-greyscaleblack-80'
        } ${divClassName}`}
      >
        {children}
      </div>
    </div>
  );
};
