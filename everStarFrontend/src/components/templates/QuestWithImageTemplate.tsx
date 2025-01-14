/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { useState, useEffect } from 'react';
import { InteractiveForm } from 'components/templates/InteractiveForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { useNavigate } from 'react-router-dom';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

export const QuestWithImageTemplate = () => {
  // headerText와 letterCardMessage를 오버라이드
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>();
  const [imageText, setImageText] = useState('이미지 추가');
  const [questContent, setQuestContent] = useState('');
  const [loading, setLoading] = useState(true);

  const { questid } = useParams<{ questid: string }>();
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    getQuest();

    if (image) {
      setImageText(image.name);
    }
  }, [image]);

  const getQuest = async () => {
    try {
      const response = await axios.get(
        `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data) {
        setQuestContent(response.data.data.content);
      }
    } catch (error) {
      console.error('퀘스트 데이터를 가져오는 중 오류 발생:', error);
      navigate('/earth');
    } finally {
      setLoading(false); // 데이터 로딩 후 로딩 상태 업데이트
    }
  };

  const answerImageQuestion = async () => {
    if (text && accessToken && petId && image) {
      // FormData 객체 생성
      const formData = new FormData();

      // JSON 데이터 준비
      const requestDto = JSON.stringify({ content: text, type: 'TEXT_IMAGE' });

      const requestDtoBlob = new Blob([requestDto], {
        type: 'application/json',
      });
      // JSON 데이터를 FormData에 추가
      formData.append('requestDto', requestDtoBlob);

      if (image) {
        formData.append('imageFile', image);
      } else {
        const emptyFile = new File([new Blob()], '', { type: 'image/jpeg' });
        formData.append('imageFile', emptyFile);
      }

      try {
        // POST 요청을 FormData와 함께 전송
        const response = await axios.post(
          `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}/answers`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        return response.status;
      } catch (error) {
        console.error('Error:', error);
        alert('다시 입력해 주세요');
      }
    } else {
      console.error('Required data is missing');
      alert('다시 입력해 주세요');
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async () => {
    const status = await answerImageQuestion();

    if (status === 200) {
      navigate('/earth');
    } else {
      console.log('실패');
    }
  };

  const handleButtonClick2 = async () => {
    document.getElementById('photoInput')?.click();
  };

  if (loading) {
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

  return (
    <div className='flex items-center justify-center flex-grow'>
      <div className='w-full h-full max-w-md '>
        <InteractiveForm
          currentPage={1}
          totalPages={1}
          onPageChange={(newPage) => console.log('Page changed to:', newPage)}
          headerText='오늘의 질문'
          letterCardType='send'
          letterCardColor='white'
          letterCardState='notReceived'
          letterCardMessage={questContent}
          centered={true}
          textboxLabel='답변'
          largeButtonText={imageText}
          smallButtonText='작성완료'
          showPrimaryButton={true}
          onTextChange={handleTextChange}
          value={text}
          onButtonClick={handleSubmit}
          onButtonClick2={handleButtonClick2}
          onLeftIconClick={() => navigate(-1)}
          glassEffect={false}
          className={'flex justify-center h-full w-full'}
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
