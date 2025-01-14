import React from 'react';

export interface ChartContentProps {
  title: string;
  content: string;
}

export const ChartContent: React.FC<ChartContentProps> = ({ title, content }) => {
  return (
    <div className="relative flex flex-col items-center p-4 h-[508px] w-[360px] mx-auto bg-white border border-gray-300 shadow-md">
      <div className="mb-20 text-center">
        <h2 className="text-2xl font-bold leading-snug tracking-wide text-greyscaleblack-100">
          {title}
        </h2>
        <p className="mt-4 text-lg leading-relaxed tracking-wide text-greyscaleblack-100">
          {content}
        </p>
      </div>
    </div>
  );
};
