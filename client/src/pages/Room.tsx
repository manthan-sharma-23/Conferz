import React from "react";
import { useParams } from "react-router-dom";

const Room = () => {
  const { roomId } = useParams();
  return <div>{roomId}</div>;
};

export default Room;
