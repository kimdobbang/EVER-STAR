import React, { useState, useEffect } from 'react';
import { Select } from 'components/molecules/input/Select';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Tag } from 'components/atoms/buttons/Tag';
import { fetchPetDetails, PetInfo } from 'api/petApi';

export interface PetInfoTabProps {
  petOptions: string[];
  petInfo: { [key: string]: PetInfo };
  onPetSelect: (name: string) => void;
  token: string;
}

export const PetInfoTab: React.FC<PetInfoTabProps> = ({
  petOptions,
  petInfo,
  onPetSelect,
  token,
}) => {
  const [selectedPet, setSelectedPet] = useState<string | null>(null);
  const [localPetDetails, setLocalPetDetails] = useState<PetInfo | null>(null);

  const handlePetSelect = async (option: string | number) => {
    const petName = option as string;
    setSelectedPet(petName);

    const petDetails = petInfo[petName];
    if (petDetails) {
      try {
        const fetchedDetails = await fetchPetDetails(petDetails.id, token); // API 호출
        setLocalPetDetails(fetchedDetails); // 로컬 상태로 관리
      } catch (error) {
        console.error('Failed to fetch pet details:', error);
      }
    }
    onPetSelect(petName);
  };

  useEffect(() => {
    if (selectedPet) {
      const petDetails = petInfo[selectedPet];
      if (petDetails) {
        setLocalPetDetails(petDetails);
      }
    }
  }, [selectedPet, petInfo]);

  return (
    <>
      <Select
        className="custom-class"
        options={petOptions}
        title="반려동물을 선택해주세요"
        starshow={false}
        onOptionSelect={handlePetSelect}
        infoText="반려동물을 선택해주세요"
        showLabel={false}
      />
      {localPetDetails && (
        <>
          <Avatar size="medium" src={localPetDetails.profileImageUrl} name={localPetDetails.name} />
          <PrimaryButton
            theme="white"
            size="medium"
            onClick={() => console.log('Change profile picture')}
            disabled={false}
            icon={null}
          >
            프로필 사진 변경
          </PrimaryButton>
          <InputField
            label="이름"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={localPetDetails.name}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="나이"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={localPetDetails.age.toString()}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="성별"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={localPetDetails.gender}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="종류"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={localPetDetails.species}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="관계"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={localPetDetails.relationship}
            showCheckIcon={false}
            className=""
          />
          <InputField
            label="기일"
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state="disable"
            text={new Date(localPetDetails.memorialDate).toLocaleDateString()}
            showCheckIcon={false}
            className=""
          />
          <div className="flex justify-center space-x-5">
            {localPetDetails.personalities.map((trait, index) => (
              <Tag key={index} className="greyscalewhite">
                #{trait}
              </Tag>
            ))}
          </div>
        </>
      )}
    </>
  );
};