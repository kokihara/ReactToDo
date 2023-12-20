import React, { useContext } from "react";
import dig from "object-dig";
import { signInWithGoogle, logOut } from "../service/firebase";
import { AuthContext } from "../providers/Authprovider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const HeaderButton = styled(Button)({
  fontSize: "18px",
  fontWeight: "bold",
});

// ヘッダーに関するパーツ
const Header = () => {
  const currentUser = useContext(AuthContext);
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
        {/* ログインボタンをクリックした際に、【signInWithGoogle】が発生する。 */}
        {buttonRender()}
      </Toolbar>
    </AppBar>
  );
};

export default Header; // インポートするようにする。これがないと、呼び出せない。
