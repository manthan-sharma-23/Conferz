import { useState } from "react";
import { INPUT_LOGIN_FORM } from "../../utils/types";
import { registerForm } from "../../features/functions/auth/register";

const Signup = () => {
  const [formDetails, setFormDetails] = useState<INPUT_LOGIN_FORM>({
    name: null,
    email: "",
    password: "",
  });

  return (
    <div className="w-full h-[55vh] flex flex-col justify-center items-center font-sans ">
      <p className="text-4xl text-white font-extrabold">Orbit</p>
      <p className="text-xl text-white/70">
        Already a user{" "}
        <a href="/auth/signin" className="text-white underline">
          login
        </a>{" "}
        ?
      </p>
      <div className="h-[70%] w-full  flex flex-col justify-center gap-5 items-center">
        <input
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
          placeholder="Enter your name (optional)"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
          placeholder="Enter your email"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          type="password"
          placeholder="Enter your password (minimum 5 characters)"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, password: e.target.value }))
          }
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
        />
        <button
          onClick={() => {
            if (formDetails.email && formDetails.password)
              registerForm(formDetails);
          }}
          className="font-sans border-white border-2 w-[8vw] h-12 flex justify-center items-center bg-black text-white font-extrabold rounded-xl"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
