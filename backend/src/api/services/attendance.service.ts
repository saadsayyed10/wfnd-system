import { AttendanceType } from "@prisma/client";
import prisma from "../../lib/prisma.orm";
import { getTotalHours } from "../../lib/total-hour";
import { triggerNotification } from "../../lib/trigger-notification";

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
      workers: {
        name: "asc",
      },
    },
  });
};

export const loginWorkerAttendence = async (id: string, login: string) => {
  const attendance = await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      login: login,
      type: AttendanceType.PRESENT,
      logout: "-",
      overtimeHours: 0,
      totalHours: 0,
    },
    select: {
      workers: {
        select: {
          name: true,
        },
      },
    },
  });

  await triggerNotification(
    "Attendance",
    `Worker ${attendance.workers?.name} was logged-in at ${login}`,
  );

  return attendance;
};

export const logoutWorkerAttendance = async (id: string, logout: string) => {
  const attendance = await prisma.attendance.findUnique({
    where: {
      id,
    },
  });

  let type;
  let totalHour = getTotalHours(attendance?.login!, logout);

  const parseTime = (timeStr: string, addDay = false): Date => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    if (addDay) date.setDate(date.getDate() + 1);
    return date;
  };

  const overtimeThreshold = parseTime("8:00 PM");

  const logoutModifier = logout.split(" ")[1]; // 'AM' or 'PM'
  const isMidnightCrossover = logoutModifier === "AM" && totalHour > 12;
  const logoutTime = parseTime(logout, isMidnightCrossover);

  const overtimeHours =
    logoutTime > overtimeThreshold
      ? (logoutTime.getTime() - overtimeThreshold.getTime()) / (1000 * 60 * 60)
      : 0;

  if (totalHour <= 6 && totalHour > 0) {
    type = AttendanceType.HALFDAY;
  } else if (totalHour == 0) {
    type = AttendanceType.ABSENT;
    totalHour = 0;
  } else if (overtimeHours > 0) {
    type = AttendanceType.OVERTIME;
  }

  const logoutAttendance = await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      logout,
      totalHours: totalHour,
      type,
      overtimeHours,
    },
    select: {
      workers: {
        select: {
          name: true,
        },
      },
    },
  });

  await triggerNotification(
    "Attendance",
    `Worker ${logoutAttendance.workers?.name} was logged-out at ${logout}`,
  );
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

export const resetAttendance = async (id: string) => {
  const attendance = await prisma.attendance.update({
    where: {
      id,
    },
    data: {
      login: "-",
      logout: "-",
      totalHours: 0,
      overtimeHours: 0,
    },
    select: {
      workers: {
        select: {
          name: true,
        },
      },
    },
  });

  await triggerNotification(
    "Attendance",
    `Attendance reset for worker ${attendance.workers?.name}`,
  );

  return attendance;
};

export const fetchAttendancePerWorker = async (
  workerId: string,
  startDate: string,
  endDate: string,
) => {
  const timeZone = "T18:45:00.000Z";

  const worker = await prisma.workers.findUnique({
    where: {
      id: workerId,
    },
    select: {
      name: true,
      daily_payment: true,
    },
  });

  const attendance = await prisma.attendance.findMany({
    where: {
      workerId,
      date: {
        gte: `${startDate}${timeZone}`,
        lte: `${endDate}${timeZone}`,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return { worker, attendance };
};
