import { Request, Response } from 'express';
import modelTeams from '../database/models/Teams';
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

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  await service.update(Number(id), req.body);
  return res.status(200)
    .json({ message: 'Updated' });
};

const create = async (req: Request, res: Response) => {
  const { user, ...match } = req.body;
  const checkHome = await modelTeams.findByPk(match.homeTeamId);
  const checkAway = await modelTeams.findByPk(match.awayTeamId);
  if (!checkHome || !checkAway) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  const { type, message } = await service.create(match);
  if (type) {
    return res.status(404)
      .json(message);
  }
  return res.status(201)
    .json(message);
};

const progress = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { message } = await service.corrigindo(Number(id));
  return res.status(200).json(message);
};

export default {
  list,
  create,
  progress,
  update,
};
