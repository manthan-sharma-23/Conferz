import React from "react";

const BroadCast = ({ broadcast }: { broadcast: string }) => {
  return (
    <div
      className={`mx-3 my-[3px] flex items-center justify-center h-auto `}
    >
      <span
        className={`bg-black/70 rounded-xl  h-full text-white w-auto text-lg px-5 py-[1px] gap-2 cursor-pointer flex justify-center`}
      >
        {broadcast}
      </span>
    </div>
  );
};

export default BroadCast;
