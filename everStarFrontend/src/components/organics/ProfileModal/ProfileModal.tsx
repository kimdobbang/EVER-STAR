import React from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { ProfileCard } from 'components/molecules/cards/ProfileCard/ProfileCard';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profileData: {
    name: string;
    age: number;
    date: string;
    description: string;
    tagList: string[];
    avatarSrc?: string;
  };
  isOwner: boolean;
  avatarSrc?: string;
  onPencilClick?: () => void; // Function to handle pencil icon click
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profileData,
  isOwner,
  onPencilClick,
  avatarSrc,
}) => {
  const petIntroduce = JSON.parse(sessionStorage.getItem('petDetails') || '{}');
  // console.log(petIntroduce);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      text='자세히보기'
      customStyle={{ height: '', maxHeight: '', overflowY: undefined }} // 스타일을 빈 값으로 설정
    >
      <ProfileCard
        name={profileData.name}
        age={profileData.age}
        date={profileData.date}
        description={petIntroduce.introduction}
        tagList={profileData.tagList}
        avatarSrc={avatarSrc}
        onPencilClick={isOwner ? onPencilClick || (() => {}) : () => {}} // 빈 함수 전달
      />
    </Modal>
  );
};
