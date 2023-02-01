import { Request, Response } from 'express';
import service from '../services/matchesServicer';

const list = async (_req: Request, res: Response) => {
  const check = await service.list();
  return res.status(200)
    .json(check.message);
};

export default {
  list,
};
