import { IMatch, IResponse } from '../interface/index';
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

const create = async (match: IMatch) => {
  const { homeTeamId, awayTeamId } = match;
  const team = await modelTeams.findOne({ where: { id: homeTeamId } });
  const away = await modelTeams.findOne({ where: { id: awayTeamId } });
  if (!team || !away) {
    return { type: 'NOT_FOUND', message: 'There is no team with such id!' };
  }
  const matche = await model.create({ ...match, inProgress: true });

  return { type: null, message: matche };
};

export default {
  list,
  progress,
  create,
};
