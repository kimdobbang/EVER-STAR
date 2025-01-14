import React, { useEffect, useState } from 'react';
import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { Glass } from 'components/molecules/Glass/Glass';
import { LetterBox } from 'components/organics/LetterBox/LetterBox';
import { useNavigate } from 'react-router-dom';
import { useFetchLetterPet } from 'hooks/useEarth';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

interface Letter {
  id: number;
  type: 'default' | 'send' | 'receive';
  color: 'white' | 'bgorange' | 'orange' | 'gray';
  state: 'received' | 'notReceived';
  name: string;
  sendMessage: string;
  dateTime: string;
}

interface LetterBoxTemplateProps {
  letterData: Letter[];
  currentPage: number;
  totalPages?: number;
  onPageChange: (newPage: number) => void;
  headerText: string;
}

const LetterBoxTemplate: React.FC<LetterBoxTemplateProps> = ({
  currentPage,
  onPageChange,
  headerText,
}) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useFetchLetterPet();

  const [itemPage, setItemPage] = useState(3);

  // 화면 크기에 따라 itemPage 값 설정
  useEffect(() => {
    const handleResize = () => {
      setItemPage(window.innerWidth >= 768 ? 4 : 3);
    };

    handleResize(); // 초기 설정
    window.addEventListener('resize', handleResize); // 창 크기 변화에 따른 반응형 처리

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 로딩 및 오류 상태 처리
  if (isLoading) {
    return (
      <div className="relative flex flex-col items-start min-h-screen bg-center bg-cover z-[-1]">
        <img
          src={bgImage}
          alt="Background"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <SplashTemplate type="LetterBoxRocket" className="z-10 w-full h-full " />
      </div>
    );
  }
  if (isError) return <div>Error loading data</div>;

  const petLetters =
    data?.data?.content?.map(
      (item: {
        petLetterId: number;
        isRead: boolean;
        petName: string;
        content: string;
        createAt: string;
      }) => ({
        id: item.petLetterId,
        type: 'default',
        color: 'white',
        state: item.isRead ? 'received' : 'notReceived',
        name: item.petName,
        sendMessage: item.content.length > 10 ? item.content.slice(0, 10) + '...' : item.content, // 10글자 초과 시 '...' 추가
        dateTime: new Date(item.createAt).toLocaleString(),
      }),
    ) || [];
  const letterLength = petLetters.length;
  const letterTotalPage = Math.floor(letterLength / itemPage) + 1;

  const handleLetterClick = (id: number) => {
    navigate(`/earth/letter/${id}`);
  };

  return (
    <div className="relative flex flex-col items-center ">
      <div className="absolute inset-0 flex items-center justify-center">
        <Glass
          currentPage={currentPage}
          totalPages={letterTotalPage}
          onPageChange={onPageChange}
          showPageIndicator={true}
          className="flex flex-col w-full h-[111%] sm:w-4/5 md:w-3/5 lg:w-2/5 sm:h-4/5"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center w-full h-full max-w-5xl p-10 pt-20 overflow-visible sm:p-8">
        <ModalHeader text={headerText} onLeftIconClick={() => navigate(-1)} />
        <div className="flex flex-col items-center w-full mt-9 sm:mt-20">
          <LetterBox
            letters={petLetters}
            onLetterClick={handleLetterClick}
            currentPage={currentPage}
            itemsPerPage={itemPage}
          />
        </div>
      </div>
    </div>
  );
};

export { LetterBoxTemplate };
