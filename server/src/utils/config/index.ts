import { config } from "dotenv";

config();

export const SECRET_KEY = process.env.SECRET_KEY || "wer";
export const SERVER_PORT = process.env.PORT || 3200;

export const RATELIMIT = Number(process.env.RATE_LIMIT) || 10;
export const REDIS_PORT: number = Number(process.env.REDIS_SERVER_PORT!);

export const MESSAGE_CHANNEL = "MESSAGE";
