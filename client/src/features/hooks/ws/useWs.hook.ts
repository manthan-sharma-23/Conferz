import { useEffect } from "react";
import { WEBSOCKET_URL } from "../../../utils/config";
import { useRecoilState, useRecoilValue } from "recoil";
import { WsAtom } from "../../store/atoms/ws/ws.atom";
import { MESSAGE } from "../../../utils/types";
import { UserAtom } from "../../store/atoms/user.atom";

let message: string = "";

export const useWs = ({ roomId }: { roomId: string }) => {
  const [ws, setWs] = useRecoilState(WsAtom);
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
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
        if (message !== msg.data) {
          console.log(msg.data);
          message = msg.data;
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
  }, [setWs]);

  return ws;
};
