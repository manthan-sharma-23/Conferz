import React, { useCallback, useState } from "react";
import { useRecoilValue } from "recoil";
import { WsAtom } from "../../../features/store/atoms/ws/ws.atom";
import { MESSAGE } from "../../../utils/types";
import { UserAtom } from "../../../features/store/atoms/user.atom";
import Loading from "../../ui/Loading";
import { useParams } from "react-router-dom";
import { ChatAtom } from "../../../features/store/atoms/ws/chat.atom";
import Message from "../../ui/room/Message";
import BroadCast from "../../ui/room/BroadCast";

const ChatPannel = () => {
  const [message, setMessage] = useState<string | null>(null);
  const user = useRecoilValue(UserAtom);
  const { roomId } = useParams();
  const ws = useRecoilValue(WsAtom);
  const chat = useRecoilValue(ChatAtom);

  const sendMessage = useCallback(() => {
    if (ws && message && ws.readyState === WebSocket.OPEN) {
      const msg: MESSAGE = {
        type: "MESSAGE",
        sendAt: new Date(),
        payload: {
          user: user.user,
          text: message,
          room: roomId!,
        },
      };
      ws.send(JSON.stringify(msg));

      setMessage(null);
    }
  }, [ws, user.user, message, roomId]);

  if (user.loading) {
    return <Loading />;
  }
  return (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center px-2 pt-2">
      <div className="h-[90%] w-full rounded-lg border-2 border-black/30 flex flex-col overflow-y-scroll p-0">
        {chat &&
          chat.map((text, index) => {
            if (text.type === "BROADCAST") {
              return <BroadCast key={index} broadcast={text.text} />;
            }
            return <Message key={index} text={text} userId={user.user.id!} />;
          })}
      </div>
      <div className="h-[10%] w-full flex justify-center items-center gap-2">
        <input
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          value={message || ""}
          placeholder="Enter your text"
          className="w-[80%] focus:outline-none border-2 h-[3rem] px-2 border-black/30 rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="border-2 w-[20%] h-[3rem] rounded-lg border-black/50 text-lg font-[550] hover:bg-black/70 hover:text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPannel;
