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
import BookSpinner from 'assets/symbols/book-splash.gif';
import Swal from 'sweetalert2';

const parseMemorialBookData = (
  data: MemorialBookDetailsResponse,
  avatarUrl: string | undefined
): PageType[] => {
  const { quests, questAnswers, aiAnswers, diaries, sentimentAnalysis, pet } =
    data;
  const pages: PageType[] = [];

  pages.push({
    type: 'cover',
    src: avatarUrl
      ? `${avatarUrl}?timestamp=${Date.now()}`
      : `${pet.profileImageUrl}?timestamp=${Date.now()}`,
  });

  const sentimentResults = [
    sentimentAnalysis.week1Result,
    sentimentAnalysis.week2Result,
    sentimentAnalysis.week3Result,
    sentimentAnalysis.week4Result,
    sentimentAnalysis.week5Result,
    sentimentAnalysis.week6Result,
    sentimentAnalysis.week7Result,
  ];

  pages.push({
    type: 'chartScores',
    title: '감정 분석 결과',
    scores: sentimentResults,
  });

  pages.push({
    type: 'chartContent',
    title: '감정 분석 총평',
    content: sentimentAnalysis.totalResult,
  });

  quests.forEach((quest) => {
    const questAnswer = questAnswers.find(
      (answer) => answer.questId === quest.id
    );
    const aiAnswer = aiAnswers.find((answer) => answer.questId === quest.id);

    const myImage = questAnswer?.imageUrl
      ? `${questAnswer.imageUrl}?timestamp=${Date.now()}`
      : '';
    const petImage = aiAnswer?.imageUrl
      ? `${aiAnswer.imageUrl}?timestamp=${Date.now()}`
      : '';
    const myAnswer = questAnswer?.content || '';
    const petAnswer = aiAnswer?.content || '';

    pages.push({
      type: 'question',
      question: `${quest.id}. ${quest.content}`,
      myAnswer,
      petName: pet.name,
      petAnswer,
      myImage,
      petImage,
    });
  });

  diaries.forEach((diary, index) => {
    pages.push({
      type: 'diary',
      title: `${index + 1}번째 일기`,
      content: diary.content,
      imageUrl: diary.imageUrl
        ? `${diary.imageUrl}?timestamp=${Date.now()}`
        : '',
      createdTime: diary.createdTime,
    });
  });

  return pages;
};

const loadImageWithRetry = (
  img: HTMLImageElement,
  retries = 3
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const attemptLoad = (retryCount: number) => {
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => {
          if (retryCount > 0) {
            setTimeout(() => attemptLoad(retryCount - 1), 1000);
          } else {
            resolve(); // Resolve even on error to avoid blocking the process
          }
        };
      }
    };
    attemptLoad(retries);
  });
};

const loadImages = (element: HTMLElement) => {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map((img) => loadImageWithRetry(img));
  return Promise.all(promises);
};

export const MemorialBook: React.FC<{
  avatarUrl?: string;
  isOwner?: boolean;
}> = ({ avatarUrl, isOwner }) => {
  const params = useParams<{ pet?: string; memorialBookId?: string }>();
  const petId = params.pet ? parseInt(params.pet, 10) : 0;
  const memorialBookId = params.memorialBookId
    ? parseInt(params.memorialBookId, 10)
    : 0;

  const memorialBookRef = useRef<HTMLDivElement>(null);
  const { data: memorialBookDetails, refetch } = useFetchMemorialBookById(
    petId,
    memorialBookId
  );

  const [pages, setPages] = useState<PageType[]>([]);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isDiaryUpdated, setIsDiaryUpdated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (memorialBookDetails) {
      const parsedPages = parseMemorialBookData(
        memorialBookDetails.data,
        avatarUrl
      );
      setPages(parsedPages);
    }
  }, [memorialBookDetails, avatarUrl]);

  useEffect(() => {
    if (isDiaryUpdated) {
      refetch();

      Swal.fire({
        icon: 'success',
        title: '저장',
        text: '저장이 완료되었어요.',
        confirmButtonColor: '#FF9078',
      });

      setIsDiaryUpdated(false);
    }
  }, [isDiaryUpdated, refetch]);

  const handleDownloadPdf = async () => {
    setIsDownloading(true);

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
          allowTaint: true,
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

    setIsDownloading(false);
  };

  const handleWriteDiary = () => {
    setIsDiaryModalOpen(true);
  };

  const handleCloseDiaryModal = () => {
    setIsDiaryModalOpen(false);
  };

  return (
    <div>
      {isDownloading && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50'>
          <img src={BookSpinner} alt='Loading' className='w-24 h-24' />
        </div>
      )}
      <div className='relative z-10 my-4' ref={memorialBookRef}>
        <OrganicsMemorialBook pages={pages} />
      </div>
      <div className='relative z-10 flex justify-center m-4 space-x-4'>
        {isOwner && (
          <>
            <PrimaryButton
              theme='white'
              size='medium'
              onClick={handleDownloadPdf}
              disabled={false}
              icon={null}
            >
              PDF로 만들기
            </PrimaryButton>
            <PrimaryButton
              theme='white'
              size='medium'
              onClick={handleWriteDiary}
              disabled={false}
              icon={null}
            >
              일기쓰기
            </PrimaryButton>
          </>
        )}
      </div>

      <MemorialBookDiaryModal
        isOpen={isDiaryModalOpen}
        onClose={handleCloseDiaryModal}
        onSuccess={() => setIsDiaryUpdated(true)}
      />
    </div>
  );
};
