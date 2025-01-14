import { Message } from 'components/atoms/texts/Message';

interface IProps {
  flag: boolean;
  contents: string;
  time: string;
  sender?: string;
}

export const MessageWithTime = ({ flag, contents, time, sender }: IProps) => {
  return (
    <div className='flex flex-col'>
      {flag ? (
        <div className='flex flex-col p-1'>
          <strong className='mb-0.5 '>{sender}</strong>
          <div className='flex items-end justify-end w-full gap-1'>
            <Message color='orange'>{contents}</Message>
            <label className='text-xs font-medium leading-6 text-[#CCCCCC]'>{time}</label>
          </div>
        </div>
      ) : (
        <div className='flex flex-col p-1'>
          <strong className='mb-0.5 ml-10'>{sender}</strong>

          <div className='flex items-end justify-end w-full gap-1'>
            <label className='text-xs font-medium leading-6 text-[#CCCCCC]'>{time}</label>
            <Message color='gray'>{contents}</Message>
          </div>
        </div>
      )}
    </div>
  );
};
