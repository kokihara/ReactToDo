import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api"; // API関連のユーティリティをインポート
import { styled } from "@mui/material/styles"; // Material-UIのスタイル付け機能をインポート
import ListItem from "@mui/material/ListItem"; // Material-UIのListItemコンポーネントをインポート
import ListItemAvatar from "@mui/material/ListItemAvatar"; // Material-UIのListItemAvatarコンポーネントをインポート
import ListItemText from "@mui/material/ListItemText"; // Material-UIのListItemTextコンポーネントをインポート
import Avatar from "@mui/material/Avatar"; // Material-UIのAvatarコンポーネントをインポート
import IconButton from "@mui/material/IconButton"; // Material-UIのIconButtonコンポーネントをインポート
import FolderIcon from "@mui/icons-material/Folder"; // Material-UIのFolderIconをインポート
import DeleteIcon from "@mui/icons-material/Delete"; // Material-UIのDeleteIconをインポート
import Checkbox from "@mui/material/Checkbox"; // Material-UIのCheckboxコンポーネントをインポート

// Material-UIのスタイリングを適用したdiv要素を作成
const ListDiv = styled("div")({
  maxWidth: 360,
  margin: "auto",
});

// Material-UIのスタイリングを適用したul要素を作成
const ListUl = styled("ul")({
  paddingLeft: 0,
  listStyle: "none",
});

// ToDoリストを表示するコンポーネント
const ToDoList = (props) => {
  // チェックボックスの状態を切り替える関数
  const checkHandle = async (id) => {
    // API経由でisCompleteの値を更新
    await Api.toggleComplete(id);
    props.fetch(); // 更新後、ToDoリストを再取得する
  };

  // ToDoを削除する関数
  const deleteHandle = (id) => {
    Api.deleteTodo(id); // API経由でToDoを削除
    props.fetch(); // 削除後、ToDoリストを再取得する
  };

  // ToDoリストの各要素をマップしてListItemとして表示
  const toDoList = props.todos.map((todo) => {
    return (
      <ListItem key={todo.id}>
        <ListItemAvatar>
          {/* チェックボックス */}
          <Checkbox checked={todo.isComplete} onChange={() => checkHandle(todo.id)} />
        </ListItemAvatar>
        {/* ToDoの内容 */}
        <ListItemText primary={todo.content} />
        {/* 削除ボタン */}
        <IconButton edge="end" aria-label="delete" onClick={() => deleteHandle(todo.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    );
  });

  return (
    <ListDiv>
      <h2>あなたのToDo</h2>
      <ListUl>{toDoList}</ListUl>
    </ListDiv>
  );
};

export default ToDoList; // ToDoListコンポーネントをエクスポートする

// このコードは、ToDoリストを表示するReactコンポーネントです。
// Material-UIのコンポーネントを使用して、各ToDoをListItemとして表示し、
// チェックボックスで完了状態を切り替えたり、
// 削除ボタンを押してToDoを削除したりできるようになっています。
// propsとして渡されたToDoリストをマップして、
// 各ToDoをListItemに変換して表示しています。
// また、完了状態の切り替えやToDoの削除が行われた際には、
// APIを介してデータを更新・削除し、最新のToDoリストを再取得しています。