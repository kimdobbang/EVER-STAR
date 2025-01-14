import React, { useState } from 'react';
import { CheerMessage, CheerMessageProps } from 'components/organics/CheerMessage/CheerMessage';
import { useFetchCheeringPet } from 'hooks/useEverStar';
import bgImage from 'assets/images/bg-login.webp';
import { SplashTemplate } from './SplashTemplate';

export const EverStarCheerMessage: React.FC<
  Omit<CheerMessageProps, 'currentPage' | 'onPageChange'>
> = (props) => {
  const { data, isLoading, isError } = useFetchCheeringPet();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  // 로딩 및 오류 상태 처리
  if (isLoading) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover">
        <img
          src={bgImage}
          alt="Background"
          className="absolute inset-0 object-cover w-100 h-100"
          style={{ zIndex: -1 }}
        />
        <SplashTemplate type="everCheerRocket" className="z-10 w-full h-full" />
      </div>
    );
  }

  if (isError) return <div>Error loading data</div>;

  const postItCards =
    data?.data?.content?.map(
      (item: {
        content: string;
        petName: string;
        color: string;
        cheeringMessageId: number;
        petId: number;
        relationShip: string;
      }) => ({
        contents: item.content || '',
        name: item.petName + ' ' + item.relationShip || '',
        color: item.color.toLowerCase() || '',
        cheeringMessageId: item.cheeringMessageId,
        petId: item.petId,
      }),
    ) || [];
  const totalPages = Math.ceil(postItCards.length / 10);

  return (
    <div className="relative flex flex-col">
      <div className="flex-grow">
        <CheerMessage
          {...props}
          postItCards={postItCards}
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};
