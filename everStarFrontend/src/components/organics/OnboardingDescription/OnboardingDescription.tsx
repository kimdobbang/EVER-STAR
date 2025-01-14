import React from 'react';
import { Tag } from 'components/atoms/buttons/Tag';
import { Pagination } from 'components/molecules/Pagination/Pagination';
import { useSwipeable } from 'react-swipeable';
import PropTypes from 'prop-types';

interface Props {
  page: 'page-1' | 'page-2' | 'page-3' | 'page-4';
  onChangePage: (page: 'page-1' | 'page-2' | 'page-3' | 'page-4') => void;
}

const content: {
  [key in Props['page']]: {
    title: string;
    description: string;
    details: string;
    totalPages: number;
    activePage: number;
  };
} = {
  'page-1': {
    title: '퀘스트',
    description: '49개의 퀘스트, \n 반려동물과의 추억을 나눠요.',
    details:
      '49일 동안 매일 한 개씩 퀘스트를 드려요. 소중한 반려동물과의 일화를 기록해요. 사진 카툰화, 그림일기 등 선물도 숨어있어요.',
    totalPages: 4,
    activePage: 1,
  },
  'page-2': {
    title: '편지',
    description: '반려동물과의 편지, \n 마음을 전할 수 있어요.',
    details:
      '반려동물에게 사진과 편지를 보낼 수 있어요. \n 24시간 후 답장을 보내드려요. \n 무지개 다리 너머로 마음을 전해보세요.',
    totalPages: 4,
    activePage: 2,
  },
  'page-3': {
    title: '메모리얼북',
    description: '메모리얼 북, \n 49일간의 여정을 책으로 만들어요.',
    details:
      '기록했던 감정과 일화를 모아 한 권의 책이 완성돼요. \n 언제든 다시 볼 수 있어 더욱 좋아요.',
    totalPages: 4,
    activePage: 3,
  },
  'page-4': {
    title: '응원 메시지',
    description: '친구들의 메시지, \n 영원별에서 모아볼 수 있어요.',
    details:
      '소중한 사람들로부터 메시지를 받을 수 있어요. \n 여러분의 마음을 포스트잇에 적어 보아요. \n 예쁜 마음을 가득 담아 두고두고 볼 수 있어요.',
    totalPages: 4,
    activePage: 4,
  },
};

export const OnboardingDescription: React.FC<Props> = ({ page, onChangePage }) => {
  const { title, description, details, totalPages, activePage } = content[page];

  const handleSwipe = (deltaX: number) => {
    const currentPageIndex = activePage - 1;
    const newIndex = deltaX > 0 ? currentPageIndex - 1 : currentPageIndex + 1;
    if (newIndex >= 0 && newIndex < totalPages) {
      const newPage = `page-${newIndex + 1}` as Props['page'];
      onChangePage(newPage);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(-1),
    onSwipedRight: () => handleSwipe(1),
  });

  return (
    <div className="flex flex-col w-[334px] items-center relative" {...handlers}>
      <div className="flex flex-col items-start gap-4 p-4 relative self-stretch w-full flex-[0_0_auto]">
        <Tag className="bg-white">{title}</Tag>
        <div className="inline-flex flex-col items-start gap-2 relative flex-[0_0_auto]">
          <p className="relative w-fit mt-[-1.00px] text-gray-800">{description}</p>
        </div>
        <p className="relative self-stretch h-[86px] text-greyscaleblack-100">{details}</p>
      </div>
      <Pagination
        className="!flex-[0_0_auto]"
        totalPages={totalPages}
        activePage={activePage}
        onClick={(page) => onChangePage(`page-${page}` as Props['page'])}
      />
    </div>
  );
};

OnboardingDescription.propTypes = {
  page: PropTypes.oneOf(['page-1', 'page-2', 'page-3', 'page-4']) as PropTypes.Validator<
    'page-1' | 'page-2' | 'page-3' | 'page-4'
  >,
};
