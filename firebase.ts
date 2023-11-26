import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBlmWu5skprA_-vIqQdDNt2ZrsLu2mkxSs',
  authDomain: 'wn-pwa.firebaseapp.com',
  databaseURL: 'https://wn-pwa-default-rtdb.firebaseio.com',
  projectId: 'wn-pwa',
  storageBucket: 'wn-pwa.appspot.com',
  messagingSenderId: '15906840472',
  appId: '1:15906840472:web:ecef428ad05d29b427d5ed',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getDatabase();
