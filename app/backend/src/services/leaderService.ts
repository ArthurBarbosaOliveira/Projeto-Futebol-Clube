import { QueryTypes } from 'sequelize';
import model from '../database/models';
import { IResponse } from '../interface/index';

// passei muito tempo vendo a lógica para leader, onde não resolvi fazer por const separadas ou class para cada operador que precisava
// com ajude de amigos da turma pelo slack, e tirando algumas dúvidas pelo slack com instrutores, conseguir destravar e fazer o leaderboard
// usei workbech MySQllocal e segui a díca por fazer uma query que retornasse a lógica da classificação.

const classification = `Select 
teams.team_name as name,
SUM(
  CASE
    WHEN home_goals > away_goals THEN 3
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) as totalPoints,
COUNT(team) as totalGames,
SUM(
  CASE
    WHEN home_goals > away_goals THEN 1
    ELSE 0
  END
) as totalVictories, 
SUM(
  CASE
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) as totalDraws,
SUM(
  CASE
    WHEN home_goals < away_goals THEN 1
    ELSE 0
  END
) as totalLosses,
SUM(home_goals) as goalsFavor,
SUM(away_goals) as goalsOwn,
SUM(home_goals - away_goals) as goalsBalance,
ROUND(((SUM(
  CASE
    WHEN home_goals > away_goals THEN 3
    WHEN home_goals = away_goals THEN 1
    ELSE 0
  END
) / (COUNT(team)*3)) * 100),2) as efficiency
from
(SELECT home_team_id as team, home_team_goals as home_goals, 
      away_team_goals  as away_goals, 'home' as local
FROM TRYBE_FUTEBOL_CLUBE.matches
where in_progress = 0
union all 
SELECT away_team_id as team, away_team_goals as home_goals, 
     home_team_goals as away_goals, 'away' as local
FROM TRYBE_FUTEBOL_CLUBE.matches
where in_progress = 0 ) AS Base 
INNER JOIN teams ON teams.id = team
where local IN (`;
const finished = `)
GROUP BY team
ORDER BY totalPoints DESC,
         goalsBalance DESC,
         goalsFavor DESC;`;

const list = async (to: string): Promise<IResponse> => {
  const result = await model
    .query(
      `${classification}${to}${finished}`,
      { type: QueryTypes.SELECT },
    );

  return { type: null, message: result };
};

export default {
  list,
};
