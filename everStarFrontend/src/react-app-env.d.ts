/// <reference types="react-scripts" />

interface ImportMetaEnv {
  REACT_APP_FIREBASE_API_KEY?: string;
  REACT_APP_FIREBASE_AUTHDOMAIN?: string;
  REACT_APP_FIREBASE_PROJECTID?: string;
  REACT_APP_FIREBASE_STORAGEBUCKET?: string;
  REACT_APP_FIREBASE_MESSAGINGSENDERID?: string;
  REACT_APP_FIREBASE_APPID?: string;
  REACT_APP_FIREBASE_MEASUREMENTID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
