import { atom } from "recoil";

const initialState: MediaStream | null = null;

export const RemoteStreamAtom = atom({
  key: "remote/stream/atom",
  default: initialState,
});
