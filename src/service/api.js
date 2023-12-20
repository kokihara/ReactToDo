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
} from "firebase/firestore"; // Firestoreから必要なメソッドをインポート
import { db } from "./firebase"; // Firebaseのデータベース参照をインポート

// 特定のユーザーのToDoリストを取得する関数
export const initGet = async (uid) => {
  const todo = query(
    collection(db, "todo"),
    orderBy("createdAt", "desc"), // createdAtフィールドで降順にソート
    where("uid", "==", uid) // 特定のユーザーIDに一致するToDoをクエリ
  );

  const querySnapshot = await getDocs(todo);
  let todos = [];

  querySnapshot.forEach((doc) => {
    // ドキュメントを取得し、配列に追加
    todos.push({
      id: doc.id,
      content: doc.data().content,
      isComplete: doc.data().isComplete,
    });
  });

  return todos; // 取得したToDoリストを返す
};

// ToDoを追加する関数
export const addTodo = (content, uid) => {
  addDoc(collection(db, "todo"), {
    content: content,
    uid: uid,
    isComplete: false,
    createdAt: serverTimestamp(), // サーバーのタイムスタンプを使用して作成日時を記録
  });
  console.log("Document written with ID: ", uid);
};

// ToDoを削除する関数
export const deleteTodo = async (id) => {
  await deleteDoc(doc(db, "todo", id));
  console.log("Document deleted with ID: ", id);
};

// ToDoの完了状態を切り替える関数
export const toggleComplete = async (id) => {
  const todoRef = doc(db, "todo", id);
  const todoDoc = await getDoc(todoRef);

  // 新しい完了状態を設定して更新
  return updateDoc(todoRef, {
    // 現在の完了状態を反転させる
    isComplete: !todoDoc.data().isComplete,
  });
};

// このコードは、Firebase Firestoreを使用してToDoリストを操作するための関数を定義しています。
// initGet関数は特定のユーザーのToDoリストを取得し、addTodo関数は新しいToDoを追加します。
// deleteTodo関数はToDoを削除し、toggleComplete関数はToDoの完了状態を切り替えます。
// 各関数はFirebase Firestoreのメソッドを使用してデータベースとやり取りを行います。
