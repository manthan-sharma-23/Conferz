import { useCallback, useEffect } from "react";
import { WEBSOCKET_URL } from "../../../utils/config";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { WsAtom } from "../../store/atoms/ws/ws.atom";
import { CALL, MESSAGE, TEXT, USER } from "../../../utils/types";
import { UserAtom } from "../../store/atoms/user.atom";
import { RoomAtom } from "../../store/atoms/room.atom";
import { ChatAtom } from "../../store/atoms/ws/chat.atom";
import p2p from "../../../features/services/peer";

let prev_message: string = ""; //cache to avoid same message instances on client

export const useWs = ({ roomId }: { roomId: string }) => {
  const [ws, setWs] = useRecoilState(WsAtom);
  const setChat = useSetRecoilState(ChatAtom);
  const setRoomUsers = useSetRecoilState(RoomAtom);
  const user = useRecoilValue(UserAtom);


  const acceptIncommingCall = useCallback(
    async ({ call, ws }: { call: CALL; ws: WebSocket }) => {
      const answer = await p2p.getAnswer(call.offer);

      const accept: MESSAGE = {
        type: "P2P",
        sendAt: new Date(),
        payload: {
          call: {
            room: call.room,
            from: call.from,
            roomType: call.roomType,
            offer: answer!,
            type: "answer",
          },
        },
      };

      ws.send(JSON.stringify(accept));
    },
    []
  );

  const handleAcceptedCall = useCallback(({ call }: { call: CALL }) => {
    p2p.setLocalDescription(call.offer);
    console.log("call accepted");
  }, []);

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

            if (message.type === "MESSAGE" && message.payload.user) {
              const text: TEXT = {
                userId: message.payload.user.id!,
                sendAt: message.sendAt,
                text: message.payload.text!,
                type: message.type,
              };

              setChat((prev) => [...prev, text]);
            }

            // if (message.type === "BROADCAST" && message.payload.text) {
            //   if (
            //     message.payload.text !== "null joined" &&
            //     message.payload.text !== "null left"
            //   ) {
            //     const text: TEXT = {
            //       sendAt: message.sendAt,
            //       text: message.payload.text!,
            //       type: message.type,
            //     };
            //     setChat((prev) => [...prev, text]);
            //   }
            // }

            if (message.type === "RENDER" && message.payload.users) {
              sendOffer({ roomId, user: user.user, ws: wsInstance });
            }

            if (message.type === "P2P") {
              if (message.payload.call?.type === "incomming") {
                acceptIncommingCall({
                  call: message.payload.call,
                  ws: wsInstance,
                });
              }
              if (message.payload.call?.type === "answer") {
                handleAcceptedCall({
                  call: message.payload.call,
                });
              }
            }

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
        wsInstance.close();
        setWs(null);
      };
    }
  }, [setWs, setRoomUsers, user.user, roomId, setChat]);

  return ws;
};

const sendOffer = async ({
  roomId,
  user,
  ws,
}: {
  roomId: string;
  user: USER;
  ws: WebSocket;
}) => {
  const offer = await p2p.getOffer();
  const OutGoingCall: MESSAGE = {
    type: "P2P",
    sendAt: new Date(),
    payload: {
      room: roomId,
      call: {
        roomType: "p2p",
        room: roomId,
        type: "outgoing",
        offer: offer!,
        from: user,
      },
    },
  };

  ws.send(JSON.stringify(OutGoingCall));
};
