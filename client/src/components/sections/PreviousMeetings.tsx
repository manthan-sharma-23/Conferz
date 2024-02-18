import { useRecoilValue } from "recoil";
import { UserRoomsSelector } from "../../features/store/selectors/user.rooms.selector";
import MeetingCard from "../ui/MeetingCard";
import { NavigateFunction } from "react-router-dom";

const PreviousMeetings = ({ navigate }: { navigate: NavigateFunction }) => {
  const rooms = useRecoilValue(UserRoomsSelector);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center px-2 font-mono">
      <div className="h-[50%] w-full flex  flex-col justify-center items-start border-b-2 border-black/50">
        <p className="h-[20%] w-[40%] font-[500] flex justify-start items-center text-xl border-b border-black/50">
          Meetings Hosted{" "}
        </p>
        <div className="w-full h-[80%] py-4 flex justify-start items-center gap-3">
          {rooms.rooms &&
            rooms.rooms.map((room, index) => {
              if (room.userType === "host")
                return (
                  <MeetingCard
                    navigate={navigate}
                    key={index}
                    roomId={room.room.id}
                    name={room.room.name!}
                    type={room.room.type!}
                    date={room.room.createdAt}
                  />
                );
            })}
        </div>
      </div>
      <div className="h-[50%] w-full flex  flex-col justify-center items-start border-b-2 border-black/50">
        <p className="h-[20%] w-[40%] flex font-[500] justify-start items-center text-xl border-b border-black/50">
          Meetings Joined{" "}
        </p>
        <div className="w-full h-[80%] py-4 flex justify-start items-center gap-3">
          {rooms.rooms &&
            rooms.rooms.map((room, index) => {
              if (room.userType === "member")
                return (
                  <MeetingCard
                    navigate={navigate}
                    key={index}
                    roomId={room.room.id}
                    name={room.room.name!}
                    type={room.room.type!}
                    date={room.room.createdAt}
                  />
                );
            })}
        </div>
      </div>
    </div>
  );
};

export default PreviousMeetings;
