import { Request, Response, NextFunction } from 'express';
import { verify, Secret } from 'jsonwebtoken';
import { Token } from '../interface';

const segredo = process.env.JWT_SECRET || 'segredinho';

const validation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401)
      .json({ message: 'Token not found' });
  }
  try {
    const check = verify(token, segredo as Secret);
    const { payload } = check as Token;
    req.body.user = payload;
    return next();
  } catch (e) {
    return res.status(401)
      .json({ message: 'Token must be a valid token' });
  }
};

export default validation;
