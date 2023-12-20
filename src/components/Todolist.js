import React, { useState, useEffect, useContext } from "react";
import * as Api from "../service/api";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

const ListDiv = styled("div")({
  maxWidth: 360,
  margin: "auto",
});

const ListUl = styled("ul")({
  paddingLeft: 0,
  listStyle: "none",
});

const ToDoList = (props) => {
  const checkHundle = async (id) => {
    //Api経由でisCompleteの値を更新
    await Api.toggleComplete(id);
    props.fetch();
  };

  //const { todos, fetch } = props; // propsからtodosとfetchを受け取る
  const deleteHundle = (id) => {
    Api.deleteTodo(id);
    props.fetch(); // 削除後、ToDoリストを再取得するためのfetch関数を呼び出す
  };
  const toDoList = props.todos.map((todo) => {
    return (
      <ListItem key={todo.id}>
        <ListItemAvatar>
          <Checkbox checked={todo.isComplete} onChange={() => checkHundle(todo.id)} />
        </ListItemAvatar>
        <ListItemText primary={todo.content} />
        <IconButton edge="end" aria-label="delete" onClick={() => deleteHundle(todo.id)}>
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
export default ToDoList;
