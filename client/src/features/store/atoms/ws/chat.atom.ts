import { atom } from "recoil";
import { TEXT } from "../../../../utils/types";

export const initialChatState: TEXT[] = [];

export const ChatAtom = atom({
  key: "chat/atom",
  default: initialChatState,
});
