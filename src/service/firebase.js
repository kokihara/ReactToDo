// Firebase SDKから必要な機能をインポート
import { initializeApp } from "firebase/app";
import { getFirestore, memoryLocalCache } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebaseの設定情報
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig, { localCache: memoryLocalCache() });

// Firestoreのデータベースインスタンスを取得
export const db = getFirestore(app);

// Firebase認証のauthのインスタンスを取得
const provider = new GoogleAuthProvider();
export const auth = getAuth();

// Googleでのログイン処理
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(result.user); // ログイン成功時のユーザー情報をログに出力
    })
    .catch((error) => {
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error.message); // エラーメッセージをログに出力
    });
};

// サインアウト機能
export const logOut = () => {
  auth
    .signOut() // FirebaseのsignOutメソッドを呼び出してログアウト
    .then(() => {
      console.log("ログアウトしました"); // ログアウト成功時のメッセージをログに出力
      document.location.reload(); // ログアウト後にページをリロード（任意）
    })
    .catch((error) => {
      console.error("ログアウト時にエラーが発生しました", error); // ログアウト時のエラーをログに出力
    });
};

// このコードは、Firebaseを使用してWebアプリケーションの認証機能とFirestoreのデータベースを設定しています。
// initializeAppを使用してFirebaseアプリを初期化し、
// getFirestoreとgetAuthを使ってFirestoreのインスタンスと認証のインスタンスを取得しています。
// signInWithGoogle関数ではGoogleログインを行い、
// logOut関数ではログアウト処理を行っています。
