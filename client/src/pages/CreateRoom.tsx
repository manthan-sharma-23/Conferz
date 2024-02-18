import { useCallback, useState } from "react";
import { useSocket } from "../hooks/socket.hook";
import { useNavigate } from "react-router-dom";

interface EnterMeetDetails {
  name?: string;
  email?: string;
  roomType?: string;
}

const CreateRoom = () => {
  const [formDetails, setFormDetails] = useState<EnterMeetDetails>({
    name: "",
    email: "",
    roomType: "p2p",
  });
  const navigate = useNavigate();
  const socket = useSocket();

  const onRoomSubmit = useCallback(() => {}, [formDetails]);

  return (
    <div className="h-screen w-full border-2 flex justify-center items-center">
      <form
        onSubmit={onRoomSubmit}
        className="h-[50vh] w-[30vw] border-2 border-black/50 rounded-lg flex flex-col justify-center items-center gap-3"
      >
        <p className="w-[70%] flex justify-center items-center text-3xl font-sans font-black mb-12">
          Create a Room
        </p>
        <input
          value={formDetails.name}
          className="w-[70%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          placeholder="Enter your Name"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          value={formDetails.email}
          className="w-[70%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          placeholder="Enter you Email"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <div className="w-[70%] flex justify-between items-center gap-2 ">
          <select
            name="meet"
            value={formDetails.roomType}
            className="w-[50%] h-[2.4rem] border-2 border-black/30 bg-transparent rounded-lg px-2"
            onChange={(e) =>
              setFormDetails((prev) => ({ ...prev, roomType: e.target.value }))
            }
          >
            <option value="p2p">P2P</option>
            <option value="sfu">SFU</option>
          </select>
          <button
            type="submit"
            className=" text-lg font-sans font-semibold text-white hover:bg-white hover:text-black border-black  border-2 transition-all bg-black w-[50%] h-[2.4rem] rounded-lg focus:outline-none"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
