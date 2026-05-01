import { AttendanceType } from "@prisma/client";
import prisma from "../../lib/prisma.orm";
import { getTotalHours } from "../../lib/total-hour";

export const createDay = async (date: Date) => {
  const workers = await prisma.workers.findMany();

  const splitDay = date.toString().split("T")[0];
  const cronToday = splitDay + "T18:45:00Z";

  const attendanceData = workers.map((worker) => ({
    workerId: worker.id,
    date: cronToday,
    login: "-",
    logout: "-",
  }));

  return await prisma.attendance.createMany({
    data: attendanceData,
  });
};

export const fetchDay = async (date: string) => {
  return await prisma.attendance.findMany({
    where: {
      date: new Date(date),
    },
    select: {
      id: true,
      workerId: true,
      login: true,
      logout: true,
      type: true,
      totalHours: true,
      overtimeHours: true,
      workers: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const loginWorkerAttendence = async (id: string, login: string) => {
  return await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      login: login,
      type: AttendanceType.PRESENT,
    },
  });
};

export const logoutWorkerAttendance = async (id: string, logout: string) => {
  const attendance = await prisma.attendance.findUnique({
    where: {
      id,
    },
  });

  let type;
  let overtimeHours;
  const totalHour = getTotalHours(attendance?.login!, logout);

  if (totalHour <= 8 && totalHour > 0) {
    type = AttendanceType.HALFDAY;
  } else if (totalHour == 0) {
    type = AttendanceType.ABSENT;
  } else if (totalHour > 11) {
    type = AttendanceType.OVERTIME;
    overtimeHours = totalHour - 10;
  }

  return await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      logout,
      totalHours: totalHour,
      type,
      overtimeHours,
    },
  });
};

export const changeAttendenceStatus = async (
  id: string,
  type: AttendanceType,
) => {
  const attendance = await prisma.attendance.findUnique({
    where: { id },
  });

  if (!attendance) throw new Error("Attendance not found");

  let newOTHours;

  if (type === "OVERTIME") {
    newOTHours = attendance.totalHours;
  } else {
    newOTHours = 0;
  }

  return await prisma.attendance.update({
    where: { id },
    data: {
      type,
      overtimeHours: newOTHours,
    },
  });
};
