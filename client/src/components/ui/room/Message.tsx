import { TEXT } from "../../../utils/types";
import moment from "moment";

const Message = ({ text, userId }: { userId: string; text: TEXT }) => {
  const formattedTime = moment(text.sendAt).format("h:mma");
  return (
    <div
      className={`mx-3 my-[3px] flex items-center justify-${
        text.userId === userId ? "end" : "start"
      } h-auto`}
    >
      <span
        className={`${
          text.userId === userId ? "bg-black" : "bg-black/70"
        } h-full text-white w-auto text-xl px-3 py-[1px] gap-2 rounded-lg cursor-pointer flex justify-between`}
      >
        <p className="h-auto w-auto py-2 ">{text.text}</p>
        <p className="text-[11px] h-auto  w-[3.5rem] font-extralight font-mono text-white/60 flex justify-end items-end  align-bottom">
          {formattedTime}
        </p>
      </span>
    </div>
  );
};

export default Message;
