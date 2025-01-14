import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCreateDiary } from 'hooks/useMemorialBooks';
import { InputField } from 'components/organics/input/InputFields';
import { Textbox } from 'components/molecules/input/Textbox';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import { Modal } from 'components/molecules/Modal/Modal';

// 여기서 onSuccess를 추가하여 prop 타입을 정의합니다.
export const MemorialBookDiaryModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}> = ({
  isOpen,
  onClose,
  onSuccess, // onSuccess prop 추가
}) => {
  const { pet, memorialBookId } = useParams<{ pet: string; memorialBookId: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const createDiaryMutation = useCreateDiary({
    onSuccess: () => {
      navigate(`/everstar/${pet}/memorialbook/${memorialBookId}`);
      onClose();

      if (onSuccess) {
        // onSuccess 콜백이 있으면 호출
        onSuccess();
      }
    },
    onError: (error) => {
      alert(error.message); // 에러 메시지를 alert로 출력
      console.error('Error creating diary:', error);
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 20) {
      setTitle(newValue);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= 255) {
      setContent(newValue);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSaveDiary = () => {
    if (pet && memorialBookId && title && content) {
      createDiaryMutation.mutate({
        petId: parseInt(pet, 10),
        memorialBookId: parseInt(memorialBookId, 10),
        title,
        content,
        imageFile,
      });
    } else {
      alert('Please fill in all required fields');
      console.error('Please fill in all required fields');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} text="일기 쓰기">
      <div className="space-y-4">
        <InputField
          label="제목"
          showLabel={true}
          showValidationText={false}
          starshow={true}
          state="default"
          text={title}
          placeholder="제목을 입력해주세요."
          onChange={handleTitleChange}
          showCheckIcon={false}
        />
        <Textbox
          type="large"
          label={`내용`}
          value={content}
          onChange={handleContentChange}
          maxLength={255} // 제한을 표시하지만 더이상 입력되지 않게 처리
          ghostText="내용을 입력해주세요."
        />
        <PrimaryButton
          theme="white"
          size="large"
          onClick={() => document.getElementById('imageInput')?.click()}
          disabled={false}
          icon={null}
          label="사진"
        >
          사진을 넣어주세요.
        </PrimaryButton>
        {imageFile && <span className="text-sm text-gray-600">{imageFile.name}</span>}
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <div className="flex justify-end w-full mt-8">
          <PrimaryButton
            theme="white"
            size="medium"
            onClick={handleSaveDiary}
            disabled={!title || !content} // 제목과 내용이 필수
            icon={null}
          >
            저장
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};
