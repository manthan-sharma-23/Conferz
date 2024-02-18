import { selector } from "recoil";
import { RoomAtom } from "../atoms/room.atom";

export const UsersInRoomSelector = selector({
  key: "room/users/selector",
  get: ({ get }) => {
    const users = get(RoomAtom).users;

    return users;
  },
});
