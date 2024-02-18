import React from "react";
import { useRecoilState } from "recoil";
import { UserAtom } from "../store/atoms/user.atom";
import { SERVER_URL } from "../../utils/config";
import { USER } from "../../utils/types";

export const useGetUser = () => {
  const [user, setUser] = useRecoilState(UserAtom);

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
        console.log(data)
        if (data) setUser({ user: data, loading: false });
      })
      .catch((err) => console.log(err));
  }, []);

  return user;
};
