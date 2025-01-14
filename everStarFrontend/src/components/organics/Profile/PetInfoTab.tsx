import React, { useState, useEffect, useCallback } from 'react';
import { Select } from 'components/molecules/input/Select';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Tag } from 'components/atoms/buttons/Tag';
import { fetchPetDetails, PetInfo } from 'api/petApi';
import { usePutProfileImage, useFetchPets } from 'hooks/usePets';

export interface PetInfoTabProps {
  token: string;
}

export const PetInfoTab: React.FC<PetInfoTabProps> = ({ token }) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const [localPetDetails, setLocalPetDetails] = useState<PetInfo | null>(null);
  const [imageKey, setImageKey] = useState(Date.now()); // 이미지 갱신용 키

  const {
    data: pets,
    isLoading: isPetsLoading,
    error: petsError,
  } = useFetchPets(token);

  const fetchDetails = useCallback(async () => {
    if (selectedPetId) {
      try {
        const fetchedDetails = await fetchPetDetails(selectedPetId, token);
        setLocalPetDetails(fetchedDetails);
      } catch (error) {
        console.error('Failed to fetch pet details:', error);
      }
    }
  }, [selectedPetId, token]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const { mutate: updateProfileImage } = usePutProfileImage(
    selectedPetId || 0,
    token,
    {
      onSuccess: async () => {
        // 프로필 이미지가 성공적으로 업데이트된 후 새로고침 없이 상태를 갱신하여 이미지가 즉시 반영되도록 함
        if (selectedPetId) {
          const updatedDetails = await fetchPetDetails(selectedPetId, token);
          setLocalPetDetails(updatedDetails);
          setImageKey(Date.now()); // 이미지 캐시 방지용 키 업데이트
        }
      },
    }
  );

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        await updateProfileImage(formData); // 파일 업로드 후 이미지 즉시 반영
      } catch (error) {
        console.error('Failed to update profile image:', error);
      }
    }
  };

  const onPetSelect = (name: string) => {
    const selectedPet = pets?.find((pet) => pet.name === name);
    if (selectedPet) {
      setSelectedPetId(selectedPet.id);
    }
  };

  if (isPetsLoading) return <div>Loading...</div>;
  if (petsError) return <div className='text-red-500'>{petsError.message}</div>;

  const petOptions = pets ? pets.map((pet) => pet.name) : [];

  return (
    <>
      <Select
        className='custom-class'
        options={petOptions}
        title='반려동물을 선택해주세요'
        starshow={false}
        onOptionSelect={(option) => onPetSelect(option as string)}
        infoText='반려동물을 선택해주세요'
        showLabel={false}
      />
      {localPetDetails && (
        <>
          <Avatar
            size='medium'
            src={`${localPetDetails.profileImageUrl}?${imageKey}`} // 이미지 캐시 방지 및 강제 갱신
            name={localPetDetails.name}
          />
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id='fileInput'
          />
          <PrimaryButton
            theme='white'
            size='medium'
            onClick={() => {
              document.getElementById('fileInput')?.click();
            }}
            disabled={false}
            icon={null}
          >
            프로필 사진 변경
          </PrimaryButton>
          <InputField
            label='이름'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='disable'
            text={localPetDetails.name}
            showCheckIcon={false}
            className=''
          />
          <InputField
            label='나이'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='disable'
            text={localPetDetails.age.toString()}
            showCheckIcon={false}
            className=''
          />
          <InputField
            label='성별'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='disable'
            text={localPetDetails.gender}
            showCheckIcon={false}
            className=''
          />
          <InputField
            label='생김새'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='disable'
            text={localPetDetails.species}
            showCheckIcon={false}
            className=''
          />
          <InputField
            label='관계'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='disable'
            text={localPetDetails.relationship}
            showCheckIcon={false}
            className=''
          />
          <InputField
            label='기일'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='disable'
            text={new Date(localPetDetails.memorialDate).toLocaleDateString()}
            showCheckIcon={false}
            className=''
          />
          <div className='flex justify-center space-x-5'>
            {localPetDetails.personalities.map((trait, index) => (
              <Tag key={index} className='greyscalewhite'>
                #{trait}
              </Tag>
            ))}
          </div>
        </>
      )}
    </>
  );
};
