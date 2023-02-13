import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categorysState, categoryState, toDoSelector } from "../atoms";
import AddCategory from "./AddCategory";
import CreateTodo from "./CreateToDo";
import ToDo from "./Todo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categorys = useRecoilValue(categorysState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as string);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <CreateTodo />
      <hr />
      <AddCategory />
      <hr />
      <select value={category} onInput={onInput}>
        {categorys.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
