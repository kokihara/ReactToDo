import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { signInWithGoogle } from "../service/firebase";
import dig from "object-dig";
import { AuthContext } from "../providers/Authprovider";
import ToDoList from "./Todolist";

const DashboardBox = styled(Box)({
  textAlign: "center",
  marginTop: 40,
});

const DashboardTextField = styled(TextField)({
  padding: "7.5px,14px",
});
const DashboardButton = styled(Button)({
  lineHeight: 3,
  marginLeft: "10px",
});

const DashboardForm = styled("form")({
  width: "100%",
  maxWidth: 360,
  margin: "auto",
  marginBottom: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Dashboard = () => {
  const currentUser = useContext(AuthContext);
  const [inputName, setInputName] = useState(""); // ToDo名を保持するローカルステート
  const [todos, setTodos] = useState([]); // ToDoリストを保持するローカルステート
  console.log(inputName); // inputNameの値をログとして出力
  console.log(todos); // todosの値をログとして出力

  useEffect(() => {
    // ユーザーがログインした時に実行される
    fetch();
  }, [currentUser]); // currentUserの変更を監視し、変更があった場合に再実行される

  const fetch = async () => {
    if (dig(currentUser, "currentUser", "uid")) {
      // ユーザーがログインしている場合、ToDoリストを取得して更新する
      const data = await Api.initGet(currentUser.currentUser.uid);
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
    await Api.addTodo(inputName, currentUser.currentUser.uid);
    await setInputName(""); // 入力フォームをクリアする
    fetch();
  };

  return (
    <DashboardBox>
      {formRender()} {/* フォームをレンダリングする */}
      <ToDoList todos={todos} fetch={fetch} /> {/* ToDoListのpropsへtodosを渡す */}
    </DashboardBox>
  );
};
export default Dashboard; // Dashboardコンポーネントをエクスポートする
