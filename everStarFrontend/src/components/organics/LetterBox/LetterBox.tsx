import React from 'react';
import { LetterCard } from 'components/molecules/cards/LetterCard/LetterCard';
import { useMediaQuery } from 'react-responsive';

interface Letter {
  id: number;
  type: 'default' | 'send' | 'receive';
  color: 'white' | 'bgorange' | 'orange' | 'gray';
  state: 'received' | 'notReceived';
  name: string;
  sendMessage: string;
  dateTime: string;
}

interface LetterBoxProps {
  letters: Letter[] | undefined;
  onLetterClick: (id: number) => void;
  currentPage: number;
  itemsPerPage: number;
}

const LetterBox: React.FC<LetterBoxProps> = ({
  letters,
  onLetterClick,
  currentPage,
  itemsPerPage,
}) => {
  const handleClick = (id: number) => {
    onLetterClick(id);
  };
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });

  const getGridClassName = () => {
    if (isMobile) {
      return 'grid-cols-1 grid-rows-2';
    } else if (isTablet) {
      return 'grid-cols-2 grid-rows-2';
    } else {
      return 'grid-cols-3 grid-rows-2';
    }
  };

  // Calculate the index of the first and last items for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the letters array to only include the items for the current page
  const displayedLetters = letters?.slice(startIndex, endIndex);

  return (
    <div className='flex flex-wrap items-center justify-center p-0 align-content-center'>
      <div className={`grid ${getGridClassName()} gap-8`}>
        {displayedLetters === undefined || displayedLetters?.length === 0 ? (
          <div className='text-center text-gray-500 col-span-full'>
            편지가 없습니다.
          </div>
        ) : (
          displayedLetters.map((letter) => (
            <LetterCard
              key={letter.id}
              type={letter.type}
              color={letter.state === 'received' ? 'gray' : letter.color}
              state={letter.state}
              name={letter.name}
              sendMessage={letter.sendMessage}
              dateTime={letter.dateTime}
              onClick={() => handleClick(letter.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export { LetterBox };
