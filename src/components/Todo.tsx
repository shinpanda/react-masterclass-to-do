import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categorysState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categorys = useRecoilValue(categorysState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldTodos) => {
      return oldTodos.map((oldTodo) => {
        if (oldTodo.id === id) {
          return { ...oldTodo, category: name as string };
        }
        return oldTodo;
      });
    });
  };
  return (
    <li>
      <span>{text}</span>
      <>
        {categorys
          .filter((optionCategory) => optionCategory !== category)
          .map((filteredCategory) => (
            <button name={filteredCategory} onClick={onClick}>
              {filteredCategory}
            </button>
          ))}
      </>
    </li>
  );
}

export default ToDo;
