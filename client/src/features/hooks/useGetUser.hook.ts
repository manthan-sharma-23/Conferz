import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";
import { SERVER_URL } from "../../utils/config";
import { USER } from "../../utils/types";

export const useGetUser = () => {
  const [user, setUser] = useRecoilState(UserAtom);
  const [isLogged, setLogged] = useState(false);

  React.useEffect(() => {
    setUser({ ...user, loading: true });

    fetch(SERVER_URL + "/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data: USER) => {
        if (data.id !== null && data.id !== undefined) {
          setLogged(true);
          setUser({ user: { ...data }, loading: false });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return { user, isLogged };
};
