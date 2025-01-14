import React, { useEffect, useState } from 'react';
import { InteractiveForm } from 'components/templates/InteractiveForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { useNavigate } from 'react-router-dom';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

export const QuestTextTemplate = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [questContent, setQuestContent] = useState('');
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { questid } = useParams<{ questid: string }>();
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    getQuest();
  }, []);

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

  const answerQuestion = async () => {
    const formData = new FormData();
    const requestDto = JSON.stringify({ content: text, type: 'TEXT' });

    const requestDtoBlob = new Blob([requestDto], {
      type: 'application/json',
    });
    formData.append('requestDto', requestDtoBlob);

    try {
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
      console.error('답변 전송 중 오류 발생:', error);
    }
  };

  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  const handleSubmit = async () => {
    const status = await answerQuestion();

    if (status === 200) {
      console.log('성공');
      navigate('/earth');
    } else {
      console.log('실패');
    }
  };

  // 로딩 중이거나 퀘스트 데이터가 없으면 로딩 스피너 또는 빈 화면을 보여줌
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
        <SplashTemplate type='quest' className='z-10 w-full h-full ' />
      </div>
    );
  }

  return (
    <div className='w-full h-full'>
      <InteractiveForm
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('Page changed to:', newPage)}
        headerText='오늘의 질문'
        letterCardType='default'
        letterCardColor='white'
        letterCardState='notReceived'
        letterCardMessage={questContent} // 로드된 퀘스트 내용 표시
        centered={true}
        textboxLabel='답변'
        largeButtonText='이미지 추가'
        smallButtonText='작성완료'
        showPrimaryButton={false}
        onTextChange={handleTextChange}
        value={text}
        onButtonClick={handleSubmit}
        onLeftIconClick={() => navigate(-1)}
        glassEffect={false}
        className={'flex justify-center h-full w-full'}
      />
    </div>
  );
};
