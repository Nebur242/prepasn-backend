import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAaEHzN1WARoUbB5QOH7Gkgrjgu1r7FrN0',
  authDomain: 'prepasndev.firebaseapp.com',
  projectId: 'prepasndev',
  storageBucket: 'prepasndev.appspot.com',
  messagingSenderId: '913713169426',
  appId: '1:913713169426:web:8bc2174094d36af89504cb',
  measurementId: 'G-V2J858KTPH',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
