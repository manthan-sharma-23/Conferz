import { useMemo } from "react";
import { SERVER_PORT } from "../config";

export const useSocket = (): WebSocket => {
  const socket = useMemo(
    () => new WebSocket(`ws://localhost:${SERVER_PORT}`),
    []
  );

  return socket;
};
