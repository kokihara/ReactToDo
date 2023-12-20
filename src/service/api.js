import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";

export const initGet = async (uid) => {
  const todo = query(collection(db, "todo"), orderBy("createdAt", "desc"), where("uid", "==", uid));

  const querySnapshot = await getDocs(todo);
  let todos = [];

  querySnapshot.forEach((doc) => {
    todos.push({
      id: doc.id,
      content: doc.data().content,
      isComplete: doc.data().isComplete,
    });
  });

  return todos; // 関数の最後で todos 配列を返すよう修正
};

export const addTodo = (content, uid) => {
  addDoc(collection(db, "todo"), {
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: serverTimestamp(),
  });
  console.log("Document written with ID: ", uid);
};

export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todo", id));
  console.log("Document delete with ID: ", id);
};

export const toggleComplete = async (id) => {
  const todoRef = doc(db, "todo", id);
  const todoDoc = await getDoc(todoRef);
  // 新しい完了状態を設定して更新
  return updateDoc(todoRef, {
    //もしチェックされたToDOが未完了ならば、isCompleteをTrue
    isComplete: todoDoc.data().isComplete ? false : true, // 現在の完了状態を更新
  });
};
