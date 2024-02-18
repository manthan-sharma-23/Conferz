import { atom } from "recoil";
import { USER } from "../../../utils/types";

const InitialState: { user: USER; loading: boolean } = {
  user: { name: null, email: null },
  loading: false,
};

export const UserAtom = atom({
  key: "user/atom",
  default: InitialState,
});
