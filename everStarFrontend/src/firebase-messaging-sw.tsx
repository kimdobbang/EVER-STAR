import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { fetchAlramPost } from 'api/alramApi'; // 직접 API 호출 함수 가져오기
import { Store } from 'store/Store'; // Redux 스토어를 직접 가져옴

export const firebaseConfig = {
  apiKey: 'AIzaSyCK8xtwPUso_WTxQpBS4GLfC4NLGIKL92U',
  authDomain: 'everstar-73a1c.firebaseapp.com',
  projectId: 'everstar-73a1c',
  storageBucket: 'everstar-73a1c.appspot.com',
  messagingSenderId: '215819035225',
  appId: '1:215819035225:web:c802133116dada08960748',
  measurementId: 'G-ZQ7RN4F560',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const handleAlramPost = async (formData: { deviceToken: string }) => {
  const token = Store.getState().auth.accessToken;
  // console.log(token);
  try {
    const data = await fetchAlramPost(formData, token);
    // console.log('알람 api 생성 성공:', data);
  } catch (error) {
    console.error('알람 api 생성 실패:', error);
  }
};

async function requestPermission() {
  // console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return;
  }

  // console.log('알림 권한이 허용됨');

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPIDKEY,
  });

  if (token) {
    // console.log('token :', token);
    handleAlramPost({ deviceToken: token });
  } else {
    console.log('Can not get Token');
  }

  // onMessage(messaging, (payload) => {
  //   console.log('메시지가 도착했습니다.', payload);
  //   // ...
  // });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        // console.log('Service Worker 등록 성공:', registration);
        // 권한 요청 및 토큰 받아오기
        requestPermission();
      })
      .catch((error) => {
        console.log('Service Worker 등록 실패:', error);
      });
  }
}

if (window.location.pathname === '/earth') {
  registerServiceWorker();
}

window.addEventListener('popstate', () => {
  if (window.location.pathname === '/earth') {
    registerServiceWorker();
  }
});
// eslint-disable-next-line no-restricted-globals
const originalPushState = history.pushState;
// eslint-disable-next-line no-restricted-globals
history.pushState = function (...args) {
  originalPushState.apply(this, args);
  const event = new Event('pushstate');
  window.dispatchEvent(event);
};

window.addEventListener('pushstate', () => {
  if (window.location.pathname === '/earth') {
    registerServiceWorker();
  }
});
