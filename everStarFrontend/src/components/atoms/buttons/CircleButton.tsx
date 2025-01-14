import React from 'react';
import CircleWhite from 'assets/images/circle-white.svg';
import CircleDisabled from 'assets/images/circle-disabled.svg';
import CircleHover from 'assets/images/circle-hover.svg';
import CircleFocus from 'assets/images/circle-focus.svg';
import { PlusIcon } from 'components/atoms/icons/Plus/PlusIcon';
import { MicrophoneIcon } from 'components/atoms/icons/Microphone/MicrophoneIcon';
import { MicrophoneOffIcon } from '../icons/MicrophoneOff/MicrophoneOffIcon';
import { PhoneStopIcon } from 'components/atoms/icons/PhoneStop/PhoneStopIcon';
import { PhoneIcon } from 'components/atoms/icons/Phone/PhoneIcon';
import { VideoIcon } from 'components/atoms/icons/Video/VideoIcon';
import { VideoOffIcon } from '../icons/VideoOff/VideoOffIcon';
import { SettingsIcon } from 'components/atoms/icons/Settings/SettingsIcon';
import { ChatIcon } from 'components/atoms/icons/Chat/ChatIcon';
import { ShareIcon } from 'components/atoms/icons/Share/ShareIcon';
import { ExitIcon } from '../icons/Exit/ExitIcon';

type CircleButtonTheme = 'focus' | 'hover' | 'white';
type RtcIconTheme =
  | 'plus'
  | 'mic'
  | 'micOff'
  | 'phone'
  | 'phoneStop'
  | 'video'
  | 'videoOff'
  | 'settings'
  | 'chat'
  | 'share'
  | 'exit';

interface ICircleButtonProps {
  theme: CircleButtonTheme;
  disabled: boolean;
  icon: RtcIconTheme;
  label?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconMap: Record<RtcIconTheme, React.ComponentType<any>> = {
  plus: PlusIcon,
  mic: MicrophoneIcon,
  micOff: MicrophoneOffIcon,
  phone: PhoneIcon,
  phoneStop: PhoneStopIcon,
  video: VideoIcon,
  videoOff: VideoOffIcon,
  settings: SettingsIcon,
  chat: ChatIcon,
  share: ShareIcon,
  exit: ExitIcon,
};

export function CircleButton({ theme, icon, label, onClick, disabled }: ICircleButtonProps) {
  const getBgPath = () => {
    if (disabled) return CircleDisabled;
    switch (theme) {
      case 'focus':
        return CircleFocus;
      case 'hover':
        return CircleHover;
      case 'white':
      default:
        return CircleWhite;
    }
  };

  const getColor = () => {
    if (disabled) return 'gray';
    if (theme === 'focus') return 'white';
    return 'black';
  };

  const IconComponent = iconMap[icon];

  return (
    <div className='flex flex-col text-center'>
      <button
        className='relative flex items-center justify-center rounded-lg px-4 
                       w-[60px] h-[60px] 
                   mobile:w-[80px] mobile:h-[80px]
                   tablet:w-[100px] tablet:h-[100px] 
                   laptop:w-[120px] laptop:h-[120px]'
        disabled={disabled}
        onClick={onClick}
      >
        <img
          src={getBgPath()}
          alt='circle button background'
          className='absolute inset-0 w-full h-full'
          style={{ zIndex: 0 }}
        />
        <div className='relative flex items-center justify-center' style={{ zIndex: 1 }}>
          <IconComponent size={24} color={getColor()} />
        </div>
      </button>
      {label && <span className='mt-[-10px]'>{label}</span>}
    </div>
  );
}
