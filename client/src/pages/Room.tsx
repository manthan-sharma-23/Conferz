import { useParams, useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/socket.hook";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";

const Room = () => {
  const navigate = useNavigate();
  const { room } = useParams();
  const socket = useSocket();
  const user = useRecoilValue(UserAtom);

  useEffect(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ text: "in room" }));
    }
    if (user.email === null) {
      navigate("/join");
      alert("Please provide credentials");
    }
  }, [socket, navigate, user]);

  console.log(user);

  return (
    <div className="h-screen w-screen text-3xl font-bold font-sans flex justify-center items-center">
      {room}
    </div>
  );
};
export default Room;
