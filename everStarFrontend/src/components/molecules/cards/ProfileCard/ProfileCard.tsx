import { PencilIcon } from 'components/atoms/icons/Pencil/PencilIcon';
import { Avatar } from 'components/atoms/symbols/Avatar/Avatar';
import { Tag } from 'components/atoms/buttons/Tag';

interface IProfileCard {
  name: string;
  age: number;
  date: string;
  description: string;
  tagList: string[];
  avatarSrc?: string; // 선택적 prop으로 이미지 경로 받음
  onPencilClick: () => void; // Function to handle pencil icon click
}

export const ProfileCard = ({
  name,
  age,
  date,
  description,
  tagList,
  avatarSrc,
  onPencilClick,
}: IProfileCard) => {
  const visibleTags = tagList.slice(0, 3);

  return (
    <div className='h-[496px] bg-greyscalewhite shadow-md '>
      <Avatar size='square' src={avatarSrc} />
      <div className='flex justify-between w-full p-4 h-fit'>
        <label className='block kor-h-h3 text-greyscaleblack-100'>{name}</label>
        <label className='block text-sm text-greyscaleblack-100'>
          {age}살 | {date}
        </label>
      </div>
      <p className='block p-4 mt-2 text-md text-greyscaleblack-80'>
        {description}
      </p>
      <div className='flex flex-row items-center justify-between w-full'>
        <div className='flex flex-wrap gap-2 p-4 mt-8'>
          {visibleTags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </div>
        <div className='mt-8 mr-3'>
          <PencilIcon size={24} color='black' onClick={onPencilClick} />
        </div>
      </div>
    </div>
  );
};
