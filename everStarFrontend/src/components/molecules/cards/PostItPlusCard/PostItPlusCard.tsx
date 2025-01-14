import { PlusIcon } from 'components/atoms/icons/Plus/PlusIcon';

interface PostItPlusCardProps {
  onClick: () => void;
}

export const PostItPlusCard = ({ onClick }: PostItPlusCardProps) => {
  return (
    <div
      className='flex flex-col w-[142px] h-[152px] items-center gap-[18px] pt-16 pb-3 px-0 relative shadow-md'
      onClick={onClick}
    >
      <div className='relative items-center'>
        <PlusIcon size={24} color='black' />
      </div>
    </div>
  );
};
