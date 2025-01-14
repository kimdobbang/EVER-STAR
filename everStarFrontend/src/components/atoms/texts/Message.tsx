interface IMessageProps {
  children: React.ReactNode;
  color: 'orange' | 'gray';
}

const bgColor = {
  orange: 'bg-bgorange',
  gray: 'bg-greyscaleblack-20',
};

export const Message = ({ children, color }: IMessageProps) => {
  return (
    <div
      className={`inline-flex max-w-[240px] items-center justify-center px-4 py-2 rounded-[20px] overflow-auto ${bgColor[color]}`}
    >
      <label className='kor-p-p4 text-greyscaleblack-100'>{children}</label>
    </div>
  );
};
