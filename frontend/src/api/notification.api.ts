import axios from "axios";
import apiUrl from "./apiUrl";

export const fetchAllNotificatonsAPI = async (token: string) => {
  return await axios.get(`${apiUrl}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAllNotificatonsAPI = async (token: string) => {
  return await axios.delete(`${apiUrl}/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
