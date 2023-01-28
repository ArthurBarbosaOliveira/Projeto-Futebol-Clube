import { Request, Response } from 'express';
import teamsServicer from '../services/teamsServicer';

const teamsAll = async (req: Request, res: Response) => {
  const { type, message } = await teamsServicer.teamsAll();
  if (type) return res.status(404).json({ message });
  res.status(200).json(message);
};

const teamsId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { type, message } = await teamsServicer.teamsId(Number(id));
  if (type) return res.send({ message });
  return res.status(200)
    .json(message);
};

export default {
  teamsAll,
  teamsId,
};
