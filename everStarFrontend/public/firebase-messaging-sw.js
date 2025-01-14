//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging/sw';
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);
// importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js');
// importScripts(
//   'https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging.js'
// );
const firebaseApp = {
  apiKey: 'AIzaSyCK8xtwPUso_WTxQpBS4GLfC4NLGIKL92U',
  authDomain: 'everstar-73a1c.firebaseapp.com',
  databaseURL: 'https://everstar-73a1c.firebaseio.com',
  projectId: 'everstar-73a1c',
  storageBucket: 'everstar-73a1c.appspot.com',
  messagingSenderId: '215819035225',
  appId: '1:215819035225:web:c802133116dada08960748',
  measurementId: 'G-ZQ7RN4F560',
};

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
firebase.initializeApp(firebaseApp);

// const messaging = getMessaging(firebaseApp);

const messaging = firebase.messaging();
// console.log('messaging: ', messaging);
messaging.onBackgroundMessage((payload) => {
  // console.log(
  //   '[firebase-messaging-sw.js] Received background message ',
  //   payload
  // );
  const notificationTitle = payload.notification?.title || 'No Title';
  const notificationOptions = {
    body: payload.notification?.body || 'No Body',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
// import { initializeApp } from 'firebase/app';
// import { getMessaging } from 'firebase/messaging/sw';

// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// const messaging = getMessaging(firebaseApp);
