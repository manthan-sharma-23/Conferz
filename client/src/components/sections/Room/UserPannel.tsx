import { useRecoilValue } from "recoil";
import { RoomAtom } from "../../../features/store/atoms/room.atom";

const UserPannel = () => {
  const room = useRecoilValue(RoomAtom);

  return (
    <div className="h-full w-full flex flex-col gap-3 justify-start items-center p-2 overflow-y-scroll overflow-x-hidden">
      {room.users &&
        room.users.map((user) => (
          <UserCard
            key={user.id}
            name={user.name || ""}
            type={room.createdBy === user.id ? "host" : "member"}
            email={user.email!}
          />
        ))}
    </div>
  );
};

const UserCard = ({
  name,
  type,
  email,
}: {
  name: string;
  email: string;
  type: string;
}) => {
  return (
    <div className="bg-black/10 w-full h-[6rem] fflex justify-center items-center flex-col p-2 rounded-lg">
      <p className="w-full h-[60%] flex justify-start items-center text-xl font-medium ">
        {name}
      </p>
      <div className="w-full h-[40%] flex justify-between items-center px-1">
        <div className="font-bold flex justify-center items-center gap-2 text-black/55">
          Role: <p className="text-black">{type}</p>
        </div>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserPannel;
