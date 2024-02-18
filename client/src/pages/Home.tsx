import { useCallback, useState } from "react";
import { ROOM_INPUT_TYPE } from "../utils/types";
import PreviousMeetings from "../components/sections/PreviousMeetings";
import { useGetUserRooms } from "../features/hooks/useGetUserRooms.hook";
import Loading from "../components/ui/Loading";
import { createRoom } from "../features/functions/createRoom";

const Home = () => {
  const { isLoading } = useGetUserRooms();
  const [roomDetails, setRoomDetails] = useState<ROOM_INPUT_TYPE>({
    name: null,
    type: "p2p",
  });

  const onCreate = useCallback(() => {
    createRoom({ ...roomDetails });
    setRoomDetails({
      ...roomDetails,
      name: null,
    });

  }, [roomDetails]);

  return (
    <div className="h-full w-full p-8 flex  justify-center items-center gap-4 bg-black">
      <div className="bg-white h-full w-[20%] border border-black/60 rounded-lg overflow-hidden flex flex-col justify-start items-center p-2 gap-5">
        <p className="h-[10%] border-b-2 border-black/60 w-full justify-start items-center px-3 flex text-2xl font-[550]">
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
      <div className="h-full bg-white w-[80%] border border-black/60 rounded-lg p-1">
        <h1 className="h-[10%] w-full flex border-b-2 border-black/60 justify-start items-center p-3 text-2xl font-sans font-[550]">
          Previous Meetings
        </h1>
        <div className="h-[90%] w-full flex">
          {isLoading ? <Loading /> : <PreviousMeetings />}
        </div>
      </div>
    </div>
  );
};

export default Home;
