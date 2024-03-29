import { useState } from "react";
import { type INPUT_LOGIN_FORM } from "../../utils/types";
import { loginForm } from "../../features/functions/auth/login";

const Signin = () => {
  const [formDetails, setFormDetails] = useState<Partial<INPUT_LOGIN_FORM>>({
    name: null,
  });
  return (
    <div className="w-full h-[55vh] flex flex-col justify-center items-center font-sans ">
      <p className="text-4xl text-white font-extrabold">Conferz</p>
      <p className="text-xl text-white/70">
        Not a user want to{" "}
        <a href="/auth/signup" className="text-white underline">
          register
        </a>{" "}
        ?
      </p>
      <div className="h-[70%] w-full  flex flex-col justify-center gap-5 items-center">
        <input
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
          placeholder="Enter your email"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          placeholder="Enter your password"
          type="password"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
        />
        <button
          onClick={() => {
            if (formDetails.email && formDetails.password )
              loginForm(formDetails);
          }}
          className=" font-sans border-white border-2 w-[8vw] h-12 flex justify-center items-center bg-black text-white font-extrabold rounded-xl"
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
