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

export const fetchProfileAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
