import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  RoomAtom,
  initialRoomState,
} from "../../features/store/atoms/room.atom";
import Loading from "../ui/Loading";
import { useGetRoom } from "../../features/hooks/useGetRoom";

const RoomLayout = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useRecoilState(RoomAtom);
  const { roomId } = useParams();
  useGetRoom({ roomId: roomId! });

  useEffect(() => {
    return () => {
      setRoom(initialRoomState);
    };
  }, [navigate]);

  if (room.isLoading) {
    return <Loading />;
  }
  return (
    <div className="h-full w-full ">
      <div className="h-[6vh] border-b-2 border-black w-full flex justify-between items-center px-5">
        <div />
        <div
          className="text-2xl font-sans font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Conferz
        </div>
        <div className="text-lg font-sans font-[550] flex h-full justify-between items-center gap-4 text-black/60">
          Room Code:
          <p className="underline cursor-pointer text-black">{roomId}</p>
        </div>
      </div>
      <div className="h-[94vh] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RoomLayout;
