import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../hooks/socket.hook";
import { useNavigate } from "react-router-dom";

interface EnterMeetDetails {
  name?: string;
  email?: string;
  room?: string;
}

const JoinRoom = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState<EnterMeetDetails>({});
  const socket = useSocket();

  const handleSubmitForm = useCallback(() => {
    if (socket.readyState === WebSocket.OPEN && formDetails.room) {
      const emit = {
        type: "JOIN",
        payload: {
          room: formDetails.room,
        },
      };
      socket.send(JSON.stringify(emit));
    }
  }, [socket, formDetails]);

  const handleJoinRoom = useCallback(
    (data: MessageEvent) => {
      const { room } = JSON.parse(data.data);
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.addEventListener("message", handleJoinRoom);

    return () => {
      socket.close();
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className="h-screen w-full border-2 flex justify-center items-center">
      <div className="h-[50vh] w-[30vw] border-2 border-black/50 rounded-lg flex flex-col justify-center items-center gap-3">
        <p className="w-[70%] flex justify-center items-center text-3xl font-sans font-black mb-12">
          Join a Room
        </p>
        <input
          className="w-[70%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          placeholder="Enter your Name"
          type="text"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          className="w-[70%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          placeholder="Enter you Email"
          type="email"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <div className="w-[70%] flex justify-between items-center">
          <input
            placeholder="Room Code"
            type="text"
            onChange={(e) =>
              setFormDetails((prev) => ({ ...prev, room: e.target.value }))
            }
            className="mr-2 w-[50%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          />
          <button
            onClick={handleSubmitForm}
            className=" text-lg font-sans font-semibold text-white hover:bg-white hover:text-black border-black  border-2 transition-all bg-black w-[50%] h-[2.4rem] rounded-lg focus:outline-none"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
