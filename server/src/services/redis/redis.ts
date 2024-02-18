// import Redis from "ioredis";
// import { MESSAGE } from "../../utils/types";
// import { MESSAGE_CHANNEL } from "../../utils/config";
// export default class RedisClient {
//   private _redis: Redis;

//   constructor(port: number) {
//     this._redis = new Redis({ port });
//   }

//   private _publish(channel: string, message: any): void {
//     this._redis.publish(channel, JSON.stringify(message));
//   }

//   private _subscribe(channel: string): void {
//     this._redis.subscribe(channel);
//   }

//   private _listenMessageEvent(callback: (message: string) => void): void {
//     this._redis.on("message", (channel: string, message: string) => {
//       const msg: MESSAGE = JSON.parse(message);
//       if (channel === MESSAGE_CHANNEL) callback(message);
//     });
//   }

//   get client() {
//     return this._redis;
//   }
//   get publish() {
//     return this._publish;
//   }

//   get listenMessageEvent() {
//     return this._listenMessageEvent;
//   }

//   get subscribe() {
//     return this._subscribe;
//   }
// }
