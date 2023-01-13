import { atom, selector } from "recoil";

export enum Category {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Category;
}

const KEY = "TODOS";
const setLocalStorage = (toDo: IToDo[]) => {
  localStorage.setItem(KEY, JSON.stringify(toDo));
};
const getLocalStorage = () => {
  const toDos = localStorage.getItem(KEY);
  return toDos !== null ? (JSON.parse(toDos) as IToDo[]) : [];
};

export const categoryState = atom({
  key: "category",
  default: Category.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: getLocalStorage(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        setLocalStorage(newValue);
      });
    },
  ],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
