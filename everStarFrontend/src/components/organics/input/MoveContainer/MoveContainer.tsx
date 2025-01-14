import { ModalHeader } from 'components/molecules/ModalHeader/ModalHeader';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';
import { PrimaryButton } from 'components/atoms/buttons/PrimaryButton';

type pageType = 'mypage' | 'profile' | 'random' | 'search';

interface IMoveContainer {
  title: string;
  nextPage1: pageType;
  nextPage2: pageType;
  onNextPage1Click?: () => void;
  onNextPage2Click?: () => void;
  onLeftIconClick?: () => void;
}
export const MoveContainer = ({
  title,
  nextPage1,
  nextPage2,
  onNextPage1Click,
  onNextPage2Click,
  onLeftIconClick,
}: IMoveContainer) => {
  const goNext = (next: pageType) => {
    switch (next) {
      case 'mypage':
        return '내 정보';
      case 'profile':
        return '반려동물 변경';
      case 'random':
        return '랜덤 탐사';
      case 'search':
        return '검색 탐사';
      default:
        return '내 정보';
    }
  };
  return (
    <div className="flex w-[360px] h-[278px] py-6 px-0 flex-col items-center gap-4 flex-shrink-0 bg-white rounded-lg">
      <ModalHeader text={title} showLeftIcon={true} onLeftIconClick={onLeftIconClick} />
      <PrimaryButton
        theme="white"
        size="large"
        onClick={onNextPage1Click}
        disabled={false}
        icon={<ArrowIcon color="black" direction="right" size={24} />}
      >
        {goNext(nextPage1)}
      </PrimaryButton>
      <PrimaryButton
        theme="white"
        size="large"
        onClick={onNextPage2Click}
        disabled={false}
        icon={<ArrowIcon color="black" direction="right" size={24} />}
      >
        {goNext(nextPage2)}
      </PrimaryButton>
    </div>
  );
};
