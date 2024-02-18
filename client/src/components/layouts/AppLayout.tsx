import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { useRecoilValue } from "recoil";
import { UserAtom } from "../../features/store/atoms/user.atom";
import Loading from "../ui/Loading";

const AppLayout = () => {
  const { loading } = useRecoilValue(UserAtom);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="h-screen w-screen">
      <Navbar />
      <div className="h-[91vh] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
