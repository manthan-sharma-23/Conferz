import { atom } from "recoil";
import { RoomDetails } from "../../../utils/types/index";

interface RoomAtomDetails extends RoomDetails {
  isLoading: boolean;
}

export const initialRoomState: RoomAtomDetails = {
  name: null,
  createdAt: null,
  createdBy: null,
  users:[],
  isLoading: false,
};

export const RoomAtom = atom({
  key: "room/atom",
  default: initialRoomState,
});
