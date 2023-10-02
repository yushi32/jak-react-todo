import React, { useState } from "react";
import "./styles.css";

export const App = () => {
  const [todoText, setTodoText] = useState('');

  const [incompleteTodos, setIncompleteTodos] = useState([
    'あああ',
    'いいい'
  ]);

  const [completeTodos, setCompleteTodos] = useState(['ううう']);
  
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
    <div className="input-area">
      <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText} />
      <button onClick={onClickAdd}>追加</button>
    </div>
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {incompleteTodos.map((todo, index) => {
          return (
            <li key={todo}>
              <div className="list-row">
                <p>{todo}</p>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
    <div className="complete-area">
    <p className="title">未完了のTODO</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <li key={todo}>
              <div className="list-row">
                <p>{todo}</p>
                <button onClick={() => {onClickBack(index)}}>戻す</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
    </>
  );
};