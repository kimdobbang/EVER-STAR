import type { Meta, StoryObj } from '@storybook/react';
import { InputContainer } from './InputContainer';

const meta: Meta<typeof InputContainer> = {
  title: 'Organics/InputContainer',
  component: InputContainer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'InputContainer 컴포넌트는 다양한 입력 요소들을 포함한 컨테이너입니다.',
      },
    },
  },
  argTypes: {
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
      description: 'LetterCard의 중앙 정렬 여부',
      defaultValue: true,
    },
    customText: {
      control: 'text',
      description: '커스텀 텍스트',
      defaultValue: '사랑하는 반려동물에게 <br /> 편지를 보내보세요',
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
  },
};

export default meta;

type Story = StoryObj<typeof InputContainer>;

export const Default: Story = {
  args: {
    headerText: '오늘의 질문',
    letterCardType: 'send',
    letterCardColor: 'white',
    letterCardState: 'notReceived',
    letterCardMessage: '뚜뚜의 생김새를 묘사해주세요',
    letterCardClassName: 'font-body !kor-subtitle-subtitle3', // 기본 폰트 설정
    centered: true,
    customText: '사랑하는 반려동물에게 <br /> 편지를 보내보세요', // 기본 커스텀 텍스트 설정
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: true,
  },
};

export const CustomText: Story = {
  args: {
    headerText: '오늘의 질문',
    customText: '사랑하는 반려동물에게 <br /> 편지를 보내보세요', // 기본 커스텀 텍스트 설정
    textboxLabel: '내용',
    largeButtonText: '이미지 추가',
    smallButtonText: '작성완료',
    showPrimaryButton: true,
  },
};