import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/Store';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
export interface QuestPuzzleProps {
  id: string;
  width: number;
  height: number;
  pieceSize: number;
}

export const Puzzle: React.FC<QuestPuzzleProps> = (props) => {
  const navigate = useNavigate();
  const puzzleRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);
  const headbreaker: any = require('headbreaker');
  const petId = useSelector((state: RootState) => state.pet.petDetails?.id);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { questid } = useParams<{ questid: string }>();
  const petImg = useSelector(
    (state: RootState) => state.pet.petDetails?.profileImageUrl
  );
  const [isSalacted, setIsSalacted] = useState(true);

  useEffect(() => {
    const puzzle = puzzleRef.current;

    if (puzzle) {
      const vangogh = new Image();
      if (petImg) {
        vangogh.src = `${petImg}?timestamp=${Date.now()}`;
        vangogh.crossOrigin = 'anonymous'; // 크로스 오리진 문제 해결
      }

      vangogh.onload = () => {
        const background = new headbreaker.Canvas(puzzle, {
          width: 500,
          height: 500,
          pieceSize: 100,
          proximity: 10,
          border: '1px solid black',
          borderFill: 10,
          strokeWidth: 2,
          lineSoftness: 0.12,
          image: vangogh,
          maxPiecesCount: { x: 1, y: 1 },
          preventOffstageDrag: true,
          fixed: true,
          painter: new headbreaker.painters.Konva(),
        });

        background.adjustImagesToPuzzleHeight();
        background.autogenerate({
          horizontalPiecesCount: 3,
          verticalPiecesCount: 3,
        });
        background.shuffle(0.7);
        background.draw();
        background.attachSolvedValidator();
        background.onDisconnect(() => {
          console.log('풀림');
          setIsSalacted(true);
        });
        background.onValid(() => {
          console.log('완료');
          setIsSalacted(false);
        });
      };
    }
  }, [props.height, props.pieceSize, props.width, petImg]);

  const handleCapture = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current, {
        allowTaint: true,
        useCORS: true,
      });

      // 캡처된 이미지를 Blob 형태로 변환
      const imageBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      );

      // FormData 객체 생성
      const formData = new FormData();

      // JSON 데이터 준비
      const requestDto = JSON.stringify({
        content: '퍼즐을 완성했어요',
        type: 'TEXT_IMAGE',
      });
      const requestDtoBlob = new Blob([requestDto], {
        type: 'application/json',
      });

      // JSON 데이터를 FormData에 추가
      formData.append('requestDto', requestDtoBlob);

      // 이미지가 존재하면 FormData에 추가, 없으면 빈 파일 추가
      if (imageBlob) {
        formData.append('imageFile', imageBlob);
        console.log('이미지 잘 들어갔니?');
      } else {
        const emptyFile = new File([new Blob()], '', { type: 'image/jpeg' });
        formData.append('imageFile', emptyFile);
      }

      try {
        // POST 요청을 FormData와 함께 전송
        const response = await axios.post(
          `https://i11b101.p.ssafy.io/api/pets/${petId}/quests/${questid}/answers`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log('Response:', response.data);
        if (response.status == 200) {
          navigate('/earth');
        }
        return response.status;
      } catch (error) {
        console.error('Error:', error);
        alert('입력이 잘못되었어요.');
        navigate('/earth');
        // throw error;
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        height: '80%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          height: '70%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          ref={captureRef}
          style={{
            width: 'auto',
            height: 'auto',
            border: 'solid black 1px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            ref={puzzleRef}
            id={props.id}
            style={{
              width: '100%',
              height: '100%',
            }}
          ></div>
        </div>
        <div
          style={{
            width: '100%',
            height: '20%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <PrimaryButton
            theme={'white'}
            size={'large'}
            disabled={isSalacted}
            onClick={handleCapture}
          >
            퍼즐을 완료 했으면 캡처해주세요
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
