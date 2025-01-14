import { useState } from 'react';
import { ArrowIcon } from 'components/atoms/icons/Arrow/ArrowIcon';

const gender = ['남자', '여자'];
const year = [2000, 2001, 2002, 2003, 2004, 2005, 2006];

interface IDropDownProps {
  type: 'gender' | 'year';
  title: string;
}

export const DropDown = ({ type, title }: IDropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectTitle, setSelectTitle] = useState<string>('');
  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: string | number) => () => {
    setSelectTitle(value.toString()); // 선택된 옵션의 값을 상태로 저장
    setIsOpen(false);
  };

  const data = type === 'gender' ? gender : year;

  return (
    <>
      <button
        className='flex flex-row items-center self-stretch justify-center gap-2 px-4 py-2 mt-6 bg-white rounded-md shadow-small h-14 w-[288px]'
        onClick={onToggle}
      >
        <div
          className={`[font-family:'Noto_Sans_KR-Bold',Helvetica] mt-[-1.00px] tracking-[-1.28px] text-base flex-1 text-[#8c929d] font-bold leading-[normal] relative ${isOpen ? 'text-mainprimary' : 'text-greyscaleblack-60'}`}
        >
          {selectTitle !== '' ? selectTitle : title}
        </div>
        {!isOpen && <ArrowIcon color='gray' direction='down' size={16} />}
        {isOpen && <ArrowIcon color='orange' direction='up' size={16} />}
      </button>
      {isOpen && (
        <div className='absolute z-10 w-[288px] mt-2 bg-white rounded-md shadow-lg'>
          <ul className='py-1'>
            {data.map((item, index) => (
              <li
                key={index}
                className='z-10 flex items-center justify-center p-4 mt-1 text-xl list-none cursor-pointer text-kor-p-p1'
                onClick={onOptionClicked(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
