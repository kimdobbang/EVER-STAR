// src/config.ts
const devConfig = {
  API_BASE_URL: 'https://i11b101.p.ssafy.io',
};

const prodConfig = {
  API_BASE_URL: '',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
