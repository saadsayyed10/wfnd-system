import { fetchAttendancePerWorker } from "@/api/attendance.api";
import { getToken } from "@clerk/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const WorkerAttendance = () => {
  const { workerId } = useParams();

  const startDate = "2026-05-11";
  const endDate = "2026-05-15";

  const [loading, setLoading] = useState(false);

  const [attendance, setAttendance] = useState([]);
  const [workerName, setWorkerName] = useState(null); // TODO: Finish this screen and go

  const handleFetchWorkerAttendance = async () => {
    setLoading(true);
    if (!startDate || !endDate) {
      alert("Please enter dates to fetch attendance info.");
      return;
    }
    try {
      const token = await getToken();
      const res = await fetchAttendancePerWorker(
        workerId!,
        startDate,
        endDate,
        token!,
      );
      setAttendance(res.data.attendance);
      setWorkerName(res.data.worker);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWorkerAttendance();
  }, []);

  return (
    <div>
      {loading ? "Loading..." : <div>{JSON.stringify(attendance)}</div>}
    </div>
  );
};

export default WorkerAttendance;
