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
    `${apiUrl}/attendance/day/login/${id}`,
    { login },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const logoutWorkerAPI = async (
  id: string,
  logout: string,
  token: string,
) => {
  return await axios.put(
    `${apiUrl}/attendance/day/logout/${id}`,
    { logout },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const changeAttendanceStatusAPI = async (
  id: string,
  type: string,
  token: string,
) => {
  return await axios.put(
    `${apiUrl}/attendance/change-status/${id}`,
    { type },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
