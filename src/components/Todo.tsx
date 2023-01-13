import React from "react";
import { useSetRecoilState } from "recoil";
import { Category, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldTodos) => {
      return oldTodos.map((oldTodo) => {
        if (oldTodo.id === id) {
          return { ...oldTodo, category: name as Category };
        }
        return oldTodo;
      });
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Category.DOING && (
        <button name={Category.DOING} onClick={onClick}>
          Doing
        </button>
      )}
      {category !== Category.TO_DO && (
        <button name={Category.TO_DO} onClick={onClick}>
          To Do
        </button>
      )}
      {category !== Category.DONE && (
        <button name={Category.DONE} onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
