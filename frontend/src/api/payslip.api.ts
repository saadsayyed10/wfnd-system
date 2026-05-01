import axios from "axios";
import apiUrl from "./apiUrl";

export const fetchPayslipAPI = async (weekStart: string, weekEnd: string) => {
  return await axios.get(`${apiUrl}/payslips`, {
    params: {
      weekStart,
      weekEnd,
    },
  });
};

export const deletePayslipAPI = async () => {
  return await axios.delete(`${apiUrl}/payslips/wipe`);
};
