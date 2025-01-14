import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { LetterIcons } from 'components/atoms/symbols/Letter/LetterIcons';
import { RocketIcons } from 'components/atoms/symbols/Rocket/RocketIcons';
import { PostitIcons } from 'components/atoms/symbols/Postit/PostitIcons';
import { LetterboxIcons } from 'components/atoms/symbols/Letterbox/LetterboxIcons';
import { ProgressCard } from 'components/organics/ProgressCard/ProgressCard';
import { ViewMemorialBook } from 'components/organics/ViewMemorialBook/ViewMemorialBook';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { RootState } from 'store/Store';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useSound } from 'use-sound';
import clickEvent from 'assets/musics/ClickEffect.mp3';
import cheerMessage from 'assets/musics/CheerMessage.mp3';
import explore from 'assets/musics/Explore.mp3';
import letterBox from 'assets/musics/LetterBox.mp3';
import letterWrite from 'assets/musics/LetterWrite.mp3';
import mypage from 'assets/musics/Mypage.mp3';
import todayQuest from 'assets/musics/Quest.mp3';
import memorialBookSpace from 'assets/musics/MemorialBookSpace.mp3';

// import config from 'config';
import './MainActionComponent.css';

export interface MainActionComponentProps {
  type: 'earth' | 'everstar';
  profileImageUrl?: string;
  fill: number;
  toggleStatus?: 'on' | 'off';
  onToggleChange?: (status: 'on' | 'off') => void;
  memorialBookProfile?: {
    id: number;
    isActive?: boolean;
    isOpen?: boolean;
  } | null;
  isOwner?: boolean;
  name?: string;
  age?: number;
  description?: string;
  onProfileClick?: () => void; // 프로필 클릭 핸들러를 선택적으로 설정
}

