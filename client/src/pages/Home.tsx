const Home = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className=" w-[30vw] h-[50vh] flex flex-col gap-6 text-4xl font-sans font-bold justify-center items-center">
        <p>Hey Dev !</p>
        <div className="w-[100%] text-2xl flex gap-5">
          <button
            className="w-[45%] h-[3rem] bg-black rounded-lg text-white"
            onClick={() => window.location.assign("/create")}
          >
            Start a Meeting
          </button>
          <button
            className="w-[45%] h-[3rem] bg-black rounded-lg text-white"
            onClick={() => window.location.assign("/join")}
          >
            Join a Meeting
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
