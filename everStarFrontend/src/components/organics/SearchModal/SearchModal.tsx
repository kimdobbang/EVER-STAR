import React, { useState } from 'react';
import { Modal } from 'components/molecules/Modal/Modal';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Tag } from 'components/atoms/buttons/Tag';
import { InformationText } from 'components/atoms/texts/InformationText';
import { Lable } from 'components/atoms/texts/Lable';
import { Search } from 'components/molecules/input/Search';

interface SearchModalProps {
  searchOptions: string[];
  modalTitle: string;
  buttonLabel: string;
  onClose: () => void;
  onSubmit: (personalities: string[]) => void;
  tagsContainerClassName?: string;
  dropdownMaxHeight?: number; // 선택적으로 드롭다운 최대 높이 설정
}

export const SearchModal: React.FC<SearchModalProps> = ({
  searchOptions,
  modalTitle,
  buttonLabel,
  onClose,
  onSubmit,
  tagsContainerClassName = '',
  dropdownMaxHeight, // 선택적 prop
}) => {
  const [tags, setTags] = useState<(string | number)[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleTagAdd = (tag: string | number) => {
    if (tags.length >= 3) {
      setError('최대 3개까지만 선택 가능합니다.');
      return;
    }
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setError(null);
    }
  };

  const handleTagRemove = (tag: string | number) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    if (newTags.length <= 3) {
      setError(null);
    }
  };

  const handleSubmit = () => {
    onSubmit(tags.map((tag) => tag.toString()));
  };

  return (
    <Modal isOpen={true} onClose={onClose} text={modalTitle}>
      <div className="space-y-5">
        <Search
          initialState="default"
          options={searchOptions}
          className=""
          onOptionSelect={handleTagAdd}
          moveToTopOnClick={false}
          dropdownMaxHeight={dropdownMaxHeight} // 선택적으로 maxHeight 전달
        />
        <Lable prop={`성격 ${tags.length}/3`} show={true} font="default" className="mb-2" />
        <div
          className={`mt-1 border w-[320px] border-gray-300 p-4 rounded text-center ${tagsContainerClassName}`}
        >
          <div className="flex flex-wrap justify-center w-full gap-2">
            {tags.map((tag, index) => (
              <Tag
                key={index}
                className="cursor-pointer kor-p-p4"
                onClick={() => handleTagRemove(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {tags.length > 0 && (
            <InformationText state="default" align="center">
              다시 선택하려면 클릭해주세요
            </InformationText>
          )}
          {error && (
            <InformationText state="error" align="center">
              {error}
            </InformationText>
          )}
        </div>
        <PrimaryButton
          theme="white"
          size="large"
          disabled={tags.length !== 3} // 3개가 선택되지 않으면 비활성화
          onClick={handleSubmit}
          icon={null}
        >
          {buttonLabel}
        </PrimaryButton>
      </div>
    </Modal>
  );
};
