// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

//Googleログイン認証機能
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Firebaseアプリを初期化

export const db = getFirestore(app); // Firestoreのdbのインスタンスを作成
db.enablePersistence();

//Googleログイン認証機能
const provider = new GoogleAuthProvider();
export const auth = getAuth(); // Firebase認証のauthのインスタンスを作成

// Googleでのログイン処理
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(result.user); // ログイン成功時のユーザー情報をログとして出力
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error.message); // エラーメッセージをログとして出力
    });
};

// サインアウト機能
export const logOut = () => {
  auth
    .signOut() // FirebaseのsignOutメソッドを呼び出してログアウトを行う
    .then(() => {
      console.log("ログアウトしました"); // ログアウト成功時のメッセージをログとして出力
      document.location.reload(); // ログアウト後のリロードを行う（任意）
    })
    .catch((error) => {
      console.error("ログアウト時にエラーが発生しました", error); // ログアウト時のエラーをログとして出力
    });
};
