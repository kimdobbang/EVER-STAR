import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InteractiveForm } from 'components/templates/InteractiveForm';
import { useFetchLetterPetDetail, useFetchLetterRePost } from 'hooks/useEarth';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

export const LetterDetailTemplate: React.FC = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const letterid = useParams();
  const {
    data: letterData,
    isLoading,
    isError,
  } = useFetchLetterPetDetail(Number(letterid.id));

  const [letterCardType, setLetterCardType] = useState<
    'receive' | 'default' | 'send'
  >('receive');
  const [primaryButtonDisabled, setPrimaryButtonDisabled] =
    useState<boolean>(true);

  const navigate = useNavigate();
  const petName = useSelector((state: RootState) => state.pet.petDetails?.name);

  const { mutate: letterPost } = useFetchLetterRePost(
    token,
    Number(petId),
    Number(letterid.id)
  );

  useEffect(() => {
    if (letterData && letterData.data) {
      if (letterData.data.userLetter.petName === '') {
        setLetterCardType('send');
        setPrimaryButtonDisabled(false);
        letterData.data.userLetter.petName = petName; // petName이 비어있을 경우 Redux의 petName으로 채워줌
      } else {
        setLetterCardType('receive');
        setPrimaryButtonDisabled(true);
      }
    }
  }, [letterData, petName]); // letterData 또는 petName이 변경될 때만 useEffect 실행

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
        <SplashTemplate
          type='LetterBoxRocket'
          className='z-10 w-full h-full '
        />
      </div>
    );
  }

  if (isError || !letterData) {
    return <div>Error loading letter data</div>;
  }

  // 뒤로 가기 버튼 클릭 핸들러
  const handleBackButtonClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleReplyClick = () => {
    navigate(`/earth/letter/post/${letterid.id}`);
  };

  const handleButtonClick = async () => {
    if (text && token && petId && letterid.id) {
      const formData = new FormData();

      // requestDto를 Blob으로 만들어서 application/json 타입으로 추가
      const requestDto = JSON.stringify({ content: text });
      const requestDtoBlob = new Blob([requestDto], {
        type: 'application/json',
      });
      formData.append('requestDto', requestDtoBlob);

      if (image) {
        formData.append('image', image);
      } else {
        const emptyFile = new File([new Blob()], '', { type: 'image/jpeg' });
        formData.append('image', emptyFile);
      }
      // formData를 사용하여 letterPost 호출
      letterPost(formData, {
        onSuccess: (data) => {
          console.log('편지보내기 성공적:', data);
          navigate('/earth');
        },
        onError: (error) => {
          console.error('편지보내기 에러:', error);
        },
      });
    } else {
      console.error('Required data is missing');
    }
  };

  const handleButtonClick2 = async () => {
    document.getElementById('photoInput')?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='w-full h-full'>
        <InteractiveForm
          currentPage={1}
          totalPages={1}
          onPageChange={(newPage) => console.log(`Page changed to ${newPage}`)}
          headerText='편지 자세히 보기'
          letterCardType={letterCardType}
          letterCardColor='bgorange'
          letterCardState='received'
          letterCardMessage={letterData.data.petLetter.content}
          letterCardClassName=''
          centered={true}
          textboxLabel='내용'
          largeButtonText='이미지 추가'
          smallButtonText='답장하기'
          showPrimaryButton={true}
          customText=''
          petName={letterData.data.userLetter.petName}
          myName='나'
          myMessage={letterData.data.userLetter.content}
          dateTime={letterData.data.userLetter.createAt}
          onLeftIconClick={handleBackButtonClick}
          primaryButtonDisabled={primaryButtonDisabled}
          handleReplyClick={handleReplyClick}
          onTextChange={handleTextChange}
          onButtonClick={handleButtonClick}
          onButtonClick2={handleButtonClick2}
          value={text}
        />
        <input
          type='file'
          id='photoInput'
          accept='image/*'
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
