import { useRecoilState } from "recoil";
import { RoomAtom } from "../store/atoms/room.atom";
import { useEffect } from "react";
import { SERVER_URL } from "../../utils/config";
import { USER_ROOM_TYPE } from "../../utils/types";

export const useGetUserRooms = () => {
  const [userRoom, setUserRoom] = useRecoilState(RoomAtom);

  useEffect(() => {
    setUserRoom((prev) => ({ ...prev, isLoading: true }));
    fetch(SERVER_URL + "/api/room/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: USER_ROOM_TYPE[]) => {
        setUserRoom({ rooms: data, isLoading: false });
      });
  }, [setUserRoom]);

  return userRoom;
};
