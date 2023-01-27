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

export interface IResponse {
  type: number | null ;
  message: string | unknown;
}
