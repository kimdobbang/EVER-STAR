import type { Meta, StoryObj } from '@storybook/react';
import { InteractiveForm } from './InteractiveForm';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof InteractiveForm> = {
  title: 'templates/InteractiveForm',
  component: InteractiveForm,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
      },
      defaultViewport: 'desktop',
    },
  },
  argTypes: {
    currentPage: {
      control: 'number',
      description: '현재 페이지 번호',
      defaultValue: 1,
    },
    totalPages: {
      control: 'number',
      description: '전체 페이지 수',
      defaultValue: 10,
    },
    onPageChange: {
      action: 'pageChanged',
      description: '페이지 변경 시 호출되는 함수',
    },
    headerText: {
      control: 'text',
      description: '헤더에 표시될 텍스트',
      defaultValue: '오늘의 질문',
    },
    letterCardType: {
      control: {
        type: 'select',
        options: ['default', 'send', 'receive'],
      },
      description: 'LetterCard의 타입',
      defaultValue: 'send',
    },
    letterCardColor: {
      control: {
        type: 'select',
        options: ['white', 'bgorange', 'orange', 'gray'],
      },
      description: 'LetterCard의 색상',
      defaultValue: 'white',
    },
    letterCardState: {
      control: {
        type: 'select',
        options: ['received', 'notReceived'],
      },
      description: 'LetterCard의 상태',
      defaultValue: 'notReceived',
    },
    letterCardMessage: {
      control: 'text',
      description: 'LetterCard의 메시지',
      defaultValue: '뚜뚜의 생김새를 묘사해주세요',
    },
    letterCardClassName: {
      control: 'text',
      description: 'LetterCard의 폰트 클래스',
      defaultValue: 'font-body !kor-subtitle-subtitle3',
    },
    centered: {
      control: 'boolean',
      description: 'LetterCard 중앙 정렬 여부',
      defaultValue: true,
    },
    textboxLabel: {
      control: 'text',
      description: 'Textbox의 라벨',
      defaultValue: '내용',
    },
    largeButtonText: {
      control: 'text',
      description: '큰 버튼에 표시될 텍스트',
      defaultValue: '이미지 추가',
    },
    smallButtonText: {
      control: 'text',
      description: '작은 버튼에 표시될 텍스트',
      defaultValue: '작성완료',
    },
    showPrimaryButton: {
      control: 'boolean',
      description: 'Large Primary Button 표시 여부',
      defaultValue: true,
    },
    customText: {
      control: 'text',
      description: 'LetterCard 대신 표시될 커스텀 텍스트',
      defaultValue: '',
    },
    petName: {
      control: 'text',
      description: '반려동물 이름',
      defaultValue: '뚜뚜',
    },
    myName: {
      control: 'text',
      description: '사용자 이름',
      defaultValue: '사용자',
    },
    myMessage: {
      control: 'text',
      description: '사용자가 보낸 메시지',
      defaultValue: '뚜뚜에게 보낸 메시지입니다.',
    },
    dateTime: {
      control: 'text',
      description: '보낸 날짜와 시간',
      defaultValue: '2024-07-24 10:00:00',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InteractiveForm>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: action('pageChanged'),
    headerText: '오늘의 질문',
    letterCardType: 'send',
    letterCardColor: 'white',
    letterCardState: 'notReceived',
    letterCardMessage: '뚜뚜의 생김새를 묘사해주세요',
    letterCardClassName: 'font-body !kor-subtitle-subtitle3',
    centered: true,
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: true,
    customText: '',
  },
};

export const CustomText: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: action('pageChanged'),
    headerText: '일기 쓰기',
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: true,
    customText: '기억을 <br /> 이어가보세요',
  },
};

export const Text: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: action('pageChanged'),
    headerText: '오늘의 질문',
    letterCardType: 'send',
    letterCardColor: 'white',
    letterCardState: 'notReceived',
    letterCardMessage: '뚜뚜와 놀았던 이야기를 해주세요',
    letterCardClassName: 'font-body !kor-subtitle-subtitle3',
    centered: true,
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: false,
    customText: '',
  },
};

export const Receive: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: action('pageChanged'),
    headerText: '답장하기',
    letterCardType: 'receive',
    letterCardColor: 'bgorange',
    letterCardState: 'received',
    letterCardMessage: '형 안녕! 뚜뚜가 사용자님께 보낸 편지입니다. ',
    letterCardClassName: '',
    centered: true,
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: true,
    customText: '',
    petName: '뚜뚜',
    myName: '사용자',
    myMessage: '뚜뚜에게 보낸 메시지입니다.',
    dateTime: '2024-07-24 10:00:00',
  },
};

export const Rewrite: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: action('pageChanged'),
    headerText: '답장하기',
    letterCardType: 'send',
    letterCardColor: 'bgorange',
    letterCardState: 'received',
    letterCardMessage: '형 안녕! 뚜뚜가 사용자님께 보낸 편지입니다. ',
    letterCardClassName: '',
    centered: true,
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: true,
    customText: '',
    petName: '뚜뚜',
    myName: '사용자',
    myMessage: '뚜뚜에게 보낸 메시지입니다.',
    dateTime: '2024-07-24 10:00:00',
  },
};
