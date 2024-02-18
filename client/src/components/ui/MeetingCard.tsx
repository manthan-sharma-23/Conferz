import moment from "moment";

const MeetingCard = ({
  name,
  type,
  date,
  roomId,
}: {
  name: string;
  type: "p2p" | "sfu";
  date: Date;
  roomId: string;
}) => {
  const formattedTime = moment(date).format("lll");

  const onClick = () => {
    window.location.assign("/room/" + roomId);
  };
  return (
    <div
      onClick={onClick}
      className="h-full w-[12%] border-2 font-mono rounded-lg bg-black/80 p-3 text-white hover:scale-[1.02] duration-50 transition-all cursor-pointer"
    >
      <p className="h-[40%] w-full text-2xl flex justify-start items-center ">
        {name}
      </p>
      <p className="h-[30%] w-full flex justify-start items-center ">
        Type: {type === "p2p" ? "P2P" : "SFU"}
      </p>
      <p className="h-[30%] w-full flex justify-start items-center ">
        {formattedTime}
      </p>
    </div>
  );
};

export default MeetingCard;
