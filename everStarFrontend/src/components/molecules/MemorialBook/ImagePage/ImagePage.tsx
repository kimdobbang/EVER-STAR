import React from 'react';

export interface ImagePageProps {
  question: string;
  petName: string;
  myImage: string;
  myAnswer: string;
  petImage?: string;
  petAnswer?: string;
}

export const ImagePage: React.FC<ImagePageProps> = ({
  question,
  petName,
  myImage,
  myAnswer,
  petImage,
  petAnswer,
}) => {
  return (
    <div className="relative flex flex-col p-4 h-[508px] w-[360px] mx-auto bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
      <div className="mb-4 text-center">
        <span className="block text-lg font-bold leading-tight tracking-wide font-kor-h-h2 text-greyscaleblack-100">
          Q.
        </span>
        <p className="mt-1 text-base leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
          {question}
        </p>
      </div>
      <div className="flex items-start w-full mt-2">
        <img
          src={myImage}
          alt="My Answer"
          className="w-[150px] h-[150px] object-cover mr-4 shadow-sm rounded-md"
        />
        <div className="flex flex-col w-full">
          <p className="mb-2 text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
            나의 답변
          </p>
          <p className="text-sm leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
            {myAnswer}
          </p>
        </div>
      </div>
      {petImage && petAnswer && (
        <div className="flex items-start w-full mt-4">
          <img
            src={petImage}
            alt="Pet's Answer"
            className="w-[150px] h-[150px] object-cover mr-4 shadow-sm rounded-md"
          />
          <div className="flex flex-col w-full">
            <p className="mb-2 text-sm font-bold leading-5 tracking-wide text-center font-kor-subtitle-subtitle1 text-greyscaleblack-100">
              {petName}의 답변
            </p>
            <p className="text-sm leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100">
              {petAnswer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
