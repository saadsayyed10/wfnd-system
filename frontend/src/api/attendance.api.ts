import axios from "axios";
import apiUrl from "./apiUrl";

export const fetchCurrentDayAPI = async (date: string, token: string) => {
  return await axios.get(`${apiUrl}/attendance/day/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loginWorkerAPI = async (
  id: string,
  login: string,
  token: string,
) => {
  return await axios.put(
    `${apiUrl}/attendance/login/${id}`,
    { login },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
