// Video.tsx
import React, { useEffect, useRef } from 'react';
import { StreamManager } from 'openvidu-browser';

interface Props {
  streamManager: StreamManager;
}

export const Video: React.FC<Props> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const fun = () => {
    console.log('fnction');
  };

  useEffect(() => {
    fun();
  }, []);

  useEffect(() => {
    if (streamManager && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video
      ref={videoRef}
      autoPlay
      className='w-full h-auto border border-gray-300 rounded-lg shadow-md'
    />
  );
};
