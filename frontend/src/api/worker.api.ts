import axios from "axios";
import apiUrl from "./apiUrl";

export const addWorkerAPI = async (
  name: string,
  dailyPayment: number,
  token: string,
) => {
  return axios.post(
    `${apiUrl}/workers/add`,
    { name, dailyPayment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchWorkersAPI = async (token: string) => {
  return axios.get(`${apiUrl}/workers/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateWorkerAPI = async (
  id: string,
  name: string,
  dailyPayment: number,
  token: string,
) => {
  return axios.put(
    `${apiUrl}/workers/update/${id}`,
    { name, dailyPayment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteWorkerAPI = async (id: string, token: string) => {
  return axios.delete(`${apiUrl}/workers/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
