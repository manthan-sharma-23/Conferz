import { SERVER_URL } from "../../../utils/config";
import { INPUT_LOGIN_FORM, OUTPUT_LOGIN_FORM } from "../../../utils/types";

export const loginForm = (form: Partial<INPUT_LOGIN_FORM>) => {
  fetch(SERVER_URL + "/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
    .then((res) => res.json())
    .then((data: OUTPUT_LOGIN_FORM) => {
      window.localStorage.setItem("token", data.token);
      console.log(data);
      window.location.assign("/");
    })
    .catch((err) => {
      console.log(err);
    });
};
