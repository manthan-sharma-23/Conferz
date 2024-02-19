import { useEffect } from "react";
import { useP2P } from "../../../features/hooks/video/useP2P.hook";
import ReactPlayer from "react-player";

const P2P = () => {
  const stream = useP2P();

  useEffect(() => {}, []);
  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[90%] w-full flex justify-center items-center gap-3 px-3">
        <div className="h-[65%] w-1/2  ">
          {stream && (
            <ReactPlayer
              playing
              muted
              url={stream}
              height={"100%"}
              width={"100%"}
              className="relative z-40"
            />
          )}
        </div>
        <div className="h-[65%] w-1/2 "></div>
      </div>
      <div className="h-[10%] w-full border-2"></div>
    </div>
  );
};

export default P2P;
