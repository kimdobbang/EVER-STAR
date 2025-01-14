import React from 'react';
import { MoveContainer } from 'components/organics/input/MoveContainer/MoveContainer';
import { useNavigate } from 'react-router-dom';
import { Glass } from 'components/molecules/Glass/Glass';

interface EverStarSearchStarProps {}

export const MyinfoMove: React.FC<EverStarSearchStarProps> = () => {
  const navigate = useNavigate();

  const handleNextPage1Click = () => {
    navigate('/mypage/myinfo');
  };

  const handleNextPage2Click = () => {
    navigate('/mypage/profile');
  };

  const handleLeftIconClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className='relative flex flex-col items-center justify-center w-full min-h-screen'>
      {/* <div
        className='absolute inset-0 rounded-[20px] overflow-hidden border-[0.5px] border-solid '
        style={{
          backgroundImage: `url(${glassBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // width: '100%',
          // height: '100%',
          // zIndex: 1,
          // borderRadius: '40px',
        }}
      ></div> */}
      <Glass
        currentPage={1}
        totalPages={1}
        onPageChange={(newPage) => console.log('Page changed to:', newPage)}
        showPageIndicator={false}
        className='absolute top-0 bottom-0 left-0 right-0 z-0'
      />
      <div className='relative z-10 flex flex-col items-center justify-center w-full h-full'>
        <MoveContainer
          title='마이 페이지'
          nextPage1='mypage'
          nextPage2='profile'
          onNextPage1Click={handleNextPage1Click}
          onNextPage2Click={handleNextPage2Click}
          onLeftIconClick={handleLeftIconClick} // 뒤로 가기 핸들러 추가
        />
      </div>
    </div>
  );
};

export type { EverStarSearchStarProps };
