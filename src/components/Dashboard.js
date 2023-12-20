import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api"; // API関連のユーティリティをインポート
import { TextField } from "@mui/material"; // MUIのテキストフィールドをインポート
import Button from "@mui/material/Button"; // MUIのボタンをインポート
import { Box } from "@mui/material"; // MUIのBoxコンポーネントをインポート
import { styled } from "@mui/material/styles"; // MUIのスタイル付け機能をインポート
import { signInWithGoogle } from "../service/firebase"; // Googleログイン関連のユーティリティをインポート
import dig from "object-dig"; // オブジェクトのプロパティを安全に取得する関数をインポート
import { AuthContext } from "../providers/Authprovider"; // 認証コンテキストをインポート
import ToDoList from "./Todolist"; // ToDoリストコンポーネントをインポート

// MUIのスタイリングを適用したBoxコンポーネントを作成
const DashboardBox = styled(Box)({
  textAlign: "center",
  marginTop: 40,
});

// MUIのスタイリングを適用したTextFieldコンポーネントを作成
const DashboardTextField = styled(TextField)({
  padding: "7.5px,14px",
});

// MUIのスタイリングを適用したButtonコンポーネントを作成
const DashboardButton = styled(Button)({
  lineHeight: 3,
  marginLeft: "10px",
});

// MUIのスタイリングを適用したform要素を作成
const DashboardForm = styled("form")({
  width: "100%",
  maxWidth: 360,
  margin: "auto",
  marginBottom: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// Dashboardコンポーネントの定義
const Dashboard = () => {
  const currentUser = useContext(AuthContext); // 認証コンテキストからユーザー情報を取得
  const [inputName, setInputName] = useState(""); // ToDo名を保持するローカルステート
  const [todos, setTodos] = useState([]); // ToDoリストを保持するローカルステート

  console.log(inputName); // inputNameの値をログとして出力
  console.log(todos); // todosの値をログとして出力

  useEffect(() => {
    // ユーザーがログインした時に実行される
    fetch(); // データを取得する関数を呼び出す
  }, [currentUser]); // currentUserの変更を監視し、変更があった場合に再実行される

  const fetch = async () => {
    if (dig(currentUser, "currentUser", "uid")) {
      // ユーザーがログインしている場合、ToDoリストを取得して更新する
      const data = await Api.initGet(currentUser.currentUser.uid); // APIを使用してToDoリストを取得
      setTodos(data); // 取得したToDoリストをセットする
      console.log(todos); // 更新後のtodosの値をログとして出力
    }
  };

  const formRender = () => {
    let Dom;
    if (dig(currentUser, "currentUser", "uid")) {
      // ログインしている場合、ToDoの入力フォームを表示する
      Dom = (
        <DashboardForm>
          <DashboardTextField
            id="filled-basic"
            placeholder="ToDo名"
            value={inputName}
            onChange={(event) => setInputName(event.currentTarget.value)}
          />
          <DashboardButton
            variant="contained"
            type="button"
            color="primary"
            size="small"
            disabled={inputName.length > 0 ? false : true}
            onClick={() => post()}
          >
            追加
          </DashboardButton>
        </DashboardForm>
      );
    } else {
      // ログインしていない場合、ログインボタンを表示する
      Dom = <button onClick={signInWithGoogle}>ログイン</button>;
    }
    return Dom;
  };

  const post = async () => {
    // ToDoを追加する
    await Api.addTodo(inputName, currentUser.currentUser.uid); // APIを使用してToDoを追加
    await setInputName(""); // 入力フォームをクリアする
    fetch(); // データを再取得する
  };

  return (
    <DashboardBox>
      {formRender()} {/* フォームをレンダリングする */}
      <ToDoList todos={todos} fetch={fetch} /> {/* ToDoListのpropsへtodosを渡す */}
    </DashboardBox>
  );
};

export default Dashboard; // Dashboardコンポーネントをエクスポートする

//このコードは、ログイン状態に応じてToDoリストを表示し、
// 新しいToDoを追加できるようにするReactコンポーネントです。
// AuthContextからユーザーのログイン情報を取得し、
// ToDoを追加する際にはAPIを使用してデータを操作しています。
// ログイン状態に応じてフォームをレンダリングし、
// ToDoListコンポーネントにToDoリストを渡して表示しています。
