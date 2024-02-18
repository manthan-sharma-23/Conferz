import { SERVER_URL } from "../../../utils/config";
import { ROOM } from "../../../utils/types";

export const createRoom = async ({
  name,
  type,
}: {
  name: string | null;
  type: "sfu" | "p2p";
}): Promise<ROOM> => {
  try {
    const response = await fetch(SERVER_URL + "/api/room/create", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name || null,
        type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create room");
    }

    const data: ROOM = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};
