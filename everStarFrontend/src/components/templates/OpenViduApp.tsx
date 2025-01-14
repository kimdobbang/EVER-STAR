/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  OpenVidu,
  Publisher,
  Subscriber,
  Session,
  StreamManager,
  Device,
  StreamEvent,
  ExceptionEvent,
} from 'openvidu-browser';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircleButton } from '../atoms/buttons/CircleButton';
import { Glass } from 'components/molecules/Glass/Glass';
import { InputField } from 'components/organics/input/InputFields';
import Chatting from 'components/organics/Openvidu/Chatting';
import UserVideoComponent from '../organics/Openvidu/UserVideoComponent';
import html2canvas from 'html2canvas';
import connectToStomp from 'components/organics/Openvidu/Stomp';
import { Client, IMessage } from '@stomp/stompjs';
interface Message {
  type: string;
  roomId: string;
  sender: string;
  message: string;
}

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://i11b101.p.ssafy.io/';

type Props = {
  sessionId: string;
};

export const OpenViduApp = () => {
  const { sessionId } = useParams<Props>();
  const [, setOV] = useState<OpenVidu | null>(null);
  const [mySessionId] = useState<string>(sessionId || 'default_session_id');
  const [myUserName, setMyUserName] = useState<string>(
    '방문자' + Math.floor(Math.random() * 100)
  );
  const [userNameOk, setUserNameOk] = useState<boolean>(true);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<
    StreamManager | undefined
  >(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isTabletAndMobile, setIsTabletAndMobile] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [exitClick, setExitClick] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [, setCurrentVideoDevice] = useState<
    MediaDeviceInfo | Device | undefined
  >(undefined);
  const [roomId] = useState<string>(sessionId || 'default_room_id'); // Example roomId
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('구독자 수 변경: ', subscribers);
  }, [subscribers.length]);

  useEffect(() => {
    console.log('현재 룸아이디: ', roomId);
    // Create and connect client
    const client: Client = connectToStomp(onConnected);
    setStompClient(client);

    // Set up subscription when connected
    function onConnected() {
      if (client) {
        client.subscribe(
          `/api/chat/sub/chat/room/${roomId}`,
          onMessageReceived
        );
      }
    }

    // Handle received messages
    function onMessageReceived(message: IMessage) {
      console.log('Received message:', message.body); // Debugging log
      const parsedMessage: Message = JSON.parse(message.body);
      setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    }

    // Cleanup function
    return () => {
      if (client) client.deactivate();
    };
  }, [roomId]);

  const sendMessage = () => {
    console.log(111);
    if (stompClient && input.trim() !== '') {
      const messagePayload: Message = {
        type: 'ENTER',
        roomId,
        sender: myUserName, // Set dynamically as needed
        message: input,
      };

      stompClient.publish({
        destination: '/api/chat/pub/chat/message',
        body: JSON.stringify(messagePayload),
      });
      setInput('');
    }
  };

  // useEffect(() => {
  //   console.log('세션아이디 params:', sessionId);
  //   if (sessionId === undefined) {
  //     createSession();
  //   }
  // }, [sessionId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      leaveSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsTabletAndMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSwipeDown = (event: React.TouchEvent) => {
    event.preventDefault();
    setIsChatOpen(false); // 스와이프 다운 시 채팅 숨김
  };
  const clip = () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const currentUrl = `${window.location.href}`;
    const slashCount = (currentUrl.match(/\//g) || []).length;

    let url;
    if (slashCount === 4) {
      url = `${currentUrl}/${mySessionId}`;
    } else {
      url = currentUrl;
    }
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    setIsModalOpen(true); // 모달을 열도록 상태 변경
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length > 10) {
      alert('이름이 너무 길어요. 10글자 이내로 다시 입력하세요');
      setUserNameOk(false);
    } else {
      setUserNameOk(true);
    }
    setMyUserName(e.target.value);
  };

  // 세션 아이디 변경하는 함수 (사용하지는 않는데 혹시 몰라서 남겨둠)
  // const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMySessionId(e.target.value);
  // };

  // 메인비디오 스트림 변경하는 함수 (사용하지는 않는데 혹시 몰라서 남겨둠)
  // const handleMainVideoStream = (stream: StreamManager) => {
  //   if (mainStreamManager !== stream) {
  //     setMainStreamManager(stream);
  //   }
  // };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub !== streamManager)
    );
  };

  const joinSession = () => {
    const OV = new OpenVidu();
    setOV(OV);
    const mySession = OV.initSession();

    subscribers.map((sub) => {
      console.log('[찐] USER DATA: ', sub.stream.connection.data);
    });

    mySession.on('streamCreated', (event: StreamEvent) => {
      console.log('여기 시작됨 created');

      subscribers.map((sub) => {
        console.log('[찐] USER DATA: ', sub.stream.connection.data);
      });

      const subscriber = mySession.subscribe(event.stream, 'subscriber');
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event: StreamEvent) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception: ExceptionEvent) => {
      console.warn(exception);
    });

    createToken(mySessionId).then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          const publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: !isAudioMuted,
            publishVideo: !isVideoMuted,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          mySession.publish(publisher);

          const devices: Device[] = await OV.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput'
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );
          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setSession(mySession);
        })
        .catch((error) => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message
          );
        });
    });
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }
    setSession(undefined);
    setSubscribers([]);
    setMyUserName('방문자' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);

    navigate(-1);
    //window.close();
  };

  const toggleAudio = () => {
    console.log('audio: ', isAudioMuted);

    if (publisher) {
      setIsAudioMuted(!isAudioMuted);
      publisher.publishAudio(isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (publisher) {
      setIsVideoMuted(!isVideoMuted);
      publisher.publishVideo(isVideoMuted);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerMuted(!isSpeakerMuted);
    subscribers.forEach((subscriber) => {
      subscriber.subscribeToAudio(isSpeakerMuted);
    });
  };

  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const toggleExit = () => {
    setExitClick(!exitClick);
    leaveSession();
  };

  const getToken = async (): Promise<string> => {
    const sessionId = await createSession(mySessionId);
    return createToken(sessionId);
  };

  const createSession = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('[토큰]: ', response.data);
    return response.data; // The token
  };

  const handleCapture = () => {
    html2canvas(document.body).then((canvas) => {
      // 캡처한 이미지를 데이터 URL로 변환합니다.
      const dataURL = canvas.toDataURL('image/png');
      // 이미지 URL을 콘솔에 출력하거나, 원하는 대로 처리합니다.
      console.log(dataURL);
      // 데이터 URL을 사용하여 이미지를 새 창으로 열거나 파일로 다운로드할 수 있습니다.
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'capture.png';
      link.click();
    });
  };

  const handleSetInput = (input: string) => {
    setInput(input); // 입력값 업데이트
    console.log('Current input:', input); // 예시로 콘솔에 출력
  };

  return (
    <div className='relative flex flex-col items-center w-full h-screen '>
      {session === undefined ? (
        <div
          id='join'
          className='z-10 flex flex-col items-center justify-center w-full h-full'
        >
          <div
            id='join-dialog'
            className='jumbotron vertical-center w-[390px] h-[316px] flex-shrink-0 bg-white rounded-lg shadow-md flex flex-col justify-center items-center '
          >
            <h1 className='kor-h-h2'>화상 채널 입장</h1>
            <form
              className='form-group'
              onSubmit={(e) => {
                console.log('세션 ID:', mySessionId);
                console.log('유저 ID:', myUserName);
                e.preventDefault();
                joinSession();
              }}
            >
              <p className='mt-5'>
                <InputField
                  state='default'
                  label='사용자 이름을 입력해주세요'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  text={myUserName}
                  showCheckIcon={false}
                  onChange={handleChangeUserName}
                ></InputField>
              </p>
              <p className='mt-4'>
                <InputField
                  state='disable'
                  label='세션 ID'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  text={mySessionId}
                  showCheckIcon={false}
                  readOnlyState={true}
                  // onChange={handleChangeSessionId}
                ></InputField>
              </p>
              <div className='flex flex-row items-center justify-center gap-3 mt-6 text-center'>
                {/* <button
                  className={`cursor-pointer flex items-center justify-center rounded-lg px-4 text-center shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] ${userNameOk ? 'bg-white text-black hover:bg-bgorange' : 'disabled:bg-greyscaleblack-20 disabled:text-greyscaleblack-60'} w-[106px] h-[40px]`}
                  onClick={() => navigate(-1)}
                >
                  뒤로가기
                </button> */}
                <input
                  className={`cursor-pointer flex items-center justify-center rounded-lg px-4 text-center shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] ${userNameOk ? 'bg-white text-black hover:bg-bgorange' : 'disabled:bg-greyscaleblack-20 disabled:text-greyscaleblack-60'} w-[106px] h-[40px]`}
                  name='commit'
                  type='submit'
                  value='입장하기'
                  disabled={!userNameOk}
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id='session flex flex-col justify-center items-center w-full h-full '>
          {isModalOpen && (
            <div className='fixed inset-0 z-30 flex items-center justify-center modal-overlay'>
              <div className='modal w-[300px] z-40 rounded-md bg-white h-[150px] text-center items-center justify-center flex flex-col shadow-md'>
                <p>URL이 복사되었습니다!</p>
                <br />
                <button
                  className='w-1/6 h-auto p-2 bg-white border rounded-md shadow-md'
                  onClick={() => setIsModalOpen(false)}
                >
                  닫기
                </button>
              </div>
            </div>
          )}
          <div
            id='session-header'
            className='z-10 flex flex-row justify-around w-full mt-6 mb-6'
          >
            <h1
              id='session-title'
              className='z-10 kor-h-h2 sm:text-2xl md:text-3xl'
            >
              화상 채널
            </h1>
            <button
              onClick={handleCapture}
              className='z-10 ml-5 sm:text-base md:text-lg'
            >
              💡 퀘스트 완료를 위해 화면 캡처!!!
            </button>
          </div>

          <div className='flex flex-row items-center justify-center w-full h-4/5'>
            <div className='z-10 flex flex-col items-center w-1/6 h-full gap-8 ml-2 tablet:w-1/4 mobile:w-1/4'>
              <CircleButton
                theme={isAudioMuted ? 'white' : 'hover'}
                onClick={toggleAudio}
                icon={isAudioMuted ? 'micOff' : 'mic'}
                disabled={false}
                label={isAudioMuted ? '마이크켜기' : '마이크끄기'}
              />
              <CircleButton
                theme={isVideoMuted ? 'white' : 'hover'}
                onClick={toggleVideo}
                icon={isVideoMuted ? 'videoOff' : 'video'}
                disabled={false}
                label={isVideoMuted ? '비디오켜기' : '비디오끄기'}
              />
              <CircleButton
                theme={isSpeakerMuted ? 'white' : 'hover'}
                onClick={toggleSpeaker}
                icon={isSpeakerMuted ? 'phoneStop' : 'phone'}
                disabled={false}
                label={isSpeakerMuted ? '스피커켜기' : '스피커끄기'}
              />
            </div>
            <div className='z-10 flex w-auto h-full gap-4 desktop:flex-row mobile:flex-col tablet:flex-col '>
              {mainStreamManager !== undefined ? (
                <UserVideoComponent streamManager={mainStreamManager} />
              ) : null}
              <div className='grid w-full gap-4 desktop:grid-cols-2 tablet:grid-cols-1 mobile:grid-cols-1'>
                {subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className='box-border col-span-1 stream-container'
                  >
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>

            <div className='z-10 flex flex-col items-center w-1/6 h-full gap-8 ml-2 mr-2 tablet:w-1/4 mobile:w-1/4'>
              <CircleButton
                theme={isChatOpen ? 'hover' : 'white'}
                onClick={toggleChat}
                icon={'chat'}
                disabled={false}
                label={isChatOpen ? '채팅닫기' : '채팅열기'}
              />
              <CircleButton
                theme={'white'}
                onClick={clip}
                icon={'share'}
                disabled={false}
                label={'초대하기'}
              />
              <CircleButton
                theme={exitClick ? 'hover' : 'white'}
                onClick={toggleExit}
                icon={'exit'}
                disabled={false}
                label={'나가기'}
              />
            </div>
            {isChatOpen &&
              (isTabletAndMobile ? (
                <div
                  className={`${
                    isChatOpen ? 'translate-y-0' : 'translate-y-full'
                  } transition-transform z-10 w-full h-[490px] flex flex-row justify-center items-start absolute bottom-0 left-0`}
                >
                  <Chatting
                    userName={myUserName}
                    onClick={toggleChat}
                    arrowOn={true}
                    setInput={handleSetInput}
                    input={input}
                    sendMessage={sendMessage}
                    messages={messages}
                  />
                </div>
              ) : (
                <div className='z-10 w-[40%] h-full flex flex-row items-center'>
                  <Chatting
                    userName={myUserName}
                    arrowOn={false}
                    setInput={handleSetInput}
                    input={input}
                    sendMessage={sendMessage}
                    messages={messages}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenViduApp;
