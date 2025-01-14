// src/components/organics/Profile/UserInfoTab.tsx
import React from 'react';
import { InputField } from 'components/organics/input/InputFields';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

export interface UserInfoTabProps {
  userInfo: {
    name: string;
    birthdate: string;
    gender: string;
    email: string;
    phone: string;
  };
  smallButtonText: string;
  onButtonClick: () => void;
}

export const UserInfoTab: React.FC<UserInfoTabProps> = ({
  userInfo,
  onButtonClick,
}) => {
  return (
    <>
      <InputField
        label='이름'
        showLabel={true}
        showValidationText={false}
        starshow={false}
        state='disable'
        text={userInfo.name}
        showCheckIcon={false}
        className=''
      />
      <InputField
        label='생년월일'
        showLabel={true}
        showValidationText={false}
        starshow={false}
        state='disable'
        text={userInfo.birthdate}
        showCheckIcon={false}
        className=''
      />
      <InputField
        label='성별'
        showLabel={true}
        showValidationText={false}
        starshow={false}
        state='disable'
        text={userInfo.gender}
        showCheckIcon={false}
        className=''
      />
      <InputField
        label='이메일'
        showLabel={true}
        showValidationText={false}
        starshow={false}
        state='disable'
        text={userInfo.email}
        showCheckIcon={false}
        className=''
      />
      <InputField
        label='전화번호'
        showLabel={true}
        showValidationText={false}
        starshow={false}
        state='disable'
        text={userInfo.phone}
        showCheckIcon={false}
        className=''
        placeholder='전화번호를 입력해 주세요'
      />
      <div className='p-auto'>
        <PrimaryButton
          theme='white'
          size='large'
          onClick={onButtonClick}
          disabled={false}
          icon={null}
          hug={false}
        >
          로그아웃
        </PrimaryButton>
      </div>
    </>
  );
};
