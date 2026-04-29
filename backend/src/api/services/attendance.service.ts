import { AttendanceType } from "@prisma/client";
import prisma from "../../lib/prisma.orm";
import { getTotalHours } from "../../lib/total-hour";

export const createDay = async () => {
  const workers = await prisma.workers.findMany();

  const attendanceData = workers.map((worker) => ({
    workerId: worker.id,
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

  if (totalHour < 8 && totalHour > 1) {
    type = AttendanceType.HALFDAY;
  }

  if (totalHour == 0) {
    type = AttendanceType.ABSENT;
  }

  if (totalHour > 8) {
    type = AttendanceType.OVERTIME;
    overtimeHours = totalHour - 8;
  }

  return await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      logout,
      totalHours: Number(totalHour.toFixed(2)),
      type,
      overtimeHours,
    },
  });
};

export const changeAttendenceStatus = async (
  id: string,
  type: AttendanceType,
) => {
  return await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      type,
    },
  });
};
