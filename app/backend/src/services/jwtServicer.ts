import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Token } from '../interface';

const segredo = process.env.JWT_SECRET || 'segredinho';
const jwtSecret: object = { expiresIn: '9d', algorithm: 'HS256' };

export const createToken = (data: Token) => {
  const newToken = jwt.sign({ data }, segredo, jwtSecret);
  return newToken;
};

const validation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401)
      .json({ message: 'Token not found' });
  }
  try {
    const check = jwt.verify(token, segredo as jwt.Secret);
    const { payload } = check as Token;
    req.body.user = payload;
    return next();
  } catch (e) {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }
};

export default validation;
