import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const categorysState = atom<string[]>({
  key: "categorys",
  default: ["TO_DO", "DOING", "DONE"],
});

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

const { persistAtom } = recoilPersist({});

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
  default: "TO_DO",
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
