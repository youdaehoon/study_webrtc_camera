import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey:
    process.env.NODE_ENV === "production"
      ? process.env.FB_KEY
      : process.env.NEXT_PUBLIC_FB_KEY,
  authDomain: "iao-pjt.firebaseapp.com",
  projectId: "iao-pjt",
  storageBucket: "iao-pjt.appspot.com",
  messagingSenderId: "899412663684",
  appId: "1:899412663684:web:b4c1c396a73f9accfb91d1",
  measurementId: "G-CESR4142RM",
};

const app = initializeApp(firebaseConfig);

// Firebase 스토리지 참조
const storage = getStorage(app);

export { storage, app as default };
