import React from "react";
import { useSetRecoilState } from "recoil";
import { SERVER_URL } from "../../utils/config";
import { RoomAtom } from "../store/atoms/room.atom";
import { RoomDetails } from "../../utils/types";

export const useGetRoom = ({ roomId }: { roomId: string }) => {
  const setRoom = useSetRecoilState(RoomAtom);

  React.useEffect(() => {
    setRoom((prev) => ({ ...prev, isLoading: true }));
    fetch(SERVER_URL + "/api/room/room/" + roomId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: RoomDetails) => {
        setRoom({ ...data, isLoading: false });
      })
      .catch((err) => console.log(err));
  }, [setRoom, roomId]);
};
