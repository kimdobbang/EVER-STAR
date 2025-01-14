import React from 'react';
import { ReactComponent as LockIconSVG } from 'assets/icons/clipboard.svg';
import { ReactComponent as LockCheckIconSVG } from 'assets/icons/clipboard-check.svg';

interface ClipboardIconsProps {
  size: 16 | 24;
  variant: 'lock' | 'lock-check';
}

export const ClipboardIcons: React.FC<ClipboardIconsProps> = ({
  size,
  variant,
}) => {
  const sizeClasses = size === 16 ? 'w-4 h-4' : 'w-6 h-6';

  return variant === 'lock' ? (
    <LockIconSVG className={sizeClasses} />
  ) : (
    <LockCheckIconSVG className={sizeClasses} />
  );
};

export type { ClipboardIconsProps };
