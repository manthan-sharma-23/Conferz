import { useParams } from "react-router-dom";
import { useSocket } from "../hooks/socket.hook";
import { useEffect } from "react";
import { MessageType } from "../config";

const Room = () => {
  const { room } = useParams();
  const socket = useSocket();

  useEffect(() => {
    socket.addEventListener("message", (msg) => {
      const message: MessageType = JSON.parse(msg.data);

      if (message.type === "MESSAGE") {
        console.log(message);
      }
    });
  }, [socket]);

  return (
    <div className="h-screen w-screen text-3xl font-bold font-sans flex justify-center items-center">
      {room}
    </div>
  );
};
export default Room;
