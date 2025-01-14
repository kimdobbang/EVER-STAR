import React from 'react';

interface DiaryPageProps {
  title: string;
  content: string;
  imageUrl?: string;
  createdTime?: string; // Creation date prop
}

const getFontSize = (text: string) => {
  if (text.length > 200) return 'text-xs';
  if (text.length > 150) return 'text-sm';
  return 'text-base';
};

export const DiaryPage: React.FC<DiaryPageProps> = ({ title, content, imageUrl, createdTime }) => {
  // Props 확인을 위한 console.log 추가
  console.log('DiaryPage Props:', {
    title,
    content,
    imageUrl,
    createdTime,
  });

  return (
    <div className="relative flex flex-col items-center p-5 h-[508px] w-[360px] mx-auto bg-white border border-gray-300 shadow-md">
      <div className="w-full mb-2 text-center">
        <h2 className="text-xl font-bold leading-tight tracking-wide text-greyscaleblack-100">
          {title}
        </h2>
        {createdTime && (
          <p className="text-sm text-gray-500">{new Date(createdTime).toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex flex-col items-center w-full mt-4 space-y-4">
        {imageUrl && (
          <img
            src={`${imageUrl}?timestamp=${Date.now()}`}
            alt="Diary entry"
            className="w-[180px] h-[135px] object-cover"
            crossOrigin="anonymous"
          />
        )}
        <p
          className={`leading-tight tracking-wide font-kor-p-p1 text-greyscaleblack-100 ${getFontSize(content)}`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};
