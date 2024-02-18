import React, { useCallback, useState } from "react";
import { ROOM_INPUT_TYPE } from "../../utils/types";
import { NavigateFunction } from "react-router-dom";
import { createRoom } from "../../features/functions/room/createRoom";

const CreateMeetings = ({ navigate }: { navigate: NavigateFunction }) => {
  const [roomDetails, setRoomDetails] = useState<ROOM_INPUT_TYPE>({
    name: null,
    type: "p2p",
  });

  const onCreate = useCallback(async () => {
    const room = await createRoom({ ...roomDetails });
    navigate("/room/" + room.id);
  }, [roomDetails, navigate]);
  return (
    <div className="h-full w-full flex flex-col gap-3">
      <p className="h-[20%] border-b-2 border-black/60 w-full justify-start items-center px-3 flex text-2xl font-[550]">
        Start new room
      </p>
      <input
        placeholder="Name your room"
        value={roomDetails.name || ""}
        onChange={(e) =>
          setRoomDetails((prev) => ({ ...prev, name: e.target.value }))
        }
        className="w-full h-[3rem] border-2 px-2 rounded-lg"
      />
      <div className="w-full h-[2.5rem] gap-2 flex">
        <select
          value={roomDetails.type}
          onChange={(e) =>
            setRoomDetails((prev) => ({
              ...prev,
              type: e.target.value as "sfu" | "p2p",
            }))
          }
          className="w-1/2 bg-black/25 rounded-md p-1"
        >
          <option value="p2p">P2P</option>
          <option value="sfu">SFU</option>
        </select>
        <button
          onClick={onCreate}
          className="w-1/2 border-2 border-black/60 font-[550] hover:bg-black/25 focus:outline-none rounded-md"
        >
          Create Room
        </button>
      </div>
    </div>
  );
};

export default CreateMeetings;
