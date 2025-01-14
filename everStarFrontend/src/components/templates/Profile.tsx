import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ProfileSelection } from 'components/organics/ProfileSelection/ProfileSelection';
import { PetInfoForm } from 'components/organics/PetInfoForm/PetInfoForm';
import { SearchModal } from 'components/organics/SearchModal/SearchModal';
import { RootState } from 'store/Store';
import { useFetchPets, useAddPet } from 'hooks/usePets';
import { Glass } from 'components/molecules/Glass/Glass';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

export const Profile: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { data: pets, isLoading, error } = useFetchPets(token);
  const { mutate: addPet } = useAddPet(token);

  const [isPetInfoOpen, setPetInfoOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [currentFormData, setCurrentFormData] = useState<FormData | null>(null);

  const handlePetFormSubmit = (formData: FormData) => {
    setCurrentFormData(formData);
    setPetInfoOpen(false);
    setSearchModalOpen(true);
  };

  const handleSearchModalSubmit = async (personalities: string[]) => {
    setSearchModalOpen(false);
    if (currentFormData) {
      const requestDtoBlob = currentFormData.get('requestDto') as Blob;
      const requestDtoText = await requestDtoBlob.text();
      const requestDto = JSON.parse(requestDtoText);
      requestDto.personalities = personalities;
      currentFormData.set(
        'requestDto',
        new Blob([JSON.stringify(requestDto)], { type: 'application/json' })
      );

      addPet(currentFormData, {
        onSuccess: (data) => {
          console.log('반려동물을 성공적으로 추가했습니다:', data);
          setPetInfoOpen(false);
        },
        onError: (error) => {
          console.error('반려동물 추가 에러:', error);
        },
      });

      setCurrentFormData(null);
    } else {
      console.log('currentFormData is null');
    }
  };

  if (isLoading) {
    return (
      <div className='relative flex flex-col items-start min-h-screen bg-center bg-cover z-[-1]'>
        <img
          src={bgImage}
          alt='Background'
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <SplashTemplate type='myPageRocket' className='z-10 w-full h-full ' />
      </div>
    );
  }
  if (error) return <div className='text-red-500'>{error.message}</div>;

  return (
    <div className='flex items-center justify-center flex-grow w-full'>
      <Glass
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('Page changed to:', newPage)}
        showPageIndicator={false}
        className='absolute top-0 left-0 z-0 w-full h-full'
      />
      {isPetInfoOpen ? (
        <PetInfoForm
          headerText='반려동물 정보 입력'
          showPrimaryButton={true}
          text='반려동물 정보를 입력해주세요.'
          onClose={() => setPetInfoOpen(false)}
          onSubmit={handlePetFormSubmit}
          relationshipOptions={[
            '엄마',
            '아빠',
            '언니',
            '누나',
            '형',
            '오빠',
            '친구',
          ]}
        />
      ) : (
        <ProfileSelection
          avatars={
            Array.isArray(pets)
              ? pets.map((pet) => ({
                  src: pet.profileImageUrl,
                  size: 'medium',
                  name: pet.name,
                  id: pet.id,
                }))
              : []
          }
          onAddAvatar={() => setPetInfoOpen(true)}
        />
      )}
      {isSearchModalOpen && (
        <SearchModal
          searchOptions={[
            '친근한',
            '충성스러운',
            '활발한',
            '차분한',
            '보호적인',
            '호기심 많은',
            '독립적인',
            '사교적인',
            '유순한',
            '장난스러운',
            '조용한',
            '충동적인',
            '애교 많은',
            '지적인',
            '게으른',
            '공격적인',
            '소심한',
            '자애로운',
            '순종적인',
            '명랑한',
            '신중한',
            '공손한',
            '다정한',
            '용감한',
            '이기적인',
            '민감한',
            '강렬한',
            '끈기 있는',
            '집착적인',
            '무뚝뚝한',
            '의존적인',
            '자립적인',
            '사랑스러운',
            '의리 있는',
            '겸손한',
            '신뢰할 수 있는',
            '자신감 있는',
            '인내심 있는',
            '호의적인',
            '자주적인',
            '친화적인',
            '충실한',
            '변화무쌍한',
            '고집 센',
            '감정적인',
            '차별 없는',
            '자주적',
            '수동적인',
            '참을성 있는',
            '쾌활한',
            '복종적인',
            '단호한',
            '무관심한',
            '우호적인',
            '동정심 많은',
            '선뜻 나서는',
            '감각적인',
            '충성심 강한',
            '사려 깊은',
            '유머러스한',
            '예민한',
            '관대한',
            '계획적인',
            '과묵한',
            '아기자기한',
            '당당한',
            '정직한',
            '정서적인',
            '조화로운',
            '헌신적인',
            '적극적인',
            '이타적인',
            '순수한',
            '직관적인',
            '낙천적인',
            '내성적인',
            '상냥한',
            '협력적인',
            '사랑받는',
            '창의적인',
            '질투하는',
            '예의 바른',
            '공감하는',
            '자존심 강한',
            '공정한',
            '안정된',
            '냉정한',
            '신속한',
            '원칙적인',
            '참을성 없는',
            '민첩한',
            '솔직한',
            '활기찬',
            '격렬한',
            '상상력 풍부한',
          ]}
          modalTitle='반려동물 성격 선택'
          buttonLabel='작성 완료'
          onClose={() => {
            setSearchModalOpen(false);
            setPetInfoOpen(true);
          }}
          dropdownMaxHeight={300}
          onSubmit={handleSearchModalSubmit}
        />
      )}
    </div>
  );
};
