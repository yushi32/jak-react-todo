import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  
  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  };

  const onClickDelete = (index) => {
    deleteFromIncompleteTodos(index);
  };

  const onClickComplete = (index) => {
    // 未完了リストから完了ボタンが押されたタスクを削除する
    deleteFromIncompleteTodos(index);

    // 完了リストに完了ボタンが押されたタスクを追加する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    
    // それぞれのStateを更新する
    // incompleteTodosはdeletFrom...関数で更新済みなので削除
    setCompleteTodos(newCompleteTodos);
  };

  const deleteFromIncompleteTodos = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
    <InputTodo
      todoText={todoText}
      onChange={onChangeTodoText}
      onClick={onClickAdd}
    />
    <IncompleteTodos
      todos={incompleteTodos}
      onClickComplete={onClickComplete}
      onClickDelete={onClickDelete}
    />
    <CompleteTodos
      todos={completeTodos}
      onClickBack={onClickBack}
    />
    </>
  );
};