import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAc97iPPZ4Roy628ZNHGkfNs60a9WXxMnY",
  authDomain: "iao-pjt.firebaseapp.com",
  projectId: "iao-pjt",
  storageBucket: "iao-pjt.appspot.com",
  messagingSenderId: "899412663684",
  appId: "1:899412663684:web:0dabe313cb1cfdfcfb91d1",
  measurementId: "G-CESR4142RM",
};

const app = initializeApp(firebaseConfig);

// Firebase 스토리지 참조
const storage = getStorage(app);

export { storage, app as default };
