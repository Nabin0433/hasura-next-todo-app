import { atom } from "recoil";

export const todosAtom = atom<Todo[]>({
    key: "todoState",
    default: [],
});
