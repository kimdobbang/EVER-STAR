import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Rainbow } from 'components/atoms/symbols/Rainbow/Rainbow';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store/Store';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import { firebaseConfig } from 'firebase-messaging-sw';
import { Modal } from 'components/molecules/Modal/Modal';
import { MainActionComponent } from 'components/organics/MainActionComponent/MainActionComponent';
import { useSound } from 'use-sound';
import alarm from 'assets/musics/Alarm.mp3';
import fcmGift from 'assets/musics/FcmGift.mp3';

type ViewMemorialBookSize = 'large' | 'medium' | 'small';
type RainbowColor =
  | 'none'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'violet';

interface EarthMainProps {
  title: string;
  fill: number;
  className?: string;
  buttonSize: ViewMemorialBookSize;
  buttonDisabled: boolean;
  buttonText: string;
  buttonIcon: 'SmallStarImg' | 'SmallEarthImg';
  profileImageUrl?: string;
  onButtonClick: () => void;
}

const rainbowColors: { min: number; max: number; color: RainbowColor }[] = [
  { min: 0, max: 6, color: 'none' },
  { min: 7, max: 13, color: 'red' },
  { min: 14, max: 20, color: 'orange' },
  { min: 21, max: 27, color: 'yellow' },
  { min: 28, max: 34, color: 'green' },
  { min: 35, max: 41, color: 'blue' },
  { min: 42, max: 48, color: 'indigo' },
  { min: 49, max: 49, color: 'violet' },
];

const getColor = (fill: number): RainbowColor => {
  if (fill >= 49) {
    return 'violet';
  }

  for (const rainbow of rainbowColors) {
    if (fill >= rainbow.min && fill <= rainbow.max) {
      return rainbow.color;
    }
  }
  return 'none';
};

export const EarthMain: React.FC<EarthMainProps> = ({
  fill,
  profileImageUrl,
}) => {
  // const [quest, setQuest] = useState('');

  const app = initializeApp(firebaseConfig);
  const messaging = getMessaging(app);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const [Alarm] = useSound(alarm);
  const [FcmGift] = useSound(fcmGift);

  const [letterCardVisible, setLetterCardVisible] = useState(false);
  const [letterMessage, setLetterMessage] = useState('');
  const [giftAddress, setGiftAddress] = useState('');
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const isMessageSeen = localStorage.getItem('isMessageSeen');
    const isMessage = localStorage.getItem('isMessage');
    if (isMessage !== null) {
      setLetterMessage(isMessage);
    }
    if (isMessageSeen !== 'true' && isMessageSeen !== null) {
      setLetterCardVisible(true);
    }
  }, [letterCardVisible, letterMessage]);

  onMessage(messaging, (payload) => {
    setLetterCardVisible(true);

    switch (payload.notification?.title) {
      case '카툰화':
        FcmGift();
        setLetterMessage('선물이 도착했어요');
        localStorage.setItem('isMessage', '선물이 도착했어요');
        localStorage.setItem('gift', `${payload.notification?.body}`);
        localStorage.setItem('isMessageSeen', 'false');
        break;

      case '편지':
        Alarm();
        setLetterMessage('편지가 도착했어요');
        localStorage.setItem('isMessage', '편지가 도착했어요');
        localStorage.setItem('isMessageSeen', 'false');
        break;

      default:
        return;
    }
  });

  // const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  // const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const handleLetterCardClick = () => {
    const type = localStorage.getItem('isMessage');

    switch (type) {
      case '편지가 도착했어요':
        setLetterCardVisible(false);
        localStorage.setItem('isMessageSeen', 'true');
        localStorage.removeItem('isMessageSeen');
        localStorage.removeItem('isMessage');
        break;

      case '선물이 도착했어요':
        setLetterCardVisible(false);
        localStorage.setItem('isMessageSeen', 'true');
        // eslint-disable-next-line no-case-declarations
        const gift = localStorage.getItem('gift') || '';
        if (gift) {
          setGiftAddress(gift);
        }
        setModalState(true);
        break;

      default:
        break;
    }
  };

  const Modalclose = () => {
    localStorage.removeItem('isMessage');
    localStorage.removeItem('isMessageSeen');
    localStorage.removeItem('gift');
    setModalState(false);
  };

  const getRainbowStyle = () => {
    let style = 'absolute w-full h-full top-0 left-0 ';
    style += 'pointer-events-none z-[-1]'; // Ensures it's in the background and doesn't affect interactions

    if (isMobile) {
      style += ' right-0 bottom-0 mb-48 mr-[-20px]';
    } else if (isTabletOrMobile) {
      style += ' bottom-0 mb-64';
    } else {
      style += ' bottom-0 mb-[-70px]';
    }
    return style;
  };

  return (
    <div>
      <div className='relative flex flex-col items-start min-h-screen pb-14'>
        <Rainbow className={getRainbowStyle()} color={getColor(fill)} />
        <MainActionComponent
          type='earth'
          fill={fill}
          profileImageUrl={profileImageUrl}
          onToggleChange={undefined}
          isOwner={false}
          name={''}
          age={undefined}
          description={''}
        />
        <div className='fixed z-50 flex flex-col items-center justify-center w-full bottom-20'>
          <LetterCard
            type='receive'
            color='white'
            state='received'
            name='알림'
            message={letterMessage}
            dateTime=''
            className='h-3'
            centered={true}
            visible={letterCardVisible}
            onClick={handleLetterCardClick}
          />
        </div>
      </div>
      <div>
        <Modal
          isOpen={modalState}
          onClose={Modalclose}
          text='깜짝 선물'
          className='flex flex-col items-center justify-center'
        >
          <img src={giftAddress} alt='Description' />
          <div className='mt-10 text-2xl'>
            한번밖에 볼 수 없어요! <br />
            추후 메모리얼북이 완성 시 <br />
            확인 가능해요!
          </div>
        </Modal>
      </div>
    </div>
  );
};
/* <button
  className='bg-white h-[50px] w-[200px] shadow-lg rounded-md mt-4'
  onClick={getOpenvidu}
>
  임시버튼
  <br />
  오픈비두 질문으로 이동
</button> */
