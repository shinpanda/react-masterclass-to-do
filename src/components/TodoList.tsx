import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { Category, categoryState, toDoSelector } from "../atoms";
import CreateTodo from "./CreateToDo";
import ToDo from "./Todo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Category);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <CreateTodo />
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Category.TO_DO}>To Do</option>
        <option value={Category.DOING}>Doing</option>
        <option value={Category.DONE}>Done</option>
      </select>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
