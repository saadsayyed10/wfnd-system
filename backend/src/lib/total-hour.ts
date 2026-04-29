import { parseTime } from "./parse-time";

export function getTotalHours(login: string, logout: string): number {
  const loginDate = parseTime(login);
  const logoutDate = parseTime(logout);

  let diffMs = logoutDate.getTime() - loginDate.getTime();

  // handle overnight (optional)
  if (diffMs < 0) {
    diffMs += 24 * 60 * 60 * 1000;
  }

  return diffMs / (1000 * 60 * 60); // convert ms → hours
}
