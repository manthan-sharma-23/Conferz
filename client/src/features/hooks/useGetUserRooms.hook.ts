import { useRecoilState } from "recoil";
import { RoomsAtom } from "../store/atoms/rooms.atom";
import { useEffect } from "react";
import { SERVER_URL } from "../../utils/config";
import { USER_ROOM_TYPE } from "../../utils/types";

export const useGetUserRooms = () => {
  const [userRooms, setUserRooms] = useRecoilState(RoomsAtom);

  useEffect(() => {
    setUserRooms((prev) => ({ ...prev, isLoading: true }));
    fetch(SERVER_URL + "/api/room/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: USER_ROOM_TYPE[]) => {
        setUserRooms({ rooms: data, isLoading: false });
      });
  }, [setUserRooms]);

  return userRooms;
};
