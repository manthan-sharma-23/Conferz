import { atom } from "recoil";

export const WsAtom = atom({
  key: "ws/atom",
  default: null as WebSocket | null, 
});
