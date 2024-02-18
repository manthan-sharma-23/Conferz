import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../features/store/atoms/user.atom";

const Navbar = () => {
  const user = useRecoilValue(UserAtom);
  return (
    <nav className="border-b-2 border-black/70 w-full h-[9vh] shadow-md">
      <div className="h-full w-full flex justify-between items-center px-12 ">
        <p className="w-[4rem] h-[80%] text-3xl font-sans font-extrabold flex justify-start items-center">
          Conferz
        </p>
        <div className="h-full w-auto flex items-center gap-2">
          <p className="text-xl font-sans font-medium  mx-3">
            Hey, {user.user.name?.split(" ")[0]}
          </p>
          <div className="cursor-pointer text-2xl text-black/50 rounded-lg  w-[3rem] font-semibold h-[3rem] flex justify-center items-center  border-2 border-black/50">
            <FaPlus />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
