import { useEffect } from "react";
import { WEBSOCKET_URL } from "../../../utils/config";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { WsAtom } from "../../store/atoms/ws/ws.atom";
import { MESSAGE } from "../../../utils/types";
import { UserAtom } from "../../store/atoms/user.atom";
import { RoomAtom } from "../../store/atoms/room.atom";

let prev_message: string = ""; //cache to avoid same message instances on client

export const useWs = ({ roomId }: { roomId: string }) => {
  const [ws, setWs] = useRecoilState(WsAtom);
  const setRoomUsers = useSetRecoilState(RoomAtom);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    if (!user.loading) {
      const wsInstance = new WebSocket(WEBSOCKET_URL);
      wsInstance.onopen = () => {
        const joinRequest: MESSAGE = {
          type: "JOIN",
          payload: {
            room: roomId,
            user: user.user,
          },
          sendAt: new Date(),
        };
        wsInstance.send(JSON.stringify(joinRequest));
        setWs(wsInstance);

        wsInstance.addEventListener("message", (msg) => {
          if (prev_message !== msg.data) {
            const message: MESSAGE = JSON.parse(msg.data);

            setRoomUsers((prev) => {
              if (message.type === "RENDER" && message.payload.users) {
                return { ...prev, users: message.payload.users };
              } else {
                return prev;
              }
            });
            prev_message = msg.data;
          }
        });
      };
      wsInstance.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      return () => {
        const leave: MESSAGE = {
          type: "LEAVE",
          payload: {
            user: user.user,
            room: roomId,
          },
          sendAt: new Date(),
        };
        wsInstance.send(JSON.stringify(leave));
        wsInstance.close();
        setWs(null);
      };
    }
  }, [setWs, setRoomUsers,user.user]);

  return ws;
};
