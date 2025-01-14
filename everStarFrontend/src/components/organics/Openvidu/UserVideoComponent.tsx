// UserVideoComponent.tsx
import React from 'react';
import { StreamManager } from 'openvidu-browser';
import { Video } from './Video';

interface UserVideoComponentProps {
  streamManager: StreamManager;
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({ streamManager }) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    console.log('방에 있는 유저 데이터: ', streamManager.stream.connection.data);
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div className='w-full h-full'>
      {streamManager !== undefined ? (
        <div className='p-4 border rounded-md shadow-lg streamcomponent'>
          <Video streamManager={streamManager} />
          <div className='mt-2'>
            {streamManager?.stream?.connection?.data ? (
              <p className='text-sm font-medium'>{getNicknameTag()}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
