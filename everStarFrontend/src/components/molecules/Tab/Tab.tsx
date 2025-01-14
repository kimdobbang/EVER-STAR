import PropTypes from 'prop-types';
import React from 'react';

export interface TabProps {
  row: 'two' | 'three';
  activeTab: 'one' | 'two' | 'three';
  className?: string;
  onTabClick: (tab: 'one' | 'two' | 'three') => void;
}

export const Tab: React.FC<TabProps> = ({ row, activeTab, className = '', onTabClick }) => {
  return (
    <div
      className={`[border-bottom-style:solid] border-[#c3c9d3] w-[360px] flex items-start h-10 border-b bg-white relative ${className}`}
    >
      <div
        className={`flex self-stretch items-center grow gap-2 flex-1 justify-center relative ${activeTab === 'one' ? '[border-bottom-style:solid]' : ''} ${activeTab === 'one' ? 'border-[#ff9078]' : ''} ${['three', 'two'].includes(activeTab) ? 'p-2' : ''} ${activeTab === 'one' ? 'border-b-2' : ''}`}
        onClick={() => onTabClick('one')}
      >
        <div
          className={`[font-family:'Noto_Sans_KR-Bold',Helvetica] w-fit tracking-[-1.28px] text-base relative font-bold text-center leading-[normal] ${['three', 'two'].includes(activeTab) ? 'mt-[-0.50px]' : ''} ${activeTab === 'one' ? 'text-[#f28c76]' : 'text-[#1f2329]'}`}
        >
          내 정보
        </div>
      </div>
      <div
        className={`flex self-stretch items-center grow gap-2 flex-1 justify-center relative ${activeTab === 'two' ? '[border-bottom-style:solid]' : ''} ${activeTab === 'two' ? 'border-[#ff9078]' : ''} ${['one', 'three'].includes(activeTab) ? 'p-2' : ''} ${activeTab === 'two' ? 'border-b-2' : ''}`}
        onClick={() => onTabClick('two')}
      >
        <div
          className={`[font-family:'Noto_Sans_KR-Bold',Helvetica] w-fit tracking-[-1.28px] text-base relative font-bold text-center leading-[normal] ${['one', 'three'].includes(activeTab) ? 'mt-[-0.50px]' : ''} ${activeTab === 'two' ? 'text-[#f28c76]' : 'text-[#1f2329]'}`}
        >
          반려동물 정보
        </div>
      </div>
      {row === 'three' && (
        <div
          className={`flex self-stretch items-center grow gap-2 flex-1 justify-center relative ${activeTab === 'three' ? '[border-bottom-style:solid]' : ''} ${activeTab === 'three' ? 'border-[#ff9078]' : ''} ${['one', 'two'].includes(activeTab) ? 'p-2' : ''} ${activeTab === 'three' ? 'border-b-2' : ''}`}
          onClick={() => onTabClick('three')}
        >
          <div
            className={`[font-family:'Noto_Sans_KR-Bold',Helvetica] w-fit tracking-[-1.28px] text-base relative font-bold text-center leading-[normal] ${['one', 'two'].includes(activeTab) ? 'mt-[-0.50px]' : ''} ${activeTab === 'three' ? 'text-[#f28c76]' : 'text-[#1f2329]'}`}
          >
            메뉴명
          </div>
        </div>
      )}
    </div>
  );
};

Tab.propTypes = {
  row: PropTypes.oneOf(['two', 'three']).isRequired as PropTypes.Validator<'two' | 'three'>,
  activeTab: PropTypes.oneOf(['one', 'two', 'three']).isRequired as PropTypes.Validator<
    'one' | 'two' | 'three'
  >,
  className: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
};
