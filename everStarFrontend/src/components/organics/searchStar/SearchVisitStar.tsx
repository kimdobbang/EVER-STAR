import React, { useState, useEffect } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Search } from 'components/molecules/input/Search';
import { useFetchPetsByName } from 'hooks/useEverStar';
import { useNavigate } from 'react-router-dom';

interface Pet {
  petName: string;
  userName: string;
  email: string;
  id: number;
}

interface SearchVisitStarProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (id: number) => void;
  text: string;
  height?: string;
}

export const SearchVisitStar: React.FC<SearchVisitStarProps> = ({
  isOpen,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<{ label: string; id: number }[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch pets by name when input value changes
  const { data: searchResults, isError } = useFetchPetsByName(inputValue);

  // Update options whenever searchResults changes
  useEffect(() => {
    if (searchResults?.data?.content) {
      const petOptions = searchResults.data.content.map((pet: Pet) => ({
        label: `${pet.petName} (${pet.userName}, ${pet.email})`,
        id: pet.id,
      }));
      setOptions(petOptions);
      console.log('Updated options:', petOptions); // 콘솔에 옵션 출력
    }
  }, [searchResults]);

  const handleSearch = (input: string) => {
    setInputValue(input);
    console.log('Input value changed:', input); // 콘솔에 입력값 출력
  };

  const handleOptionSelect = (option: string | number) => {
    const selectedPet = options.find((opt) => opt.label === option);
    if (selectedPet) {
      setSelectedId(selectedPet.id);
      console.log('Selected ID:', selectedPet.id); // 콘솔에 선택된 ID 출력
    }
  };

  const handleVerify = () => {
    if (selectedId !== null) {
      navigate(`/everstar/${selectedId}`);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text='방문할 영원별 찾기'>
      <div className='flex flex-col justify-between w-full h-full'>
        <Search
          initialState='focus'
          options={options.map((option) => option.label)}
          onOptionSelect={handleOptionSelect}
          onInputChange={handleSearch}
          enableFiltering={false}
          dropdownMaxHeight={300}
        />
        {isError && <div>Error fetching pets by name.</div>}
        <div className='flex justify-center w-full mt-10'>
          <PrimaryButton
            theme='white'
            size='large'
            onClick={handleVerify}
            disabled={!selectedId}
            icon={null}
          >
            찾아가기
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export type { SearchVisitStarProps };
