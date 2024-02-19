import { selector } from "recoil";
import { RoomAtom } from "../atoms/room.atom";

export const RoomDetailsSelector = selector({
  key: "room/details",
  get: ({ get }) => {
    const room = get(RoomAtom);

    return {
      name: room.name,
      createdBy: room.createdBy,
      type: room.type,
      isLoading: room.isLoading,
    };
  },
});
