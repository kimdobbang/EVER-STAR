import React, { useState, useEffect } from 'react';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { CircleButton } from 'components/atoms/buttons/CircleButton';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/Store';
import { useFetchPetDetails } from 'hooks/usePets';
import { setPetDetails } from 'store/slices/petSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export interface AvatarData {
  id: number;
  src?: string;
  size: 'small' | 'medium' | 'large';
  name?: string;
}

export interface ProfileSelectionProps {
  avatars: AvatarData[];
  onAddAvatar: () => void;
  onAvatarClick?: (index: number) => void;
}

export const ProfileSelection: React.FC<ProfileSelectionProps> = ({
  avatars,
  onAddAvatar,
  onAvatarClick,
}) => {
  const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    mutate: fetchPetDetails,
    data: petDetails,
    error: petDetailsError,
  } = useFetchPetDetails(selectedPetId ?? 0, token);

  useEffect(() => {
    if (selectedPetId !== null) {
      console.log('Fetching pet details for pet ID:', selectedPetId);
      fetchPetDetails();
    }
  }, [selectedPetId, fetchPetDetails]);

  useEffect(() => {
    if (petDetails) {
      console.log('Fetched pet details:', petDetails);
      dispatch(setPetDetails(petDetails));
      navigate('/earth');
    }

    if (petDetailsError) {
      console.error('Error fetching pet details:', petDetailsError);
    }
  }, [petDetails, petDetailsError, dispatch, navigate]);

  const handleAvatarClick = (index: number) => {
    const petId = avatars[index].id;
    console.log('Avatar clicked, pet ID:', petId);
    setSelectedPetId(petId);
    if (onAvatarClick) {
      onAvatarClick(index);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // 디폴트로 3개 표시
    slidesToScroll: 1,
    swipeToSlide: true, // 모바일에서 슬라이드가 더 자연스럽게 작동하도록 설정
    responsive: [
      {
        breakpoint: 1024, // 태블릿 이하
        settings: {
          slidesToShow: 2, // 2개 표시
        },
      },
      {
        breakpoint: 600, // 모바일 이하
        settings: {
          slidesToShow: 1, // 1개 표시
          centerMode: true, // 모바일에서 슬라이드를 중앙에 정렬
        },
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full max-w-[832px] mx-auto rounded-sm">
      <h1 className="z-10 mb-12 text-2xl font-semibold text-greyscaleblack-100">
        여행을 함께 할 친구를 선택해주세요
      </h1>
      <Slider {...sliderSettings} className="w-full">
        {avatars.map((avatar, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-y-8">
            <Avatar
              src={avatar.src}
              size={avatar.size}
              name={avatar.name}
              onClick={() => handleAvatarClick(index)}
            />
          </div>
        ))}
        <div className="flex flex-col items-center justify-center gap-y-8">
          <CircleButton theme="white" icon="plus" disabled={false} onClick={onAddAvatar} />
        </div>
      </Slider>
    </div>
  );
};
