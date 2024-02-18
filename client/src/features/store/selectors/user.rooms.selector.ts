import { selector } from "recoil";
import { UserAtom } from "../atoms/user.atom";
import { RoomAtom } from "../atoms/room.atom";

export const UserRoomsSelector = selector({
  key: "user/rooms/selector",
  get: ({ get }) => {
    const user = get(UserAtom);
    const rooms = get(RoomAtom);

    const isLoading = user.loading || rooms.isLoading;

    return { user: user.user, rooms: rooms.rooms, isLoading };
  },
});
