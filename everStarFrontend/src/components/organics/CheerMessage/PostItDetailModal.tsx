import React from 'react';

interface PostItDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contents: string;
  name: string;
  color: string;
}

export const PostItDetailModal: React.FC<PostItDetailModalProps> = ({
  isOpen,
  onClose,
  contents,
  name,
  //   color,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // 모달 배경을 어둡게 처리
      onClick={onClose} // 모달 밖을 클릭하면 닫히게 처리
    >
      <div
        className='p-6 bg-white rounded-lg shadow-lg'
        style={{
          backgroundColor: 'white', // 모달 배경색을 동적으로 설정
          width: '300px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', // 내용과 작성자를 위아래로 배치
        }}
        onClick={(e) => e.stopPropagation()} // 모달 안쪽을 클릭해도 닫히지 않도록 처리
      >
        <div
          className='mb-4 text-center'
          style={{ flex: 1, overflowY: 'auto' }}
        >
          <p className='text-lg font-semibold break-words'>{contents}</p>{' '}
          {/* 자동 줄바꿈 처리 */}
        </div>
        <div className='text-right'>
          <p className='text-sm font-medium'>{name}</p>{' '}
          {/* 작성자 이름 오른쪽 하단에 배치 */}
        </div>
      </div>
    </div>
  );
};
