import React, { useState, useEffect } from "react";
import { auth } from "../service/firebase"; // Firebaseの認証関連のユーティリティをインポート

// 認証情報を提供するためのContextを作成
export const AuthContext = React.createContext();

// 認証情報を提供するAuthProviderコンポーネント
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // ログインしたユーザー情報を保持するステート

  useEffect(() => {
    // Firebaseの認証状態が変化したら実行されるコールバック関数を設定
    auth.onAuthStateChanged(setCurrentUser);
  }, []); // 空の配列を渡すことで、このuseEffectはマウント時に一度だけ実行される

  return (
    // 認証情報をコンポーネントツリーに流し込むためのAuthProviderコンポーネント
    <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider; // AuthProviderコンポーネントをデフォルトエクスポートする

// このコードは、ReactコンポーネントのAuthProviderを通じて
// 認証情報を提供するためのContextを設定しています。
// currentUserというステートを使用して、
// ログインしたユーザー情報を保持し、FirebaseのonAuthStateChangedメソッドを使用して
// 認証の状態が変化したときにsetCurrentUserを呼び出し、
// ユーザー情報を更新しています。
// そして、AuthContext.Providerを使って、children（子コンポーネント）に認証情報を提供しています。
