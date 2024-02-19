//user controllers
export type INPUT_LOGIN_FORM = {
  name?: string | null;
  email: string;
  password: string;
};

export type OUTPUT_LOGIN_FORM = {
  message?: string;
  token: string;
};

export type USER = {
  name: string | null;
  email: string | null;
  id: string | null;
};

export const ROOM_TYPE = {
  sfu: "sfu",
  p2p: "p2p",
};

export const MESSAGE_TYPE = {
  info: "INFO",
  message: "MESSAGE",
  join: "JOIN",
};

export type ROOM = {
  id: string;
  name?: string;
  type?: "p2p" | "sfu";
  createdAt: Date;
};

export type MESSAGE = {
  type: "JOIN" | "INFO" | "MESSAGE" | "BROADCAST" | "RENDER" | "LEAVE" | "P2P";
  payload: {
    room?: string;
    user?: USER;
    users?: USER[];
    text?: string;
    call?: CALL;
  };
  sendAt: Date;
};

export type CALL = {
  from: USER;
  roomType: "p2p" | "sfu";
  room: string;
  type: "incomming" | "outgoing" | "answer";
  offer: RTCSessionDescriptionInit;
};

export type TEXT = {
  sendAt: Date;
  userId?: string;
  text: string;
  type: "BROADCAST" | "MESSAGE";
};

export type ROOM_INPUT_TYPE = {
  type: "sfu" | "p2p";
  name: string | null;
};

export interface USER_ROOM_TYPE {
  userType: "host" | "member";
  room: ROOM;
}

export interface RoomUser {
  userType: "member" | "host";
  user: USER;
}

export interface RoomDetails {
  name: string | null;
  createdAt: Date | null;
  createdBy: string | null;
  users: USER[];
  type: "p2p" | "sfu";
}
