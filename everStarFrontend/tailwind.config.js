/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      // 아래의 값들은 min-width
      mobile: '360px',
      tablet: '768px',
      laptop: '1200px',
    },
    extend: {
      colors: {
        bggrey: 'var(--bggrey)',
        bgmodal: 'var(--bgmodal)',
        bgorange: 'var(--bgorange)',
        'greyscaleblack-100': 'var(--greyscaleblack-100)',
        'greyscaleblack-20': 'var(--greyscaleblack-20)',
        'greyscaleblack-40': 'var(--greyscaleblack-40)',
        'greyscaleblack-60': 'var(--greyscaleblack-60)',
        'greyscaleblack-80': 'var(--greyscaleblack-80)',
        greyscalewhite: 'var(--greyscalewhite)',
        mainerror: 'var(--mainerror)',
        mainprimary: 'var(--mainprimary)',
        'mainprimary-text': 'var(--mainprimary-text)',
        mainsecondary: 'var(--mainsecondary)',
        'variable-collection-primary': 'var(--variable-collection-primary)',
      },
      fontFamily: {
        'eng-h-h2': ['var(--eng-h-h2-font-family)', 'Helvetica'],
        'eng-h-h3': ['var(--eng-h-h3-font-family)', 'Helvetica'],
        'eng-p-p1': ['var(--eng-p-p1-font-family)', 'Helvetica'],
        'eng-p-p2': ['var(--eng-p-p2-font-family)', 'Helvetica'],
        'eng-subtitle-subtitle3': ['var(--eng-subtitle-subtitle3-font-family)', 'Helvetica'],
        'kor-body-body1': ['var(--kor-body-body1-font-family)', 'Helvetica'],
        'kor-body-body2': ['var(--kor-body-body2-font-family)', 'Helvetica'],
        'kor-h-h1': ['var(--kor-h-h1-font-family)', 'Helvetica'],
        'kor-h-h2': ['var(--kor-h-h2-font-family)', 'Helvetica'],
        'kor-h-h3': ['var(--kor-h-h3-font-family)', 'Helvetica'],
        'kor-p-p1': ['var(--kor-p-p1-font-family)', 'Helvetica'],
        'kor-p-p2': ['var(--kor-p-p2-font-family)', 'Helvetica'],
        'kor-p-p3': ['var(--kor-p-p3-font-family)', 'Helvetica'],
        'kor-p-p4': ['var(--kor-p-p4-font-family)', 'Helvetica'],
        'kor-subtitle-subtitle1': ['var(--kor-subtitle-subtitle1-font-family)', 'Helvetica'],
        'kor-subtitle-subtitle2': ['var(--kor-subtitle-subtitle2-font-family)', 'Helvetica'],
        'kor-subtitle-subtitle3': ['var(--kor-subtitle-subtitle3-font-family)', 'Helvetica'],
      },
      fontSize: {
        'kor-h-h1': [
          '24px',
          {
            lineHeight: 'var(--kor-h-h1-line-height)',
            letterSpacing: 'var(--kor-h-h1-letter-spacing)',
            fontWeight: 'var(--kor-h-h1-font-weight)',
            fontFamily: 'var(--kor-h-h1-font-family)',
          },
        ],
        'kor-h-h2': [
          '18px',
          {
            lineHeight: 'var(--kor-h-h2-line-height)',
            letterSpacing: 'var(--kor-h-h2-letter-spacing)',
            fontWeight: 'var(--kor-h-h2-font-weight)',
            fontFamily: 'var(--kor-h-h2-font-family)',
          },
        ],
        'kor-h-h3': [
          '16px',
          {
            lineHeight: 'var(--kor-h-h3-line-height)',
            letterSpacing: 'var(--kor-h-h3-letter-spacing)',
            fontWeight: 'var(--kor-h-h3-font-weight)',
            fontFamily: 'var(--kor-h-h3-font-family)',
          },
        ],
        'kor-subtitle-subtitle1': [
          '15px',
          {
            lineHeight: 'var(--kor-subtitle-subtitle1-line-height)',
            letterSpacing: 'var(--kor-subtitle-subtitle1-letter-spacing)',
            fontWeight: 'var(--kor-subtitle-subtitle1-font-weight)',
            fontFamily: 'var(--kor-subtitle-subtitle1-font-family)',
          },
        ],
        'kor-subtitle-subtitle2': [
          '14px',
          {
            lineHeight: 'var(--kor-subtitle-subtitle2-line-height)',
            letterSpacing: 'var(--kor-subtitle-subtitle2-letter-spacing)',
            fontWeight: 'var(--kor-subtitle-subtitle2-font-weight)',
            fontFamily: 'var(--kor-subtitle-subtitle2-font-family)',
          },
        ],
        'kor-subtitle-subtitle3': [
          '13px',
          {
            lineHeight: 'var(--kor-subtitle-subtitle3-line-height)',
            letterSpacing: 'var(--kor-subtitle-subtitle3-letter-spacing)',
            fontWeight: 'var(--kor-subtitle-subtitle3-font-weight)',
            fontFamily: 'var(--kor-subtitle-subtitle3-font-family)',
          },
        ],
        'kor-p-p1': [
          '15px',
          {
            lineHeight: 'var(--kor-p-p1-line-height)',
            letterSpacing: 'var(--kor-p-p1-letter-spacing)',
            fontWeight: 'var(--kor-p-p1-font-weight)',
            fontFamily: 'var(--kor-p-p1-font-family)',
          },
        ],
        'kor-p-p2': [
          '14px',
          {
            lineHeight: 'var(--kor-p-p2-line-height)',
            letterSpacing: 'var(--kor-p-p2-letter-spacing)',
            fontWeight: 'var(--kor-p-p2-font-weight)',
            fontFamily: 'var(--kor-p-p2-font-family)',
          },
        ],
        'kor-p-p3': [
          '13px',
          {
            lineHeight: 'var(--kor-p-p3-line-height)',
            letterSpacing: 'var(--kor-p-p3-letter-spacing)',
            fontWeight: 'var(--kor-p-p3-font-weight)',
            fontFamily: 'var(--kor-p-p3-font-family)',
          },
        ],
        'kor-p-p4': [
          '12px',
          {
            lineHeight: 'var(--kor-p-p4-line-height)',
            letterSpacing: 'var(--kor-p-p4-letter-spacing)',
            fontWeight: 'var(--kor-p-p4-font-weight)',
            fontFamily: 'var(--kor-p-p4-font-family)',
          },
        ],
        'eng-h-h2': [
          '18px',
          {
            lineHeight: 'var(--eng-h-h2-line-height)',
            letterSpacing: 'var(--eng-h-h2-letter-spacing)',
            fontWeight: 'var(--eng-h-h2-font-weight)',
            fontFamily: 'var(--eng-h-h2-font-family)',
          },
        ],
        'eng-h-h3': [
          '16px',
          {
            lineHeight: 'var(--eng-h-h3-line-height)',
            letterSpacing: 'var(--eng-h-h3-letter-spacing)',
            fontWeight: 'var(--eng-h-h3-font-weight)',
            fontFamily: 'var(--eng-h-h3-font-family)',
          },
        ],
        'eng-p-p1': [
          '15px',
          {
            lineHeight: 'var(--eng-p-p1-line-height)',
            letterSpacing: 'var(--eng-p-p1-letter-spacing)',
            fontWeight: 'var(--eng-p-p1-font-weight)',
            fontFamily: 'var(--eng-p-p1-font-family)',
          },
        ],
        'eng-p-p2': [
          '13px',
          {
            lineHeight: 'var(--eng-p-p2-line-height)',
            letterSpacing: 'var(--eng-p-p2-letter-spacing)',
            fontWeight: 'var(--eng-p-p2-font-weight)',
            fontFamily: 'var(--eng-p-p2-font-family)',
          },
        ],
        'eng-subtitle-subtitle3': [
          '13px',
          {
            lineHeight: 'var(--eng-subtitle-subtitle3-line-height)',
            letterSpacing: 'var(--eng-subtitle-subtitle3-letter-spacing)',
            fontWeight: 'var(--eng-subtitle-subtitle3-font-weight)',
            fontFamily: 'var(--eng-subtitle-subtitle3-font-family)',
          },
        ],
      },
      boxShadow: {
        error: 'var(--error)',
        focus: 'var(--focus)',
        large: 'var(--large)',
        small: 'var(--small)',
      },
      minHeight: {
        'screen-56': 'calc(100vh - 56px)', // 여기에 추가
      },
    },
    fontFamily: {
      body: ['Noto Sans KR'],
      Kyobo: ['KyoboHand'],
    },
  },
};
