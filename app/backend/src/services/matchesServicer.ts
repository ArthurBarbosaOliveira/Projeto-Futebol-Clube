import { IResponse } from '../interface/index';
import model from '../database/models/Matches';
import modelTeams from '../database/models/Teams';

const list = async (): Promise<IResponse> => {
  const check = await model.findAll({ include: [
    { model: modelTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: modelTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
  });
  return { type: null, message: check };
};

const progress = async (inProgress: boolean):Promise<IResponse> => {
  const check = await model.findAll({
    where: { inProgress },
    include: [
      { model: modelTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
      { model: modelTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
    ],
  });
  if (!check) return { type: 404, message: 'Not found' };
  return { type: null, message: check };
};

export default {
  list,
  progress,
};
