export interface ILogin {
  email: number;
  password: string;
}

export interface IUser extends ILogin {
  id?: number;
  role: string;
  username: string;
}

export interface Token {
  payload: {
    role: string;
    username: string;
  }
}

export interface ILeader {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export interface IMatch {
  id?: number;
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress?: boolean,
}

export interface IResponse {
  type: number | null ;
  message: string | unknown;
}
