import React, { useState, useEffect } from "react";
import { auth } from "../service/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); //currentUserはログインしたユーザーのこと。

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser); //ログインユーザーの情報が変わったタイミング
  }, []); //第2引数がとても重要。一度のみ実行。

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={{ currentUser }}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
