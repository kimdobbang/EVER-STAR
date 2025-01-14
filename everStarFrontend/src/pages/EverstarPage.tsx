import React, { useMemo, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { EverStarMain } from 'components/templates/EverStarMain';
import { EverStarCheerMessage } from 'components/templates/EverStarCheerMessage';
import { EverStarSearchStar } from 'components/templates/EverStarSearchStar';
import { Footer } from 'components/molecules/Footer/Footer';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import bgImage from 'assets/images/bg-everstar.webp';

import {
  useFetchOtherPetDetails,
  useFetchCheeringPet,
} from 'hooks/useEverStar';
import { useFetchMemorialBooksWithQuest } from 'hooks/useMemorialBooks';
import { MemorialBook } from 'components/templates/MemorialBook';
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

export const EverstarPage: React.FC = () => {
  const params = useParams<{ pet?: string }>();
  const navigate = useNavigate();
  const currentPetId = useSelector(
    (state: RootState) => state.pet.petDetails?.id
  );

  const petId = useMemo(
    () =>
      params.pet
        ? parseInt(params.pet, 10)
        : currentPetId ||
          parseInt(sessionStorage.getItem('defaultPetId') || '0', 10),
    [params.pet, currentPetId]
  );

  const { data: petDetails, isLoading: isPetDetailsLoading } =
    useFetchOtherPetDetails(petId);

  const questIndex = petDetails?.questIndex || 0;

  const { data: memorialBooks, isLoading: isMemorialBooksLoading } =
    useFetchMemorialBooksWithQuest(petId, questIndex);

  const { data: cheerData, isLoading: isCheerLoading } = useFetchCheeringPet();

  const isOwner = currentPetId === petId;

  useEffect(() => {
    if (!params.pet && petId && !sessionStorage.getItem('initialNavigation')) {
      sessionStorage.setItem('defaultPetId', petId.toString());
      sessionStorage.setItem('initialNavigation', 'true');
      navigate(`/everstar/${petId}`);
    }
  }, [params.pet, petId, navigate]);

  if (isPetDetailsLoading || isMemorialBooksLoading || isCheerLoading) {
    return (
      <div className='relative flex flex-col items-start justify-center min-h-screen bg-center bg-cover'>
        <img
          src={bgImage}
          alt='Background'
          className='absolute inset-0 object-cover w-full h-full'
        />
        <SplashTemplate type='everPage' className='z-10 w-full h-full' />
      </div>
    );
  }

  if (!petDetails || !memorialBooks) {
    return <div>Error loading data.</div>;
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
  const postItCards =
    cheerData?.data?.content?.map(
      (item: {
        content: string;
        petName: string;
        color: string;
        cheeringMessageId: number;
        petId: number;
      }) => ({
        contents: item.content || '',
        name: item.petName || '',
        color: item.color.toLowerCase() || '',
        cheeringMessageId: item.cheeringMessageId,
        petId: item.petId,
      })
    ) || [];

  const totalPages = Math.ceil(postItCards.length / 10);

  return (
    <div className='relative flex flex-col w-full min-h-screen'>
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

      {/* Scrollable Content */}
      {/* 바로밑에 items-center */}
      {/*  바로밑에 flex-grow */}
      <div className='flex justify-center min-h-screen'>
        <Routes>
          <Route
            path='/'
            element={
              <EverStarMain
                petProfile={petProfile}
                buttonDisabled={
                  !memorialBooks?.data.isActive || !memorialBooks?.data.isOpen
                }
                memorialBookProfile={memorialBooks?.data}
                petId={petId ?? 0}
                isOwner={isOwner}
              />
            }
          />
          <Route
            path='message'
            element={
              petProfile ? (
                <EverStarCheerMessage
                  profile={petProfile}
                  postItCards={postItCards}
                  totalPages={totalPages}
                />
              ) : (
                <SplashTemplate
                  type='everCheerRocket'
                  className='z-10 w-full h-full'
                />
              )
            }
          />
          <Route path='explore' element={<EverStarSearchStar />} />
          <Route
            path='memorialbook/:memorialBookId'
            element={
              petProfile ? (
                <MemorialBook
                  avatarUrl={petProfile.avatarUrl}
                  isOwner={isOwner}
                />
              ) : (
                <SplashTemplate type='book' className='z-10 w-full h-full ' />
              )
            }
          />
        </Routes>
      </div>

      {/* Fixed Footer */}
      <Footer className='fixed bottom-0 left-0 z-50 w-full' />
    </div>
  );
};
