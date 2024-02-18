import { useCallback, useState } from "react";
import { joinRoom } from "../../features/functions/room/joinRoom";

const JoinMeetings = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);

  const onJoin = useCallback(async () => {
    if (roomCode) {
      const isjoin = await joinRoom({ code: roomCode });
      if (isjoin) {
        window.location.assign("/room/" + roomCode);
      } else {
        alert("Please Enter a valid code");
      }
    }
  }, [roomCode]);

  return (
    <div className="h-full w-full flex flex-col gap-3">
      <p className="h-[20%] border-b-2 border-black/60 w-full justify-start items-center px-3 flex text-2xl font-[550]">
        Join a room
      </p>
      <input
        placeholder="Enter Room Code"
        value={roomCode || ""}
        onChange={(e) => setRoomCode(e.target.value)}
        className="w-full h-[3rem] border-2 px-2 rounded-lg"
      />
      <div className="w-full h-[2.5rem] gap-2 flex">
        <button
          onClick={onJoin}
          className="w-full border-2 border-black/60 font-[550] hover:bg-black/25 focus:outline-none rounded-md"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinMeetings;
