import React, { useContext } from "react";
import dig from "object-dig"; // オブジェクトのプロパティを安全に取得する関数をインポート
import { signInWithGoogle, logOut } from "../service/firebase"; // Firebase関連のユーティリティをインポート
import { AuthContext } from "../providers/Authprovider"; // 認証コンテキストをインポート
import AppBar from "@mui/material/AppBar"; // Material-UIのAppBarコンポーネントをインポート
import Box from "@mui/material/Box"; // Material-UIのBoxコンポーネントをインポート
import Toolbar from "@mui/material/Toolbar"; // Material-UIのToolbarコンポーネントをインポート
import Typography from "@mui/material/Typography"; // Material-UIのTypographyコンポーネントをインポート
import Button from "@mui/material/Button"; // Material-UIのButtonコンポーネントをインポート
import { styled } from "@mui/material/styles"; // Material-UIのスタイル付け機能をインポート

// Material-UIのスタイリングを適用したButtonコンポーネントを作成
const HeaderButton = styled(Button)({
  fontSize: "18px",
  fontWeight: "bold",
});

// ヘッダーに関するパーツ
const Header = () => {
  const currentUser = useContext(AuthContext); // 認証コンテキストからユーザー情報を取得
  console.log(currentUser); // ユーザー情報をログとして出力

  // ボタンをレンダリングする関数
  const buttonRender = () => {
    let buttonDom;
    if (dig(currentUser, "currentUser", "uid")) {
      // ログインしていた場合のボタンレンダリング
      buttonDom = (
        <HeaderButton variant="inherit" onClick={logOut}>
          ログアウト
        </HeaderButton>
      );
    } else {
      // ログインしていなかった場合のボタンレンダリング
      buttonDom = (
        <HeaderButton variant="inherit" onClick={signInWithGoogle}>
          ログイン
        </HeaderButton>
      );
    }
    return buttonDom;
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography fontSize="24px">ReactToDO</Typography>
        {/* ログインボタンをクリックした際に【signInWithGoogle】が発生する */}
        {buttonRender()}
      </Toolbar>
    </AppBar>
  );
};

export default Header; // Headerコンポーネントをエクスポートする

// このコードは、Reactアプリのヘッダー部分を構築するコンポーネントです。
// Material-UIのコンポーネントを使用して、
// アプリ名の表示とログイン/ログアウトのボタンを提供しています。
// AuthContextを使用してユーザーのログイン状態を取得し、
// その状態に応じてログインボタンまたはログアウトボタンを表示するようにしています。
