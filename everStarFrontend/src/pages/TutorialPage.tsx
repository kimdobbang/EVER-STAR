import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// 로컬 이미지 가져오기
import tutorial1 from 'assets/images/tutorial1.png';
import tutorial2 from 'assets/images/tutorial2.png';
import tutorial3 from 'assets/images/tutorial3.png';
import tutorial4 from 'assets/images/tutorial4.png';
import tutorial5 from 'assets/images/tutorial5.png';

const images = [tutorial1, tutorial2, tutorial3, tutorial4, tutorial5];

export const TutorialPage = () => {
  const sliderRef = React.useRef<Slider>(null);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    const lastSlideIndex = images.length - 1;
    if (sliderRef.current) {
      if (currentSlide === lastSlideIndex) {
        navigate('/mypage/profile'); // 마지막 슬라이드에서 /earth로 네비게이트
      } else {
        sliderRef.current.slickNext();
      }
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleSkip = () => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(images.length - 1); // 마지막 슬라이드로 이동
    }
  };

  return (
    <div className='relative flex flex-col w-full h-screen bg-gray-100'>
      {/* 슬라이더 */}
      <div className='flex-grow'>
        <Slider
          ref={sliderRef}
          infinite={false}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          dots={true}
          arrows={false}
          beforeChange={(current, next) => setCurrentSlide(next)} // 슬라이드 변경 시 상태 업데이트
        >
          {images.map((image, index) => (
            <div key={index} className='relative h-[calc(100vh-8rem)]'>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className='object-contain w-full h-full'
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* 하단 버튼 */}
      <div className='flex items-center justify-between px-6 py-4 bg-white sm:px-10 md:px-20 lg:px-40 xl:px-60'>
        <button
          onClick={handleSkip}
          className='text-lg font-medium text-orange-500'
        >
          스킵
        </button>
        <div className='flex space-x-3'>
          <button
            onClick={handlePrev}
            className='px-4 py-2 text-white bg-orange-300 rounded'
          >
            이전
          </button>
          <button
            onClick={handleNext}
            className='px-4 py-2 text-white bg-orange-300 rounded'
          >
            {currentSlide === images.length - 1 ? '시작하기' : '다음'}{' '}
            {/* 마지막 슬라이드면 "Start"로 변경 */}
          </button>
        </div>
      </div>
    </div>
  );
};
