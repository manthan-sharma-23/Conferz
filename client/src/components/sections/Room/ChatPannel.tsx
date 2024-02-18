import React from "react";

const ChatPannel = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col justify-center items-center px-2 pt-2">
      <div className="h-[90%] w-full rounded-lg border-2 border-black/30"></div>
      <div className="h-[10%] w-full flex justify-center items-center gap-2">
        <input
          placeholder="Enter your text"
          className="w-[80%] focus:outline-none border-2 h-[3rem] px-2 border-black/30 rounded-lg"
        />
        <button className="border-2 w-[20%] h-[3rem] rounded-lg border-black/50 text-lg font-[550] hover:bg-black/70 hover:text-white">Send</button>
      </div>
    </div>
  );
};

export default ChatPannel;
