import { Request, Response } from "express";
import {
  addWorker,
  deleteWorker,
  fetchAllWorkers,
  updateWorker,
} from "../services/worker.service";
import { getAuth } from "@clerk/express";

export const addWorkerController = async (req: Request, res: Response) => {
  const { name, dailyPayment } = req.body;

  const data = { name, dailyPayment };
  if (!data) {
    console.log("Please enter name as well as daily payment");
    return res
      .status(404)
      .json({ error: "Please enter name as well as daily payment" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log("Unauthorized: No logged in user found");
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }
    const worker = await addWorker(name, dailyPayment);
    res
      .status(201)
      .json({ message: `New worker added - ${worker.name}`, worker });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const fetchAllWorkersController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log("Unauthorized: No logged in user found");
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }
    const worker = await fetchAllWorkers();
    res.status(200).json({ worker });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

export const updateWorkerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    console.log("Worker ID is not found in params");
    return res.status(404).json({ error: "Worker ID is not found in params" });
  }

  const { name, dailyPayment } = req.body;

  const data = { name, dailyPayment };
  if (!data) {
    console.log("Please enter name as well as daily payment");
    return res
      .status(404)
      .json({ error: "Please enter name as well as daily payment" });
  }

  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log("Unauthorized: No logged in user found");
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }
    const worker = await updateWorker(id.toString(), name, dailyPayment);
    res
      .status(200)
      .json({ message: `New worker added - ${worker.name}`, worker });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteWorkerController = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    console.log("Worker ID not found in params");
    return res.status(404).json({ error: "Worker ID not found in params" });
  }
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      console.log("Unauthorized: No logged in user found");
      return res
        .status(401)
        .json({ error: "Unauthorized: No logged in user found" });
    }
    await deleteWorker(id.toString());
    res.status(204).json({ message: "Worker deleted" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};
