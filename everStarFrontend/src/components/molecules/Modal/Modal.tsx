import React, { useEffect, useCallback } from 'react';
import {
  ModalHeader,
  ModalHeaderProps,
} from 'components/molecules/ModalHeader/ModalHeader';

interface ModalProps extends ModalHeaderProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  height?: string;
  customStyle?: React.CSSProperties; // customStyle prop 추가
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  height,
  customStyle,
  className = 'flex justify-center',
  ...headerProps
}) => {
  const handleBackButton = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      // 모달이 열렸을 때만 이벤트 리스너 등록
      window.addEventListener('keydown', handleBackButton);
      return () => {
        window.removeEventListener('keydown', handleBackButton);
      };
    }
  }, [isOpen, handleBackButton]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        className='w-full max-w-md p-4 bg-white rounded-lg shadow-md'
        style={{
          height: height || '100vh',
          maxHeight: '100vh',
          overflowY: 'auto',
          ...customStyle,
        }}
      >
        <ModalHeader {...headerProps} onLeftIconClick={onClose} />
        <div className={className}>{children}</div>
      </div>
    </div>
  );
};

export type { ModalProps };
