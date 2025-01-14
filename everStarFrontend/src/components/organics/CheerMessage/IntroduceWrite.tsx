import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { useUpdatePetIntroduction } from 'hooks/useEverStar';
import { RootState } from 'store/Store';
import { useSelector } from 'react-redux';

interface IntroduceWriteProps {
  isOpen: boolean;
  onClose: () => void;
  onResend: () => void;
  onVerify?: (code: string) => void;
  text: string;
  height?: string;
}

export const IntroduceWrite: React.FC<IntroduceWriteProps> = ({
  isOpen,
  onClose,
  text,
}) => {
  const [message, setMessage] = useState('');

  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);

  const updatePetIntroduction = useUpdatePetIntroduction({
    onSuccess: () => {
      console.log('Pet introduction updated successfully');
      // Update session storage with new introduction
      const petDetails = JSON.parse(
        sessionStorage.getItem('petDetails') || '{}'
      );
      petDetails.introduction = message;
      sessionStorage.setItem('petDetails', JSON.stringify(petDetails));
      setMessage('');
      onClose();
    },
    onError: (error) => {
      console.error('Error updating pet introduction:', error);
    },
  });

  const handleVerify = () => {
    if (message.trim() === '') {
      console.error('Introduction message is empty');
      return;
    }
    updatePetIntroduction.mutate({
      introduction: message,
      petId: Number(petId),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text='소개글 쓰기'>
      <div className='justify-center'>
        <div className='flex flex-col justify-between w-full h-full mt-10'>
          <div className='flex flex-col'>
            <div
              className="left-0 [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal] "
              dangerouslySetInnerHTML={{ __html: text }}
            />
            <div className='mt-5'>
              <Textbox
                type='large'
                className=''
                label='내용'
                showInfoText={true}
                infoText={message.length ? `${message.length}/255` : ''}
                infoTextAlign='left'
                showStar={false}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={255}
              />
            </div>
          </div>
          <div className='flex justify-end mt-2 w-80'>
            <PrimaryButton
              theme='white'
              size='large'
              onClick={handleVerify}
              disabled={false}
              icon={null}
              hug={true}
            >
              작성완료
            </PrimaryButton>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export type { IntroduceWriteProps };
