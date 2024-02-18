//user controllers
export type INPUT_LOGIN_FORM = {
  name?: string;
  email?: string;
  password?: string;
};

export type OUTPUT_LOGIN_FORM = {
  message?: string;
  token: string;
};

export type USER = {
  name?: string | null;
  email: string | null;
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
  type: "JOIN" | "MESSAGE" | "INFO";
  payload: {
    roomId?: string;
    message?: TEXT;
  };
};

export type TEXT = {
  sendAt: Date;
  userId: string;
  text: string;
};
