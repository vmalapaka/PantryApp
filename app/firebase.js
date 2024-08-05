// src/app/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAtKM-WlcpXZlDlspOR6w2EElMj2Qa5lVM",
  authDomain: "pantrytracker-786d4.firebaseapp.com",
  projectId: "pantrytracker-786d4",
  storageBucket: "pantrytracker-786d4.appspot.com",
  messagingSenderId: "315756036641",
  appId: "1:315756036641:web:1bcb887c39b6d9e7d95960",
  measurementId: "G-VP2HLVFFJD"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { firestore, auth, analytics };
