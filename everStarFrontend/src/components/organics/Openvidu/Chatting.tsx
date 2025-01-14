import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { useParams } from 'react-router-dom';
import { MessageWithTime } from 'components/molecules/cards/MessageCard/MessageWithTime';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';

interface Message {
  type: string;
  roomId: string;
  sender: string;
  message: string;
}

type Props = {
  sessionId: string;
};

interface ChattingProps {
  userName: string;
  arrowOn: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  setInput?: (input: string) => void;
  input?: string;
  sendMessage?: () => void;
  messages: Message[];
}

const Chatting: React.FC<ChattingProps> = ({
  userName,
  onClick,
  arrowOn,
  setInput,
  input,
  sendMessage,
  messages
}) => {
  const { sessionId } = useParams<Props>();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [roomId] = useState<string>(sessionId || 'default_room_id');
  const [sender] = useState<string>(userName);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setInput) {
      setInput(event.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && sendMessage) {
      sendMessage();
    }
  };

  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
}, [messages]);

const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
};

  return (
    <div style={{ padding: '20px' }} className='w-full h-[500px] bg-white shadow-lg rounded-lg'>
      <div className='flex flex-row justify-center w-full'>
        <h1 className='mb-3 text-center kor-h-h3'>채팅</h1>
        {arrowOn && (
          <button onClick={onClick} className='mb-3 ml-2'>
            <ArrowIcon direction='down' size={16} color='black' />
          </button>
        )}
      </div>

      <div ref={messagesEndRef} className='h-[70%] p-2.5 w-full mt-2 border rounded-lg shadow-md overflow-y-auto text-xs'>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: msg.sender === sender ? 'flex-end' : 'flex-start',
              marginBottom: '10px',
              width: '100%',
            }}
          >
            <MessageWithTime
              flag={msg.sender === sender ? false : true}
              contents={msg.message}
              time={formatTime(new Date())}
              sender={msg.sender}
            />
          </div>
        ))}
      
      </div>
      <div className='mt-4 flex'>
        <input
          type='text'
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          style={{ width: '80%' }}
          className='h-20 mt-2 border rounded-lg shadow-md'
        />
        <button onClick={sendMessage} style={{ width: '20%' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatting;