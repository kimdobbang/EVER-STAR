import React, { useRef, useState, useEffect } from 'react';
import {
  MemorialBook as OrganicsMemorialBook,
  PageType,
} from 'components/organics/MemorialBook/MemorialBook';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MemorialBookDetailsResponse } from 'api/memorialBookApi';
import { useFetchMemorialBookById } from 'hooks/useMemorialBooks';
import { useParams } from 'react-router-dom';
import { MemorialBookDiaryModal } from 'components/organics/MemorialBook/MemorialBookDiaryModal';

const parseMemorialBookData = (
  data: MemorialBookDetailsResponse,
  avatarUrl: string | undefined,
): PageType[] => {
  const { quests, questAnswers, aiAnswers, diaries, sentimentAnalysis, pet } = data;
  const pages: PageType[] = [];

  pages.push({
    type: 'cover',
    src: avatarUrl,
  });

  const sentimentResults = [
    sentimentAnalysis.week1Result * 100,
    sentimentAnalysis.week2Result * 100,
    sentimentAnalysis.week3Result * 100,
    sentimentAnalysis.week4Result * 100,
    sentimentAnalysis.week5Result * 100,
    sentimentAnalysis.week6Result * 100,
    sentimentAnalysis.week7Result * 100,
  ];

  pages.push({
    type: 'chart',
    title: '감정 분석',
    content: sentimentAnalysis.totalResult,
    scores: sentimentResults,
  });

  quests.forEach((quest) => {
    const questAnswer = questAnswers.find((answer) => answer.questId === quest.id);
    const aiAnswer = aiAnswers.find((answer) => answer.questId === quest.id);

    if (quest.type === 'TEXT' && questAnswer && aiAnswer) {
      pages.push({
        type: 'question',
        question: quest.content,
        myAnswer: questAnswer.content,
        petName: pet.name,
        petAnswer: aiAnswer.content,
      });
    } else if (
      (quest.type === 'TEXT_IMAGE' || quest.type === 'WEBRTC') &&
      questAnswer &&
      aiAnswer
    ) {
      pages.push({
        type: 'imageQuestion',
        question: quest.content,
        petName: pet.name,
        myImage: questAnswer.imageUrl,
        myAnswer: questAnswer.content,
        petImage: aiAnswer.imageUrl,
        petAnswer: aiAnswer.content,
      });
    }
  });

  diaries.forEach((diary) => {
    pages.push({
      type: 'diary',
      title: diary.title,
      content: diary.content,
      imageUrl: diary.imageUrl,
    });
  });

  return pages;
};

const loadImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map((img) => {
    return new Promise<void>((resolve, reject) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => reject();
      }
    });
  });
  return Promise.all(promises);
};

export const MemorialBook: React.FC<{ avatarUrl?: string }> = ({ avatarUrl }) => {
  const params = useParams<{ pet?: string; memorialBookId?: string }>();
  const petId = params.pet ? parseInt(params.pet, 10) : 0;
  const memorialBookId = params.memorialBookId ? parseInt(params.memorialBookId, 10) : 0;

  const memorialBookRef = useRef<HTMLDivElement>(null);
  const { data: memorialBookDetails, isLoading } = useFetchMemorialBookById(petId, memorialBookId);

  const [pages, setPages] = useState<PageType[]>([]);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);

  // 새로운 useEffect 추가: avatarUrl이 변경될 때 강제로 리렌더링
  useEffect(() => {
    if (memorialBookDetails) {
      const parsedPages = parseMemorialBookData(memorialBookDetails.data, avatarUrl);
      setPages(parsedPages);
    }
  }, [memorialBookDetails, avatarUrl]); // avatarUrl이 변경될 때마다 다시 데이터를 파싱

  // avatarUrl이 변경될 때 강제로 리렌더링 트리거
  useEffect(() => {
    if (memorialBookRef.current) {
      memorialBookRef.current.style.opacity = '0';
      setTimeout(() => {
        if (memorialBookRef.current) {
          memorialBookRef.current.style.opacity = '1';
        }
      }, 0);
    }
  }, [avatarUrl]);

  const handleDownloadPdf = async () => {
    if (memorialBookRef.current) {
      const book = memorialBookRef.current.querySelectorAll('.demoPage');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      for (let i = 0; i < book.length; i++) {
        const page = book[i] as HTMLElement;
        await loadImages(page);
        page.style.display = 'block';

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: true,
        });

        const imgData = canvas.toDataURL('image/png', 1.0);
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        if (i < book.length - 1) {
          pdf.addPage();
        }
        page.style.display = 'none';
      }

      pdf.save('memorial-book.pdf');
    }
  };

  const handleWriteDiary = () => {
    setIsDiaryModalOpen(true);
  };

  const handleCloseDiaryModal = () => {
    setIsDiaryModalOpen(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="relative z-10 my-4" ref={memorialBookRef}>
        <OrganicsMemorialBook pages={pages} />
      </div>
      <div className="relative z-10 flex justify-center m-4 space-x-4">
        <PrimaryButton
          theme="white"
          size="medium"
          onClick={handleDownloadPdf}
          disabled={false}
          icon={null}
        >
          PDF로 만들기
        </PrimaryButton>
        <PrimaryButton
          theme="white"
          size="medium"
          onClick={handleWriteDiary}
          disabled={false}
          icon={null}
        >
          일기쓰기
        </PrimaryButton>
      </div>

      <MemorialBookDiaryModal isOpen={isDiaryModalOpen} onClose={handleCloseDiaryModal} />
    </div>
  );
};