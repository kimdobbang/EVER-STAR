/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { QuestTextTemplate } from './QuestTextTemplate';
import { QuestWithImageTemplate } from './QuestWithImageTemplate';
import { useNavigate } from 'react-router-dom';
import { QuestPuzzle } from './QuestPuzzle';
import { QuestOpenviduTemplate } from './QuestOpenviduTemplate';

const TextQuestArray = [
  '1',
  '2',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '25',
  '26',
  '27',
  '28',
  '29',
  '32',
  '33',
  '35',
  '39',
  '41',
  '42',
  '43',
  '44',
  '46',
  '47',
  '48',
  '49',
];
const ImageQuestArray = ['3', '10', '17', '30', '36', '37', '40', '45'];
const OpenViduQuestArray = ['24', '34', '38'];
const PuzzleQuestArray = ['31'];
export const QuestRouter: React.FC = () => {
  const navigate = useNavigate();
  const { questid } = useParams<{ questid: string }>();

  useEffect(() => {
    if (OpenViduQuestArray.includes(questid!)) {
      navigate(`/earth/openvidu/${questid}`); // 원하는 경로로 리디렉트
    }
  }, [questid, navigate]);

  if (!questid) {
    return <div>존재하지 않는 퀘스트입니다.</div>;
  }

  if (TextQuestArray.includes(questid)) {
    return <QuestTextTemplate />;
  } else if (ImageQuestArray.includes(questid)) {
    return <QuestWithImageTemplate />;
  } else if (OpenViduQuestArray.includes(questid)) {
    return <QuestOpenviduTemplate />;
  } else if (PuzzleQuestArray.includes(questid)) {
    return <QuestPuzzle />;
  } else {
    return <div>존재하지 않는 퀘스트입니다.</div>;
  }
};
