import { z } from "zod";

//user controllers
export const INPUT_LOGIN_FORM = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export type INPUT_LOGIN_FORM = z.infer<typeof INPUT_LOGIN_FORM>;

export type OUTPUT_LOGIN_FORM = {
  message?: string;
  token: string;
};

export type USER = {
  name?: string | null;
  email: string;
  id?: string | null;
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
  users?: USER[];
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
  userId: string;
  text: string;
};
