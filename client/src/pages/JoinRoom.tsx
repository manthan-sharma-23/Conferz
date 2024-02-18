import { useState } from "react";
import { User } from "../config";

interface EnterMeetDetails {
  user: User;
  room: string | null;
}

const JoinRoom = () => {
  const [formDetails, setFormDetails] = useState<EnterMeetDetails>({
    user: {
      name: null,
      email: null,
    },
    room: null,
  });

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
          value={formDetails.user.name || ""}
          onChange={(e) =>
            setFormDetails((prev) => ({
              ...prev,
              user: { ...prev.user, name: e.target.value },
            }))
          }
        />
        <input
          className="w-[70%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          placeholder="Enter you Email"
          type="email"
          value={formDetails.user.email || ""}
          onChange={(e) =>
            setFormDetails((prev) => ({
              ...prev,
              user: { ...prev.user, email: e.target.value },
            }))
          }
        />
        <div className="w-[70%] flex justify-between items-center">
          <input
            placeholder="Room Code"
            type="text"
            value={formDetails.room || ""}
            onChange={(e) =>
              setFormDetails((prev) => ({ ...prev, room: e.target.value }))
            }
            className="mr-2 w-[50%] h-[2.4rem] rounded-lg border-[2px] border-black/30  px-2 focus:outline-none"
          />
          <button
            onClick={() => {}}
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
