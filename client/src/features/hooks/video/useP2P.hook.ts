import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { WsAtom } from "../../store/atoms/ws/ws.atom";
import { MESSAGE } from "../../../utils/types";
import { useParams } from "react-router-dom";
import { UserAtom } from "../../store/atoms/user.atom";

export const useP2P = (): MediaStream | null => {
  const { roomId } = useParams();
  const user = useRecoilValue(UserAtom);
  const ws = useRecoilValue(WsAtom);
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    if (!user.loading && roomId && ws && ws.readyState === WebSocket.OPEN) {
      getStream({ setStream });
      ws.addEventListener("message", (msg) => {
        const message: MESSAGE = JSON.parse(msg.data);

        if (message.type === "P2P") {
          console.log(message);
        }
      });
    }
  }, []);

  return stream;
};

async function getStream({
  setStream,
}: {
  setStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  setStream(stream);
}
