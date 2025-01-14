import React from 'react';

interface QuestionPageProps {
  title: string;
  myAnswer: string; // Required prop
  myImage?: string; // Optional prop
  petName: string;
  petAnswer?: string; // Optional prop
  petImage?: string; // Optional prop
}

const getFontSize = (text: string) => {
  if (text.length > 200) return 'text-xs';
  if (text.length > 150) return 'text-sm';
  return 'text-base';
};

const QuestionPage: React.FC<QuestionPageProps> = ({
  title,
  myAnswer,
  myImage,
  petName,
  petAnswer,
  petImage,
}) => {
  return (
    <div className='relative flex flex-col p-4 h-[508px] w-[360px] mx-auto bg-white border border-gray-300 shadow-md overflow-hidden'>
      {/* 질문 */}
      <div className='mb-4 text-center'>
        <span className='block text-lg font-bold leading-tight tracking-wide font-kor-h-h2 text-greyscaleblack-100'>
          Q.
        </span>
        <p
          className={`mt-1 leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(title)}`}
        >
          {title}
        </p>
      </div>

      {/* My Answer & My Image */}
      {myAnswer && myImage && (
        <div className='flex items-start w-full mb-4'>
          <img
            src={`${myImage}?timestamp=${Date.now()}`}
            alt='My Answer'
            className='w-[150px] h-[150px] object-cover mr-4 shadow-sm rounded-md'
            crossOrigin='anonymous'
          />
          <div className='flex flex-col'>
            <p className='text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100'>
              나의 답변
            </p>
            <p
              className={`mt-1 leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(
                myAnswer,
              )}`}
            >
              {myAnswer}
            </p>
          </div>
        </div>
      )}

      {/* My Answer Only */}
      {myAnswer && !myImage && (
        <div className='flex flex-col w-full mb-4'>
          <p className='text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100'>
            나의 답변
          </p>
          <p
            className={`mt-1 leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(
              myAnswer,
            )}`}
          >
            {myAnswer}
          </p>
        </div>
      )}

      {/* My Image Only */}
      {myImage && !myAnswer && (
        <div className='flex items-center justify-between w-full mb-4'>
          <p className='text-sm font-bold leading-5 tracking-wide font-kor-subtitle-subtitle1 text-greyscaleblack-100'>
            나의 답변
          </p>
          <img
            src={`${myImage}?timestamp=${Date.now()}`}
            alt='My Answer'
            className='w-[150px] h-[150px] object-cover shadow-sm rounded-md'
            crossOrigin='anonymous'
          />
        </div>
      )}

      {/* Pet Answer Only */}
      {petAnswer && !petImage && (
        <div className='flex flex-col w-full mb-4'>
          <p className='text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100'>
            {petName}의 답변
          </p>
          <p
            className={`mt-1 leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(
              petAnswer,
            )}`}
          >
            {petAnswer}
          </p>
        </div>
      )}

      {/* Pet Image Only */}
      {petImage && !petAnswer && (
        <div className='flex items-center justify-between w-full mb-4'>
          <p className='text-sm font-bold leading-5 tracking-wide font-kor-subtitle-subtitle1 text-greyscaleblack-100'>
            {petName}의 답변
          </p>
          <img
            src={`${petImage}?timestamp=${Date.now()}`}
            alt={`${petName}의 답변`}
            className='w-[150px] h-[150px] object-cover shadow-sm rounded-md'
            crossOrigin='anonymous'
          />
        </div>
      )}

      {/* No Pet Answer or Image */}
      {!petAnswer && !petImage && (
        <div className='flex flex-col w-full mb-4'>
          {/* 이 경우에는 펫의 답변이나 이미지가 없으므로 아무것도 렌더링하지 않음 */}
        </div>
      )}
    </div>
  );
};

export { QuestionPage };
export type { QuestionPageProps };