export const MainActionComponent: React.FC<MainActionComponentProps> = ({
  type,
  profileImageUrl,
  fill,
  toggleStatus,
  onToggleChange,
  memorialBookProfile,
  isOwner,
  name = '',
  onProfileClick,
}) => {
  const [ClickEvent] = useSound(clickEvent);
  const [CheerMessage] = useSound(cheerMessage);
  const [Explore] = useSound(explore);
  const [LetterBox] = useSound(letterBox);
  const [LetterWrite] = useSound(letterWrite);
  const [Mypage] = useSound(mypage);
  const [TodayQuest] = useSound(todayQuest);
  const [MemorialBookSpace] = useSound(memorialBookSpace);
  const navigate = useNavigate();
  const params = useParams();
  const avatarSrc = profileImageUrl || '';
  const iconSize = 36;

  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  // Quest state and handlers
  const [quest, setQuest] = useState<string>('');

  const handleQuestClick = (questId: string) => {
    TodayQuest();
    navigate(`/earth/quest/${questId}`);
  };

  const handleLetterClick = () => {
    LetterWrite();
    navigate('/earth/letter');
  };

  const handleExploreClick = () => {
    Explore();
    navigate(`/everstar/${petId}/explore`);
  };

  const handleLetterboxClick = () => {
    LetterBox();
    navigate('/earth/letterbox');
  };

  const handlePostitClick = () => {
    CheerMessage();
    navigate(`/everstar/${params.pet}/message`);
  };

  const handleMypageClick = () => {
    Mypage();
    navigate('/mypage');
  };

  const handleViewMemorialBookClick = () => {
    MemorialBookSpace();
    if (memorialBookProfile) {
      navigate(
        `/everstar/${params.pet}/memorialbook/${memorialBookProfile.id}`
      );
    }
  };

  const handleStarIconClick = () => {
    navigate(`/everstar/${petId}`);
  };

  const handleEarthIconClick = () => {
    navigate('/earth');
  };

  // const handleOpenviduClick = () => {
  //   navigate(`/earth/openvidu`);
  // };

  const getQuestStatus = (): 'arrived' | 'inProgress' | 'completed' => {
    if (quest.length >= 3) return 'completed';
    if (quest.length === 1 || quest.length === 2) return 'inProgress';
    return 'arrived';
  };

  const questStatus = getQuestStatus();

  const getButtonTheme = () => {
    switch (questStatus) {
      case 'completed':
        return 'hover';
      case 'inProgress':
        return 'focus';
      default:
        return 'white';
    }
  };

  const getButtonText = () => {
    switch (questStatus) {
      case 'completed':
        return '퀘스트를 완료했습니다';
      case 'inProgress':
        return `${quest}번째 퀘스트가 도착했습니다`;
      default:
        return `${quest}번째 퀘스트가 도착했습니다`;
    }
  };

  const handleButtonClick = () => {
    ClickEvent();
    if (type === 'earth') {
      handleStarIconClick();
    } else {
      handleEarthIconClick();
    }
  };

  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;

    const eventSource = new EventSource(
      `https://i11b101.p.ssafy.io/api/earth/connect/${petId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    eventSource.onmessage = (event) => {
      if (event.data.length !== 0 && event.data !== 'dummy') {
        if (quest !== event.data) {
          setQuest(event.data);
        }
      }
    };

    return () => {
      eventSource.close();
    };
  }, [quest, petId, accessToken]);

  return (
    <div className='main-container w-full h-full bg-[#ffffff6b] rounded-[20px] overflow-hidden border-[0.5px] border-solid border-white shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]'>
      <div className='progress-container'>
        <ProgressCard
          fill={fill}
          buttonTheme='white'
          buttonDisabled={false}
          buttonText={
            type === 'earth' ? '영원별로 이동하기' : '지구별로 이동하기'
          }
          buttonIcon={type === 'earth' ? 'SmallStarImg' : 'SmallEarthImg'}
          onButtonClick={handleButtonClick}
          buttonSize='full'
          className='h-full'
        />
      </div>

      <div className='mt-4 buttons-container'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='button-group'>
            <button
              className='flex flex-col items-center justify-center flex-1 p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-bgorange'
              onClick={type === 'earth' ? handleLetterClick : handlePostitClick}
            >
              {type === 'earth' ? (
                <>
                  <LetterIcons
                    variant='letter'
                    size={iconSize}
                    className='mb-2 pointer-events-none'
                  />
                  <span className='font-bold pointer-events-none font-kor-h-h2 text-greyscaleblack-100'>
                    편지쓰기
                  </span>
                </>
              ) : (
                <>
                  <PostitIcons
                    variant='postit'
                    size={iconSize}
                    className='mb-2 pointer-events-none'
                  />
                  <span className='font-bold pointer-events-none font-kor-h-h2 text-greyscaleblack-100'>
                    응원메시지
                  </span>
                </>
              )}
            </button>
            <button
              className='flex flex-col items-center justify-center flex-1 p-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-bgorange'
              onClick={
                type === 'earth' ? handleLetterboxClick : handleExploreClick
              }
            >
              {type === 'earth' ? (
                <>
                  <LetterboxIcons
                    variant='letterbox'
                    size={iconSize}
                    className='mb-2 pointer-events-none'
                  />
                  <span className='font-bold pointer-events-none font-kor-h-h2 text-greyscaleblack-100'>
                    편지함
                  </span>
                </>
              ) : (
                <>
                  <RocketIcons
                    variant='rocket'
                    size={iconSize}
                    className='mb-2 pointer-events-none'
                  />
                  <span className='font-bold pointer-events-none font-kor-h-h2 text-greyscaleblack-100'>
                    탐사하기
                  </span>
                </>
              )}
            </button>
          </div>

          {type === 'everstar' ? (
            <div
              className='flex items-center justify-start w-full p-4 mt-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-bgorange'
              onClick={onProfileClick} // 프로필 클릭 시 전달된 핸들러 호출
            >
              <Avatar
                size='square'
                iconSize={iconSize}
                src={avatarSrc}
                className='w-16 h-16 mr-10 pointer-events-none '
              />

              <div className='flex flex-col items-start'>
                <span className='font-bold pointer-events-none font-kor-h-h2 text-greyscaleblack-100'>
                  {name}님의 영원별
                </span>
              </div>
            </div>
          ) : (
            <button
              className='flex flex-col items-center justify-center w-full p-4 mt-4 bg-white rounded-lg shadow-lg cursor-pointer hover:bg-bgorange'
              onClick={handleMypageClick} // 지구별에서는 마이페이지 클릭 시 전달된 핸들러 호출
            >
              <Avatar
                iconSize={iconSize}
                src={avatarSrc}
                className='pointer-events-none'
              />
              <span className='mt-2 font-bold pointer-events-none font-kor-h-h2 text-greyscaleblack-100'>
                마이페이지
              </span>
            </button>
          )}
        </div>
      </div>

      {type === 'everstar' && memorialBookProfile ? (
        <div className='mt-4 buttons-container'>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <ViewMemorialBook
              onClick={handleViewMemorialBookClick}
              toggleStatus={toggleStatus}
              onToggleChange={onToggleChange}
              isActive={memorialBookProfile.isActive}
              isOpen={memorialBookProfile.isOpen}
              isOwner={isOwner}
            />
          </div>
        </div>
      ) : (
        <div className='mt-4 buttons-container'>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            {quest && (
              <div className='relative flex flex-col items-center w-full'>
                <span className='absolute top-[-20px] bg-mainprimary text-white text-lg font-bold rounded-full w-[24px] h-[24px] flex items-center justify-center pointer-events-none'></span>
                <PrimaryButton
                  theme={getButtonTheme()}
                  size='full'
                  disabled={questStatus === 'completed'}
                  onClick={() => handleQuestClick(quest)}
                  fullWidth
                >
                  {getButtonText()}
                </PrimaryButton>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
