import { MicrophoneIcon } from 'components/atoms/icons/Microphone/MicrophoneIcon';
import { ProfileIcon } from 'components/atoms/icons/Profile/ProfileIcon';

interface IRtcCardProps {
  name: string;
  videoState: boolean;
}

export const RtcCard = ({ name, videoState }: IRtcCardProps) => {
  return (
    <div className='relative w-[320px] h-[200px] rounded-[20px] bg-greyscaleblack-80'>
      {videoState && (
        <div className='absolute w-full h-full bg-mainprimary rounded-[20px]'>
          이게 카메라 켠 화면
        </div>
      )}
      <div className='absolute z-10 flex items-center justify-center w-full h-full'>
        <ProfileIcon size={24} color='white' />
      </div>
      <div className='absolute z-20 flex items-center justify-between bottom-4 left-4 right-4'>
        <label className='text-greyscalewhite kor-h-h2'>{name}</label>
        <MicrophoneIcon size={24} color='white' />
      </div>
    </div>
  );
};
