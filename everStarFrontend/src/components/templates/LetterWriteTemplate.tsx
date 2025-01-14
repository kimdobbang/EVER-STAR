import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import { useFetchLetterPost } from 'hooks/useEarth';
import { InteractiveForm } from 'components/templates/InteractiveForm';
import { useNavigate } from 'react-router-dom';

export const LetterWriteTemplate: React.FC = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<File | null>();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const [imageText, setImageText] = useState('이미지 추가');
  const { mutate: letterPost } = useFetchLetterPost(token, Number(petId));

  const navigate = useNavigate();
  const currentPage = 1;
  const totalPages = 5;

  // const mutation = useFetchLetterPost(token, Numbe(petId), {
  //   onSuccess: () => {
  //     console.log('Letter posted successfully');
  //     navigate('/earth');
  //   },
  //   onError: (error) => {
  //     console.error('Error posting letter:', error);
  //   },
  // });
  const handleTextChange = (newText: string) => {
    setText(newText);
  };

  useEffect(() => {
    if (image) {
      setImageText(image.name);
    }
  }, [image]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };
  const handleButtonClick = async () => {
    if (text && token && petId) {
      const formData = new FormData();

      // requestDto를 Blob으로 만들어서 application/json 타입으로 추가
      const requestDto = JSON.stringify({ content: text });
      const requestDtoBlob = new Blob([requestDto], {
        type: 'application/json',
      });
      formData.append('requestDto', requestDtoBlob);
      if (image) {
        formData.append('image', image);
      } else {
        const emptyFile = new File([new Blob()], '', { type: 'image/jpeg' });
        formData.append('image', emptyFile);
      }
      // formData를 사용하여 letterPost 호출
      letterPost(formData, {
        onSuccess: (data) => {
          console.log('편지보내기 성공적:', data);
          navigate('/earth');
        },
        onError: (error) => {
          console.error('편지보내기 에러:', error);
        },
      });
    } else {
      alert('내용을 입력해주세요');
      console.error('Required data is missing');
    }
  };

  const handleButtonClick2 = async () => {
    document.getElementById('photoInput')?.click();
  };

  return (
    <div className='flex items-center justify-center flex-grow'>
      <div className='w-full h-full max-w-md '>
        <InteractiveForm
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => console.log('Page changed to:', newPage)}
          headerText='편지 쓰기'
          textboxLabel='내용'
          largeButtonText={imageText}
          smallButtonText='작성 완료'
          showPrimaryButton={true}
          customText='사랑하는 반려동물에게<br /> 편지를 보내보세요.'
          ghostText='편지 내용'
          onTextChange={handleTextChange}
          onButtonClick={handleButtonClick}
          onButtonClick2={handleButtonClick2}
          glassEffect={false}
          value={text}
          onLeftIconClick={() => navigate(-1)}
          className={'flex justify-center h-full w-full'}
        />
        {image && <span className='text-sm text-gray-600'>{image.name}</span>}
        <input
          type='file'
          id='photoInput'
          accept='image/*'
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </div>
    </div>
  );
};
