import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import { SignUpForm } from 'components/organics/SignUpForm/SignUpForm';
import { PhoneNumberModal } from 'components/organics/PhoneNumberModal/PhoneNumberModal';
import {
  useSendVerificationCode,
  useVerifyAuthCode,
  useJoinUser,
} from 'hooks/useAuth';

interface UserInfo {
  email: string;
  userName: string;
  phoneNumber: string;
  birthDate: string;
  gender: string;
  questReceptionTime: string;
}

export const SignUp: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [formData, setFormData] = useState<UserInfo>({
    email: '',
    userName: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    questReceptionTime: '',
  });

  const navigate = useNavigate(); // useNavigate 훅 사용
  const { mutate: mutateSendCode } = useSendVerificationCode();
  const { mutate: mutateVerifyCode } = useVerifyAuthCode();
  const { mutate: mutateJoinUser } = useJoinUser();

  const handleSignUpButtonClick = (
    phoneNumber: string,
    email: string,
    userName: string,
    birthDate: string,
    gender: string,
    questReceptionTime: string
  ) => {
    setPhone(phoneNumber);
    setFormData({
      email,
      userName,
      phoneNumber,
      birthDate,
      gender,
      questReceptionTime,
    });
    setModalOpen(true);
    mutateSendCode(phoneNumber, {
      onError: (error: unknown) => {
        const err = error as Error;
        console.error('Error sending verification code:', err.message);
        if (err.message.includes('400')) {
          alert('잘못된 전화번호입니다. 다시 확인해주세요.');
        }
      },
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleResend = () => {
    mutateSendCode(formData.phoneNumber, {
      onError: (error: unknown) => {
        const err = error as Error;
        console.error('Error resending verification code:', err.message);
        if (err.message.includes('400')) {
          alert('잘못된 전화번호입니다. 다시 확인해주세요.');
        }
      },
    });
  };

  const handleVerifyAndJoin = (certificationNumber: string) => {
    mutateVerifyCode(
      { phone, certificationNumber },
      {
        onSuccess: () => {
          mutateJoinUser(formData, {
            onSuccess: () => {
              navigate('/tutorial'); // 튜토리얼 라우터로 이동
            },
            onError: (error: unknown) => {
              const err = error as Error;
              console.error('Error joining user:', err.message);
            },
          });
        },
        onError: (error: unknown) => {
          const err = error as Error;
          console.error('Error verifying auth code:', err.message);
          if (err.message.includes('400')) {
            alert('잘못된 인증번호입니다. 다시 확인해주세요.');
          }
        },
      }
    );
  };

  return (
    <div className='flex items-center justify-center flex-grow'>
      <SignUpForm
        headerText='회원가입'
        smallButtonText=''
        showPrimaryButton={true}
        text='회원가입을 위해 정보를 입력해주세요.'
        onButtonClick={handleSignUpButtonClick}
      />
      <PhoneNumberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onResend={handleResend}
        onVerify={handleVerifyAndJoin}
        text='인증번호를 <br /> 입력해 주세요'
      />
    </div>
  );
};
