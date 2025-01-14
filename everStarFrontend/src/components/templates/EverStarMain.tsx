import React, { useState, useEffect, useRef } from 'react';
import { useFetchMemorialBooks, useUpdateMemorialBookOpenStatus } from 'hooks/useMemorialBooks';
import { DepressionSurvey } from 'components/organics/DepressionSurvey/DepressionSurvey';
import { MainActionComponent } from 'components/organics/MainActionComponent/MainActionComponent';
import { ProfileModal } from 'components/organics/ProfileModal/ProfileModal';
import { IntroduceWrite } from 'components/organics/CheerMessage/IntroduceWrite';
import { useSound } from 'use-sound';
import { RootState } from 'store/Store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import introduce from 'assets/musics/Introduce.mp3';
import myEverStar from 'assets/musics/MyEverStar.mp3';
import diffEverStar from 'assets/musics/DiffEverStar.mp3';
import Swal from 'sweetalert2';
import { getMemorialBooks } from 'api/memorialBookApi';

interface EverStarMainProps {
  petProfile: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarUrl: string;
    questIndex: number;
  } | null;
  buttonDisabled: boolean;
  memorialBookProfile: {
    id: number;
    psychologicalTestResult: string | null;
    isOpen: boolean;
    isActive: boolean;
  } | null;
  petId: number;
  isOwner: boolean;
}

export const EverStarMain: React.FC<EverStarMainProps> = ({
  petProfile,
  memorialBookProfile,
  petId,
  isOwner,
}) => {
  const params = useParams();
  const myPetId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const token = useSelector((state: RootState) => state.auth.accessToken);

  const [MyEverStar] = useSound(myEverStar);
  const [DiffEverStar] = useSound(diffEverStar);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // 처음 렌더링 시 아무 동작도 하지 않음
    }

    if (!isProfileModalOpen) {
      if (Number(myPetId) === Number(params.pet)) {
        MyEverStar();
      } else {
        DiffEverStar();
      }
    }
    isFirstRender.current = true;
  });

  const [Introduce] = useSound(introduce);
  const { data, refetch } = useFetchMemorialBooks(petId);
  const [toggleStatus, setToggleStatus] = useState<'on' | 'off' | undefined>(() => {
    const savedStatus = localStorage.getItem(`toggleStatus-${petId}`);
    return savedStatus ? (savedStatus as 'on' | 'off') : memorialBookProfile?.isOpen ? 'on' : 'off';
  });

  const [isModalOpen, setIsModalOpen] = useState(
    petProfile?.questIndex === 50 && !memorialBookProfile?.isActive && isOwner,
  );

  const petIntroduce = JSON.parse(sessionStorage.getItem('petDetails') || '{}');

  const [isIntroduceWriteModalOpen, setIntroduceWriteModalOpen] = useState(false);

  const { mutate: updateMemorialBookStatus } = useUpdateMemorialBookOpenStatus({
    onSuccess: () => {},
    onError: () => {
      setToggleStatus((prevStatus) => {
        localStorage.setItem(`toggleStatus-${petId}`, prevStatus || 'off');
        return prevStatus;
      });
    },
  });

  const handleSurveySubmitSuccess = async () => {
    // 설문 제출 후 모달 닫기
    setIsModalOpen(false);

    try {
      if (!token) {
        throw new Error('인증 토큰이 필요합니다.');
      }

      const response = await getMemorialBooks(petId, token);
      const updatedMemorialBookProfile = response.data;

      if (updatedMemorialBookProfile && !updatedMemorialBookProfile.isActive) {
        updateMemorialBookStatus({
          petId,
          memorialBookId: updatedMemorialBookProfile.id,
          isOpen: updatedMemorialBookProfile.isOpen,
        });
      }

      if (updatedMemorialBookProfile?.psychologicalTestResult) {
        Swal.fire({
          icon: 'success',
          title: '트라우마 자가진단 결과',
          text: updatedMemorialBookProfile.psychologicalTestResult,
          confirmButtonColor: '#FF9078',
        });
      }
    } catch (error) {
      console.error('Memorial Book 프로필 데이터를 가져오는 중 오류가 발생했습니다:', error);
      Swal.fire({
        icon: 'error',
        title: '오류',
        text: '데이터를 가져오는 중 문제가 발생했습니다. 다시 시도해 주세요.',
        confirmButtonColor: '#FF9078',
      });
    }
  };

  const handleProfileClick = () => {
    Introduce();
    setIsProfileModalOpen(true);
  };
  useEffect(() => {
    // refetch();
    // 컴포넌트 마운트 시 memorialBookProfile 가져오기
    // refetch(); // 오늘 날짜: 2024-08-18
    // Fetch memorial book profile data (commented out)
  }, [data]);

  useEffect(() => {
    // isActive가 true일 때 설문 모달이 다시 뜨지 않도록 설정
    if (memorialBookProfile?.isActive) {
      setIsModalOpen(false);
    }
  }, [memorialBookProfile]);

  const handleCloseIntroduceWriteModal = () => {
    setIntroduceWriteModalOpen(false);
    const petIntroduce = JSON.parse(sessionStorage.getItem('petDetails') || '{}');
    if (petProfile) {
      petProfile.description = petIntroduce.introduction;
    }
  };

  if (!petProfile) {
    return <div>Loading...</div>;
  }

  const updatedMemorialBookProfile = data?.data || memorialBookProfile;

  return (
    <div className="flex justify-center flex-grow">
      {isModalOpen && (
        <div style={{ position: 'relative', zIndex: 1000 }}>
          <DepressionSurvey
            onSubmitSuccess={handleSurveySubmitSuccess}
            memorialBookId={updatedMemorialBookProfile?.id || 0}
          />
        </div>
      )}

      <MainActionComponent
        type="everstar"
        profileImageUrl={petProfile.avatarUrl}
        fill={petProfile.questIndex}
        name={petProfile.name}
        age={petProfile.age}
        description={petIntroduce.introduction}
        memorialBookProfile={updatedMemorialBookProfile}
        toggleStatus={toggleStatus}
        onToggleChange={(status) => {
          setToggleStatus(status);
          localStorage.setItem(`toggleStatus-${petId}`, status);
          if (updatedMemorialBookProfile) {
            updateMemorialBookStatus({
              petId,
              memorialBookId: updatedMemorialBookProfile.id,
              isOpen: status === 'on',
            });
          }
        }}
        isOwner={isOwner}
        onProfileClick={handleProfileClick}
      />

      <IntroduceWrite
        isOpen={isIntroduceWriteModalOpen}
        onClose={handleCloseIntroduceWriteModal}
        text="소개글을 입력하세요"
        onResend={() => {}}
      />

      <ProfileModal
        avatarSrc={petProfile.avatarUrl}
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profileData={petProfile}
        isOwner={isOwner}
        onPencilClick={() => {
          setIntroduceWriteModalOpen(true);
          setIsProfileModalOpen(false);
        }}
      />
    </div>
  );
};
