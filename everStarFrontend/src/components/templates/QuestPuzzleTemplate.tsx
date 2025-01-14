// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { RootState } from 'store/Store';
// import { useNavigate } from 'react-router-dom';
// import { Glass } from 'components/molecules/Glass/Glass';
// import { InteractiveForm } from './InteractiveForm';

// const APPLICATION_SERVER_URL =
//   process.env.NODE_ENV === 'production' ? '' : 'https://i11b101.p.ssafy.io/';

// export const QuestPuzzleTemplate: React.FC = () => {
//   const { questid } = useParams<{ questid: string }>();

//   const navigate = useNavigate();
//   const [text, setText] = useState('');
//   const [image, setImage] = useState<File | null>();
//   const [questContent, setQuestContent] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [didOpenvidu] = useState<boolean>(() => {
//     return sessionStorage.getItem(`didOpenvidu${questid}`) === 'true';
//   });
//   const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
//   const accessToken = useSelector((state: RootState) => state.auth.accessToken);

//   useEffect(() => {
//     console.log('이미지!!!!: ', image);
//     console.log('오픈비두 클릭했는지 여부: ', didOpenvidu);
//   }, [image]);

//   useEffect(() => {
//     getQuest();
//   }, []);

//   const getQuest = async () => {
//     try {
//       const response = await axios.get(
//         `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       if (response.data) {
//         console.log('성공:', response.data.data.content);
//         setQuestContent(response.data.data.content);
//       }
//     } catch (error) {
//       console.error('퀘스트 데이터를 가져오는 중 오류 발생:', error);
//     } finally {
//       setLoading(false); // 데이터 로딩 후 로딩 상태 업데이트
//     }
//   };

//   const handleSubmit = async () => {
//     const status = await answerOpenviduQuestion();

//     if (status === 200) {
//       console.log('성공');
//       navigate('/earth');
//     } else {
//       console.log('실패');
//     }
//   };

//   const answerOpenviduQuestion = async () => {
//     {
//       if (text && accessToken && petId && image) {
//         // FormData 객체 생성
//         const formData = new FormData();

//         // JSON 데이터 준비
//         const requestDto = JSON.stringify({ content: text, type: 'TEXT_IMAGE' });

//         const requestDtoBlob = new Blob([requestDto], {
//           type: 'application/json',
//         });
//         // JSON 데이터를 FormData에 추가
//         formData.append('requestDto', requestDtoBlob);

//         if (image) {
//           formData.append('imageFile', image);
//           console.log('이미지 잘 들어갔니?');
//         } else {
//           const emptyFile = new File([new Blob()], '', { type: 'image/jpeg' });
//           formData.append('imageFile', emptyFile);
//         }

//         try {
//           console.log('formData:', formData);
//           // POST 요청을 FormData와 함께 전송
//           const response = await axios.post(
//             `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}/answers`,
//             formData,
//             {
//               headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           );

//           console.log('Response:', response.data);

//           return response.status;
//         } catch (error) {
//           console.error('Error:', error);
//         }
//       } else {
//         console.error('Required data is missing');
//       }
//     }
//   };

//   const handleTextChange = (newText: string) => {
//     setText(newText);
//     console.log('입력된 텍스트: ', text);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setImage(file);
//   };

//   const handleButtonClick2 = async () => {
//     document.getElementById('photoInput')?.click();
//   };

//   const getOpenVidu = async (): Promise<string> => {
//     const response = await axios.post(`${APPLICATION_SERVER_URL}api/sessions`, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     return response.data;
//   };

//   const handleRtcPuzzleClick = async () => {
//     const sessionId = await getOpenVidu();
//     sessionStorage.setItem(`didOpenvidu${questid}`, 'true');
//     navigate(`/earth/openvidu/sessionid/${sessionId}`);
//   };

//   // 로딩 중이거나 퀘스트 데이터가 없으면 로딩 스피너 또는 빈 화면을 보여줌
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='relative flex items-center justify-center min-h-screen'>
//       <Glass
//         currentPage={1}
//         totalPages={1}
//         onPageChange={() => console.log('이동')}
//         showPageIndicator={false}
//       />
//       <div className='absolute inset-0 flex items-center justify-center'>
//         <InteractiveForm
//           currentPage={1}
//           totalPages={1}
//           onPageChange={() => console.log('이동')}
//           letterCardMessage={questContent}
//           headerText='오늘의 질문'
//           letterCardType='default'
//           letterCardColor='white'
//           letterCardState='notReceived'
//           centered={true}
//           textboxLabel='답변'
//           largeButtonText='이미지 추가'
//           smallButtonText='작성완료'
//           showPrimaryButton={true}
//           isRtc={true}
//           handleRtcPuzzleClick={handleRtcPuzzleClick}
//           rtcPuzzleText={rtcPuzzleText()}
//           onTextChange={handleTextChange}
//           value={text}
//           onButtonClick={handleSubmit}
//           onButtonClick2={handleButtonClick2}
//           handleSmallButtonDisabled={!didOpenvidu}
//         />
//         <input
//           type='file'
//           id='photoInput'
//           accept='image/*'
//           onChange={handleImageChange}
//           style={{ display: 'none' }}
//         />
//       </div>
//     </div>
//   );
// };

export const QuestOpenviduTemplate = () => {
  return <div>dfdfdfd</div>;
};
