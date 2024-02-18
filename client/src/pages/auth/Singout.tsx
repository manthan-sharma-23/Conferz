const Signout = () => {
  const signout = () => {
    localStorage.removeItem("token");
    window.location.assign("/auth/signin");
  };
  return (
    <div className="h-[30vh] w-full  flex justify-center items-center flex-col font-sans">
      <div className="w-full h-1/2 text-4xl text-white  font-medium flex justify-center items-end">
        Surely want to Logout ?
      </div>
      <div className="w-full h-1/2 flex items-center justify-evenly">
        <button
          onClick={() => {
            window.location.assign("/");
          }}
          className="hover:bg-black transition-all hover:border-white hover:text-white w-[12vw] h-[6vh] text-xl p-2 bg-white rounded-xl text-black font-black border-2 border-black"
        >
          Continue to Home
        </button>
        <button
          onClick={() => signout()}
          className="w-[12vw] h-[6vh] bg-black rounded-xl font-black text-white text-xl border-2 border-white hover:bg-white hover:text-black hover:border-black"
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Signout;
