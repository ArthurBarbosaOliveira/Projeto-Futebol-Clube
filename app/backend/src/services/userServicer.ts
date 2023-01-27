import { sign, SignOptions } from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { ILogin, IResponse } from '../interface';
import Users from '../database/models/User';

const segredo = process.env.JWT_SECRET || 'segredinho';
const jwt = { algorithm: 'HS256', expiresIn: '7d' };

const Token = (id: number, role: string):string => {
  const payload = {
    id,
    role,
  };

  const token = sign({ payload }, segredo, jwt as SignOptions);
  return token;
};

const loginService = async (login: ILogin): Promise<IResponse> => {
  const user = await Users.findOne({ where: { email: login.email } });

  if (!user) {
    return { type: 401, message: 'Incorrect email or password' };
  }

  const check = compareSync(login.password, user.password);

  if (!check) {
    return { type: 401, message: 'Incorrect email or password' };
  }

  return { type: null, message: Token(user.id, user.role) };
};

export default {
  loginService,
};
