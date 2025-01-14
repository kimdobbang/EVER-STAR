import React, { useState, useEffect } from 'react';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { InputField } from 'components/organics/input/InputFields';
import { Select } from 'components/molecules/input/Select';
import { DateInputField } from 'components/organics/input/DateInputField';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';

export interface PetInfoFormProps {
  headerText: string;
  smallButtonText?: string;
  showPrimaryButton?: boolean;
  text: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  relationshipOptions: string[];
}

export interface PetFormData {
  name: string;
  age: number;
  memorialDate: Date | null;
  species: string;
  gender: string;
  relationship: string;
  profileImage: File | null;
}

export const PetInfoForm: React.FC<PetInfoFormProps> = ({
  headerText,
  showPrimaryButton = true,
  text,
  onClose,
  onSubmit,
  relationshipOptions,
}) => {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    age: -1,
    memorialDate: null,
    species: '',
    gender: '',
    relationship: '',
    profileImage: null,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [dynamicRelationshipOptions, setDynamicRelationshipOptions] =
    useState<string[]>(relationshipOptions);

  useEffect(() => {
    const {
      name,
      age,
      memorialDate,
      species,
      gender,
      relationship,
      profileImage,
    } = formData;
    setIsFormValid(
      name !== '' &&
        (age === -1 || (age >= 0 && age <= 999)) &&
        memorialDate !== null &&
        species !== '' &&
        gender !== '' &&
        relationship !== '' &&
        profileImage !== null
    );
  }, [formData]);

  const handleButtonClick = () => {
    const formattedFormData = new FormData();
    const requestDto = {
      name: formData.name,
      age: formData.age,
      memorialDate: formData.memorialDate
        ? formData.memorialDate.toISOString().split('T')[0]
        : null,
      species: formData.species,
      gender: formData.gender,
      relationship: formData.relationship,
    };
    formattedFormData.append(
      'requestDto',
      new Blob([JSON.stringify(requestDto)], { type: 'application/json' })
    );
    if (formData.profileImage) {
      formattedFormData.append('profileImage', formData.profileImage);
    }

    console.log('Form Submitted', formattedFormData);
    onSubmit(formattedFormData);
  };

  const handleInputChange = (
    field: keyof PetFormData,
    value: string | number | Date | null | File | string[]
  ) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    if (field === 'gender') {
      if (value === 'MALE') {
        setDynamicRelationshipOptions(['형', '누나', '아빠', '엄마', '친구']);
      } else if (value === 'FEMALE') {
        setDynamicRelationshipOptions(['오빠', '언니', '아빠', '엄마', '친구']);
      } else {
        setDynamicRelationshipOptions(relationshipOptions);
      }
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const ageValue = value === '' ? -1 : parseInt(value, 10);

    if (/^\d*$/.test(value) && ageValue >= 0 && ageValue <= 999) {
      handleInputChange('age', ageValue);
    } else if (value === '') {
      handleInputChange('age', -1);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleInputChange('profileImage', event.target.files[0]);
    }
  };

  return (
    <div className='flex justify-center w-full h-full fixed-top'>
      <div className='z-20 flex flex-col items-center w-full max-w-md gap-8 p-5 bg-white rounded-lg shadow-md'>
        <ModalHeader text={headerText} onLeftIconClick={onClose} />
        <div className='flex flex-col items-center w-full gap-8 p-5'>
          <div className='flex flex-col w-full'>
            <div
              className="left-0 text-left [font-family:'Noto_Sans_KR-Medium',Helvetica] font-medium text-[#1f2329] text-2xl tracking-[-2.40px] leading-[normal]"
              dangerouslySetInnerHTML={{
                __html: text.replace(/\n/g, '<br />'),
              }}
            />
          </div>

          <InputField
            label='이름'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            text={formData.name}
            showCheckIcon={false}
            className=''
            onChange={(e) => handleInputChange('name', e.target.value)}
          />

          <InputField
            label='나이'
            showLabel={true}
            showValidationText={false}
            starshow={false}
            state='default'
            text={formData.age === -1 ? '' : formData.age.toString()}
            showCheckIcon={false}
            className=''
            onChange={handleAgeChange}
          />

          <PrimaryButton
            theme='white'
            size='large'
            onClick={() => document.getElementById('photoInput')?.click()}
            disabled={false}
            icon={null}
            hug={false}
            label='프로필 사진'
            showLabelStar={true}
          >
            이미지 추가
          </PrimaryButton>
          {formData.profileImage && (
            <span className='text-sm text-gray-600'>
              {formData.profileImage.name}
            </span>
          )}
          <input
            type='file'
            id='photoInput'
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />

          <Select
            label='성별'
            className=''
            options={['남성', '여성']}
            title='성별을 선택하세요'
            showLabel={true}
            starshow={true}
            onOptionSelect={(option) =>
              handleInputChange('gender', option === '남성' ? 'MALE' : 'FEMALE')
            }
            infoText=''
            showIcon={true}
          />

          <InputField
            label='어떻게 생긴 아이인가요?'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            text={formData.species}
            showCheckIcon={false}
            className=''
            onChange={(e) => handleInputChange('species', e.target.value)}
            placeholder='갈색 푸들'
          />

          <Select
            label='관계'
            className=''
            options={dynamicRelationshipOptions}
            title='아이에게 당신은 어떤 존재인가요?'
            showLabel={true}
            starshow={true}
            onOptionSelect={(option) =>
              handleInputChange('relationship', option as string)
            }
            infoText=''
            showIcon={true}
            dropdownMaxHeight={150}
          />

          <DateInputField
            label='떠난 날'
            showLabel={true}
            showValidationText={false}
            starshow={true}
            state='default'
            date={
              formData.memorialDate ? new Date(formData.memorialDate) : null
            }
            placeholder='떠난 날을 선택하세요'
            onChange={(date) => handleInputChange('memorialDate', date)}
          />

          <div className='flex justify-end w-full mt-5'>
            {showPrimaryButton && (
              <PrimaryButton
                theme='white'
                size='small'
                onClick={handleButtonClick}
                disabled={!isFormValid}
                icon={<ArrowIcon color='black' direction='right' size={24} />}
                hug={true}
              ></PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
