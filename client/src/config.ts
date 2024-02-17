export const SERVER_PORT = 3200;

export interface MessageType {
  type: "JOIN" | "INFO" | "MESSAGE";
  payload: {
    room?: string;
    text?: string;
  };
}

export interface User {
  name?: string;
  email?: string;
}
