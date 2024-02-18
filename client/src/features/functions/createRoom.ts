import { SERVER_URL } from "../../utils/config";

export const createRoom = ({
  name,
  type,
}: {
  name: string | null;
  type: "sfu" | "p2p";
}) => {

  fetch(SERVER_URL + "/api/room/create", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type":"application/json"
    },
    body: JSON.stringify({
      name: name || null,
      type,
    }),
  })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
