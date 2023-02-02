import { atom } from "recoil";

export const authAtom = atom<User | null>({
    key: "authState",
    default: null,
});
