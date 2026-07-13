import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBC_tyVmij1JHmF1dzu4ZYkW_PSnv-ebqs',
  authDomain: 'app-pattoque-bqvb1.firebaseapp.com',
  projectId: 'app-pattoque-bqvb1',
  storageBucket: 'app-pattoque-bqvb1.firebasestorage.app',
  messagingSenderId: '21306153683',
  appId: '1:21306153683:web:705e4d1e214899edffd226',
};

const app = initializeApp(firebaseConfig);

window.__firebaseApp = app;
