import axios from "axios";
import apiUrl from "./apiUrl";

export const fetchPayslipAPI = async (weekStart: string, weekEnd: string) => {
  return axios.get(`${apiUrl}/payslips`, {
    params: {
      weekStart,
      weekEnd,
    },
  });
};
