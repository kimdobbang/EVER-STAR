import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Select } from 'components/molecules/input/Select';

interface CheerColorSelectProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify: (code: string) => void;
  text: string;
  onOptionSelect: (color: string) => void;
  height?: string;
}

export const CheerColorSelect: React.FC<CheerColorSelectProps> = ({
  isOpen,
  onClose,
  onVerify,
  text,
  onOptionSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');

  const colorOptions: (string | number)[] = [
    '분홍색',
    '초록색',
    '파란색',
    '보라색',
    '회색',
    '노란색',
  ];

  const handleOptionSelect = (option: string | number) => {
    const color = typeof option === 'string' ? option : option.toString();
    setSelectedColor(color);
    onOptionSelect(color); // 선택된 색상을 부모 컴포넌트로 전달
  };

  const handleVerify = () => {
    onVerify(selectedColor);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text='색상 정보 선택'>
      <div className='flex flex-col justify-between h-full mt-5 w-80'>
        <div className='flex flex-col'>
          <div
            className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal] "
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <div className='mt-6 '>
            <Select
              options={colorOptions}
              title={'포스트잇 색깔을 선택해주세요'}
              showLabel={false}
              onOptionSelect={handleOptionSelect} // 수정된 부분
              infoText={''}
            />
          </div>
        </div>
        <div className='flex justify-end w-full mt-10'>
          <PrimaryButton
            theme='white'
            size='large'
            onClick={handleVerify}
            disabled={false}
            icon={null}
          >
            선택 완료
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export type { CheerColorSelectProps };
