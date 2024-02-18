import { useRecoilValue } from "recoil";
import { RoomAtom } from "../features/store/atoms/room.atom";
import { useState } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import ChatPannel from "../components/sections/Room/ChatPannel";
import UserPannel from "../components/sections/Room/UserPannel";

const Room = () => {
  const [pannel, setPannel] = useState<boolean>(false);
  const [userPannel, setUserPannel] = useState<boolean>(false);
  const room = useRecoilValue(RoomAtom);

  return (
    <div className="h-full w-full flex justify-center items-center p-2 gap-2 relative ">
      <div
        className={`h-full w-${
          pannel ? "[75vw]" : "full"
        } border-2 relative transition-all`}
      ></div>
      <p
        onClick={() => setPannel((e) => !e)}
        className="absolute top-6 right-7 cursor-pointer bg-black/80 w-[2.3rem] h-[2.3rem] flex justify-center items-center rounded-full z-10 text-white"
      >
        {pannel ? <FaAnglesRight /> : <FaAnglesLeft />}
      </p>
      {pannel && (
        <div
          className={`h-full w-${
            pannel ? "[25vw]" : "0"
          } border-2 relative shadow-lg z-3 
           flex
        flex-col justify-start items-center transition-all`}
        >
          <div className="h-[8%] border-2 w-full flex justify-start items-center font-medium text-2xl px-3 gap-4">
            <p>{room.name}</p>
            <p
              className="text-3xl cursor-pointer "
              onClick={() => setUserPannel((e) => !e)}
            >
              {userPannel ? (
                <MdOutlineArrowDropUp />
              ) : (
                <MdOutlineArrowDropDown />
              )}
            </p>
          </div>
          <div className="h-[92%] border-2 w-full relative transition-all">
            {userPannel && (
              <div
                className={`transition-all h-${
                  userPannel ? "[70%]" : "0"
                } absolute z-40 w-full bg-white shadow-lg rounded-b-xl`}
              >
                <UserPannel/>
              </div>
            )}
            <div className="relative h-full w-full">
              <ChatPannel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room;
