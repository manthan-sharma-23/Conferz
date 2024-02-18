import { SERVER_URL } from "../../../utils/config";

export const joinRoom = async ({
  code,
}: {
  code: string;
}): Promise<boolean> => {
  try {
    const response = await fetch(SERVER_URL + "/api/room/join", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId: code,
      }),
    });

    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
};
