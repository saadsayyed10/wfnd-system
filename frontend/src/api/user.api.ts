import axios from "axios";
import apiUrl from "./apiUrl";

export const syncUserToDBAPI = async (
  clerkId: string,
  name: string,
  email: string,
  profilePicture: string,
) => {
  return await axios.post(`${apiUrl}/users/sync`, {
    clerkId,
    name,
    email,
    profilePicture,
  });
};
