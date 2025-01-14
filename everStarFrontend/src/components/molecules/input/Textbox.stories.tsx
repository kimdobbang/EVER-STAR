import { action } from '@storybook/addon-actions';
import { Textbox } from './Textbox';

export default {
  component: Textbox,
  title: 'Molecules/Textbox',
  tags: ['autodocs'],
  excludeStories: /.*Data$/,
};

export const Default = {
  args: {
    type: 'large',
    label: 'Default Label',
    showInfoText: true,
    infoText: '0/255',
    infoTextAlign: 'left',
    showStar: true,
    ghostText: '고스트 텍스트',
    onChangeText: action('onChangeText'),
  },
};

export const SmallTextbox = {
  args: {
    type: 'small',
    label: 'Small Label',
    showInfoText: true,
    infoText: '0/255',
    infoTextAlign: 'left',
    showStar: true,
    ghostText: '고스트 텍스트',
    onChangeText: action('onChangeText'),
  },
};

export const WithoutInfoText = {
  args: {
    type: 'large',
    label: 'No Info Label',
    showInfoText: false,
    infoText: '',
    infoTextAlign: 'left',
    showStar: true,
    ghostText: '고스트 텍스트',
    onChangeText: action('onChangeText'),
  },
};

export const CenterAlignedInfoText = {
  args: {
    type: 'large',
    label: 'Center Aligned Info',
    showInfoText: true,
    infoText: '0/255',
    infoTextAlign: 'center',
    showStar: true,
    ghostText: '고스트 텍스트',
    onChangeText: action('onChangeText'),
  },
};
