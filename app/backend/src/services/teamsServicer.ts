import TeamsModel from '../database/models/Teams';

const teamsAll = async () => {
  const teams = await TeamsModel.findAll();
  return { type: null, message: teams };
};

const teamsId = async (id: number) => {
  const teams = await TeamsModel.findOne({ where: { id } });
  if (!teams) return { type: 404, message: 'Not found' };
  return { type: null, message: teams };
};

export default {
  teamsAll,
  teamsId,
};
