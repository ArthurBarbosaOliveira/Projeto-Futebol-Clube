import { Request, Response } from 'express';
import service from '../services/matchesServicer';

const list = async (_req: Request, res: Response) => {
  let check = await service.list();
  if (_req.query.inProgress) {
    const { inProgress } = _req.query;
    check = await service.progress(inProgress === 'true');
  } else {
    check = await service.list();
  }
  return res.status(200)
    .json(check.message);
};

export default {
  list,
};
