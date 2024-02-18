import { atom } from "recoil";
import { User } from "../../config";

const InitialState: User = {
  name: null,
  email: null,
};

export const UserAtom = atom({
  key: "user/atom",
  default: InitialState,
});
