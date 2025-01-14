import { Client, Frame } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// TypeScript types for the callback functions
type OnConnected = () => void;

// The function to connect to STOMP
const connectToStomp = (onConnected?: OnConnected): Client => {
  const client = new Client({
    webSocketFactory: () => new SockJS('https://i11b101.p.ssafy.io/api/chat/ws-stomp'),
    onConnect: () => {
      if (onConnected) onConnected();
    },
    onDisconnect: () => {
      console.log('Disconnected');
    },
    onStompError: (frame: Frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
    debug: (str: string) => {
      console.log(str);
    },
  });

  client.activate();

  return client;
};

export default connectToStomp;
