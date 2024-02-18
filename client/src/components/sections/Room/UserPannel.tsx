import React from "react";
import { useRecoilValue } from "recoil";
import { UsersInRoomSelector } from "../../../features/store/selectors/room.users.selector";

const UserPannel = () => {
  const users = useRecoilValue(UsersInRoomSelector);

  return (
    <div className="h-full w-full flex flex-col gap-3 justify-start items-center p-2 overflow-y-scroll overflow-x-hidden">
      {users &&
        users.map((user) => (
          <UserCard
            name={user.user.name || ""}
            type={user.userType}
            email={user.user.email!}
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
        <p className="font-bold flex justify-center items-center gap-2 text-black/55">
          Role: <p className="text-black">{type}</p>
        </p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default UserPannel;
