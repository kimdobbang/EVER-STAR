import RocketSpinner from 'assets/symbols/rocket-splash.gif';
import BookSpinner from 'assets/symbols/book-splash.gif';

interface SplashProps {
  type:
    | 'splash'
    | 'book'
    | 'everCheerRocket'
    | 'everExploreRocket'
    | 'myPageRocket'
    | 'LetterWriteRocket'
    | 'LetterBoxRocket'
    | 'openvidu'
    | 'quest'
    | 'earthPage'
    | 'everPage';
  className?: string;
}

export const SplashTemplate = ({ type, className }: SplashProps) => {
  return (
    <div
      className={`${className} flex justify-center items-center min-h-screen`}
    >
      <div className='flex flex-col items-center justify-center text-center'>
        {type === 'splash' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>
              위로와 치유의 공간, 영원별에 오신 것을 환영합니다.
            </p>
          </div>
        )}
        {type === 'everCheerRocket' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>응원게시판으로 가고있어요!</p>
          </div>
        )}
        {type === 'everExploreRocket' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>탐사를 진행중이에요!</p>
          </div>
        )}
        {type === 'myPageRocket' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>내 정보를 확인중이에요!</p>
          </div>
        )}
        {type === 'LetterWriteRocket' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>편지를 쓰러 가고있어요!</p>
          </div>
        )}
        {type === 'LetterBoxRocket' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>편지함을 확인중이에요!</p>
          </div>
        )}
        {type === 'book' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={BookSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>메모리얼북으로 이동중이에요!</p>
          </div>
        )}
        {type === 'openvidu' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>화상통화를 준비중이에요!</p>
          </div>
        )}
        {type === 'quest' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>오늘의 질문을 확인하고있어요!</p>
          </div>
        )}
        {type === 'earthPage' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>일상의 공간, 지구별로 이동중이에요.</p>
          </div>
        )}
        {type === 'everPage' && (
          <div className='flex flex-col items-center justify-center text-center'>
            <img
              src={RocketSpinner}
              alt='Spinner'
              className='mb-4 w-[100px] h-[100px]'
            />
            <p className='kor-h-h2'>반려동물의 정보를 가져오고있어요!</p>
          </div>
        )}
      </div>
    </div>
  );
};
