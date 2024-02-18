import PreviousMeetings from "../components/sections/PreviousMeetings";
import { useGetUserRooms } from "../features/hooks/useGetUserRooms.hook";
import Loading from "../components/ui/Loading";
import CreateMeetings from "../components/sections/CreateMeetings";
import JoinMeetings from "../components/sections/JoinMeetings";

const Home = () => {
  const { isLoading } = useGetUserRooms();

  return (
    <div className="h-full w-full p-8 flex  justify-center items-center gap-4 bg-black ">
      <div className="bg-white h-full w-[20%] border border-black/60 rounded-lg overflow-hidden flex flex-col justify-start items-center p-2 gap-5">
        <div className="h-1/2 w-full">
          <CreateMeetings />
        </div>
        <div className="h-1/2 w-full">
          <JoinMeetings />
        </div>
      </div>
      <div className="h-full bg-white w-[80%] border border-black/60 rounded-lg p-1">
        <h1 className="h-[10%] w-full flex border-b-2 border-black/60 justify-start items-center p-3 text-2xl font-sans font-[550]">
          Previous Meetings
        </h1>
        <div className="h-[90%] w-full flex">
          {isLoading ? <Loading /> : <PreviousMeetings />}
        </div>
      </div>
    </div>
  );
};

export default Home;
