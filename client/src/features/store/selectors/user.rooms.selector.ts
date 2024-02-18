import { selector } from "recoil";
import { UserAtom } from "../atoms/user.atom";
import { RoomsAtom } from "../atoms/rooms.atom";

export const UserRoomsSelector = selector({
  key: "user/rooms/selector",
  get: ({ get }) => {
    const user = get(UserAtom);
    const rooms = get(RoomsAtom);

    const isLoading = user.loading || rooms.isLoading;

    return { user: user.user, rooms: rooms.rooms, isLoading };
  },
});
