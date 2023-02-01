import { IResponse } from '../interface/index';
import model from '../database/models/Matches';
import modelTeams from '../database/models/Teams';

const list = async (): Promise<IResponse> => {
  const result = await model.findAll({ include: [
    { model: modelTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
    { model: modelTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
  ],
  });
  return { type: null, message: result };
};

export default {
  list,
};
