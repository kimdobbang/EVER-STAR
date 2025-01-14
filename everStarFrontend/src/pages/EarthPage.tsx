import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { EarthMain } from 'components/templates/EarthMain';
import { LetterBoxTemplate } from 'components/templates/LetterBoxTemplate';
import { Footer } from 'components/molecules/Footer/Footer';
import {
  LetterColor,
  LetterState,
} from 'components/molecules/cards/LetterCard/LetterCard';
import { LetterDetailTemplate } from 'components/templates/LetterDetailTemplate';
import { LetterWriteTemplate } from 'components/templates/LetterWriteTemplate';
import { QuestRouter } from 'components/templates/QuestRouter';
import { QuestOpenviduTemplate } from 'components/templates/QuestOpenviduTemplate';

import bgImage from 'assets/images/bg-earth.webp';
import { RootState } from 'store/Store';
import { useSelector } from 'react-redux';
import { useFetchOtherPetDetails } from 'hooks/useEverStar';
import { QuestPuzzle } from 'components/templates/QuestPuzzle';
import { PrivateRoute, PetDetailsRoute } from 'ProtectedRoutes';
import { SplashTemplate } from 'components/templates/SplashTemplate';

interface PetProfile {
  name: string;
  age: number;
  description: string;
  date: string;
  tagList: string[];
  avatarUrl: string;
  questIndex: number;
}

export const EarthPage: React.FC = () => {
  const PetId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: petDetails,
    isLoading: isPetDetailsLoading,
    error: petDetailsError,
  } = useFetchOtherPetDetails(PetId ?? -1);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (PetId === undefined || isPetDetailsLoading || petDetailsError) {
      console.log('No Pet Details Available');
    }
  }, [PetId, isPetDetailsLoading, petDetailsError]);

  if (PetId === undefined) {
    return <div>No Pet ID</div>;
  }

  if (isPetDetailsLoading) {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover z-[-1]'>
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
        <SplashTemplate type='earthPage' className='z-10 w-full h-full ' />
      </div>
    );
  }

  if (petDetailsError || !petDetails) {
    return <div>No pet details available.</div>;
  }

  const petProfile: PetProfile = {
    name: petDetails.name,
    age: petDetails.age,
    description: petDetails.introduction,
    date: petDetails.memorialDate,
    tagList: petDetails.petPersonalities,
    avatarUrl: petDetails.profileImageUrl,
    questIndex: petDetails.questIndex,
  };

  const generateLargeLetterData = (count: number) => {
    return Array.from({ length: count }, (_, index) => ({
      id: index + 1,
      type: 'default' as const,
      color: (index % 2 === 0 ? 'white' : 'bgorange') as LetterColor,
      state: (index % 2 === 0 ? 'notReceived' : 'received') as LetterState,
      name: `Sender ${index + 1}`,
      sendMessage: `Message content ${index + 1}`,
      dateTime: `2024-08-${(index % 31) + 1}`,
    }));
  };

  const totalPages = Math.ceil(generateLargeLetterData(50).length / 9);

  return (
    <div className='relative flex flex-col w-full overflow-hidden min-h-screen'>
      {/* Background Image */}
      <div
        className='absolute top-0 left-0 w-full h-full bg-center bg-cover z-[-1]'
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className='z-10 flex-grow'>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <EarthMain
                    title={petDetails.name}
                    fill={petProfile.questIndex}
                    profileImageUrl={petProfile.avatarUrl}
                    buttonSize='large'
                    buttonDisabled={false}
                    buttonText='영원별로 이동'
                    buttonIcon='SmallStarImg'
                    onButtonClick={() => console.log('영원별 이동')}
                  />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />

          <Route
            path='letterbox'
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <LetterBoxTemplate
                    letterData={generateLargeLetterData(50)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    headerText='편지함'
                  />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />

          <Route
            path='letter'
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <LetterWriteTemplate />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />

          <Route
            path='letter/:id'
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <LetterDetailTemplate />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />

          <Route
            path='quest/:questid'
            element={
              <PrivateRoute>
                <PetDetailsRoute>
                  <QuestRouter />
                </PetDetailsRoute>
              </PrivateRoute>
            }
          />

          {/* 보호되지 않은 경로들 */}
          <Route path='openvidu/:questid' element={<QuestOpenviduTemplate />} />
          <Route path='puzzle' element={<QuestPuzzle />} />
        </Routes>
      </div>
      <Footer className='fixed bottom-0 left-0 z-10 w-full' />
    </div>
  );
};
