import { Request, Response } from 'express';
import service from '../services/leaderService';

const listHome = async (_req: Request, _res: Response) => {
  const check = await service.list('"home"');
  return _res.status(200)
    .json(check.message);
};

const listAway = async (_req: Request, _res: Response) => {
  const check = await service.list('"away"');
  return _res.status(200)
    .json(check.message);
};

const list = async (_req: Request, _res: Response) => {
  const check = await service.list('"home", "away"');
  return _res.status(200)
    .json(check.message);
};

export default {
  list,
  listHome,
  listAway,
};
