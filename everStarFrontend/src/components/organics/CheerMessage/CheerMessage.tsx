import React, { useState, useEffect } from 'react';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';
import { PostItCard } from 'components/molecules/cards/PostItCard/PostItCard';
import { PostItPlusCard } from 'components/molecules/cards/PostItPlusCard/PostItPlusCard';
import { Glass } from 'components/molecules/Glass/Glass';
import { IntroduceWrite } from 'components/organics/CheerMessage/IntroduceWrite';
import { CheerColorSelect } from 'components/organics/CheerMessage/CheerColorSelect';
import { CheerMessageWrite } from 'components/organics/CheerMessage/CheerMessageWrite';
import { useFetchCheeringPetDelete, useFetchPetPost } from 'hooks/useEverStar';
import { RootState } from 'store/Store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { PostItDetailModal } from './PostItDetailModal';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { useNavigate } from 'react-router-dom';

export interface CheerMessageProps {
  profile: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarUrl: string;
  };
  postItCards: Array<{
    contents: string;
    name: string;
    color: string;
    petId: number;
    cheeringMessageId: number;
  }>;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const CheerMessage: React.FC<CheerMessageProps> = ({
  profile,
  postItCards: initialPostItCards,
  currentPage,
  onPageChange,
}) => {
  const [postItCards, setPostItCards] = useState(initialPostItCards);
  const [postItOpen, setPostItOpen] = useState(false);
  const [isIntroduceWriteModalOpen, setIntroduceWriteModalOpen] =
    useState(false);
  const [isCheerColorSelectModalOpen, setCheerColorSelectModalOpen] =
    useState(false);
  const [isCheerMessageWriteModalOpen, setCheerMessageWriteModalOpen] =
    useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 970);
  const [selectedCard, setSelectedCard] = useState<{
    contents: string;
    name: string;
    color: string;
  } | null>(null); // 선택된 카드를 저장할 상태 추가

  const token = useSelector((state: RootState) => state.auth.accessToken);
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const petName = useSelector((state: RootState) => state.pet.petDetails?.name);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 970);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const petIntroduce = JSON.parse(sessionStorage.getItem('petDetails') || '{}');

  const cardsPerPage = isMobile ? 2 : 12;
  const { mutate: createCheeringPet } = useFetchPetPost(
    token,
    Number(petId),
    Number(params.pet)
  );
  const { mutate: deleteCheeringPet } = useFetchCheeringPetDelete();

  const handleCreate = (formData: {
    content: string;
    color: string;
    isAnonymous: boolean;
    name: string;
    petId: number;
    cheeringMessageId: number;
  }) => {
    createCheeringPet(formData, {
      onSuccess: (data) => {
        const newPostItCard = {
          contents: formData.content,
          name: petName + ' ' + data.relationShip || '',
          color: formData.color.toLowerCase(),
          petId: Number(petId),
          cheeringMessageId: Number(data.id),
        };
        setPostItCards([...postItCards, newPostItCard]);
      },
      onError: (error) => {
        console.error('응원 메시지 생성 실패:', error);
      },
    });
  };

  const handleDelete = (
    index: number,
    petId: number,
    cheeringMessageId: number
  ) => {
    deleteCheeringPet(
      { petId, cheeringMessageId },
      {
        onSuccess: () => {
          const newPostItCards = [...postItCards];
          newPostItCards.splice(index, 1);
          setPostItCards(newPostItCards);
        },
        onError: (error) => {
          console.error('삭제 실패:', error);
        },
      }
    );
  };

  const handleCloseIntroduceWriteModal = () => {
    setIntroduceWriteModalOpen(false);
    const petIntroduce = JSON.parse(
      sessionStorage.getItem('petDetails') || '{}'
    );
    profile.description = petIntroduce.introduction;
  };

  // const handleVerifyIntroduceWrite = () => {
  //   setIntroduceWriteModalOpen(false);
  // };

  const handleCloseCheerColorSelectModal = () => {
    setCheerColorSelectModalOpen(false);
  };

  const handleVerifyCheerColorSelect = () => {
    setCheerColorSelectModalOpen(false);
    setCheerMessageWriteModalOpen(true);
  };

  const handleCheerColorSelect = (color: string) => {
    switch (color) {
      case '분홍색':
        setSelectedColor('PINK');
        break;
      case '초록색':
        setSelectedColor('GREEN');
        break;
      case '파란색':
        setSelectedColor('BLUE');
        break;
      case '보라색':
        setSelectedColor('PURPLE');
        break;
      case '회색':
        setSelectedColor('GRAY');
        break;
      case '노란색':
        setSelectedColor('YELLOW');
        break;
      default:
        break;
    }
  };

  const handleCloseCheerMessageWriteModal = () => {
    setCheerMessageWriteModalOpen(false);
  };

  const handlePostItOpen = (card: {
    contents: string;
    name: string;
    color: string;
    petId: number;
    cheeringMessageId: number;
  }) => {
    setSelectedCard(card);
    setPostItOpen(true);
  };

  const handleClosePostItModal = () => {
    setPostItOpen(false);
  };

  const handleVerifyCheerMessageWrite = (message: string) => {
    handleCreate({
      content: message,
      name: 'hi',
      color: selectedColor,
      isAnonymous: false,
      petId: 0,
      cheeringMessageId: 0,
    });
    setCheerMessageWriteModalOpen(false);
  };

  const renderPostItCards = () => {
    const startIdx = (currentPage - 1) * cardsPerPage;
    const endIdx = startIdx + cardsPerPage;
    const cardsToShow = postItCards.slice(startIdx, endIdx);
    return cardsToShow.map((card, index) => (
      <PostItCard
        key={startIdx + index}
        contents={card.contents}
        name={card.name}
        color={card.color as never}
        onDelete={() =>
          handleDelete(startIdx + index, Number(petId), card.cheeringMessageId)
        }
        onClick={() => handlePostItOpen(card)}
      />
    ));
  };

  const totalPagesCalculated = Math.ceil(
    (postItCards.length + 1) / cardsPerPage
  ); // +1 for PostItPlusCard

  return (
    <div className='relative flex flex-col items-center mb-20 '>
      <div className='absolute inset-0 z-9999'>
        <Glass
          currentPage={currentPage}
          totalPages={totalPagesCalculated}
          onPageChange={onPageChange}
          showPageIndicator={true}
          className='w-full h-auto sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5'
        />
      </div>
      <div className='relative w-full max-w-screen-lg p-3 rounded-lg z-9'>
        <ModalHeader text={'응원게시판'} onLeftIconClick={() => navigate(-1)} />
        <div className={`flex ${isMobile ? 'flex-col' : ''}`}>
          <div className='flex-shrink-0 mb-4 md:mb-0 md:mr-4 '>
            <ProfileCard
              avatarSrc={profile.avatarUrl}
              name={profile.name}
              age={profile.age}
              date={profile.date}
              description={petIntroduce.introduction}
              tagList={profile.tagList}
              onPencilClick={() => setIntroduceWriteModalOpen(true)}
            />
          </div>
          <div className='flex-grow'>
            <div
              className={`flex ${isMobile ? 'justify-start pb-10 ml-3 gap-8' : 'grid grid-cols-4 gap-4'}`}
            >
              {renderPostItCards()}
              {currentPage === totalPagesCalculated && (
                <PostItPlusCard
                  key='plus'
                  onClick={() => setCheerColorSelectModalOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCard && (
        <PostItDetailModal
          isOpen={postItOpen}
          onClose={handleClosePostItModal}
          contents={selectedCard.contents}
          name={selectedCard.name}
          color={selectedCard.color}
        />
      )}

      <IntroduceWrite
        isOpen={isIntroduceWriteModalOpen}
        onClose={handleCloseIntroduceWriteModal}
        // onVerify={handleVerifyIntroduceWrite}
        text='소개글을 입력하세요'
        onResend={() => {}}
      />

      <CheerColorSelect
        isOpen={isCheerColorSelectModalOpen}
        onClose={handleCloseCheerColorSelectModal}
        onVerify={handleVerifyCheerColorSelect}
        text='색상 정보를 선택하세요'
        onResend={() => {}}
        onOptionSelect={handleCheerColorSelect} // 색상 선택 처리 함수 전달
      />

      <CheerMessageWrite
        isOpen={isCheerMessageWriteModalOpen}
        onClose={handleCloseCheerMessageWriteModal}
        onVerify={handleVerifyCheerMessageWrite}
        text='응원 메시지를 입력하세요'
        onResend={() => {}}
      />
    </div>
  );
};
