import React from 'react';
import { ReactComponent as GoogleIcon } from 'assets/symbols/google.svg';
import { ReactComponent as KakaoIcon } from 'assets/symbols/kakao.svg';
import { ReactComponent as NotionIcon } from 'assets/symbols/notion.svg';
import { ReactComponent as YoutubeIcon } from 'assets/symbols/youtube.svg';
import { ReactComponent as InstagramIcon } from 'assets/symbols/instagram.svg';
import { ReactComponent as PatronIcon } from 'assets/symbols/patron.svg';

interface SNSIconsProps {
  variant: 'google' | 'kakao' | 'notion' | 'youtube' | 'instagram' | 'patron';
}

const iconMap = {
  google: GoogleIcon,
  kakao: KakaoIcon,
  notion: NotionIcon,
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  patron: PatronIcon,
};

export const SNSIcons: React.FC<SNSIconsProps> = ({ variant }) => {
  const IconComponent = iconMap[variant];
  return <IconComponent className='w-6 h-6' />;
};

export type { SNSIconsProps };
