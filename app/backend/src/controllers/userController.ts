import { Request, Response } from 'express';
import UserServicer from '../services/userServicer';

const loginController = async (req: Request, res: Response) => {
  const loguin = req.body;

  const { type, message } = await UserServicer.loginService(loguin);
  if (type) return res.status(type).json({ message });

  res.status(200)
    .json({ token: message });
};

const roleController = (req: Request, res: Response) => {
  const { user: { role } } = req.body;
  res.status(200)
    .json({ role });
};

export default {
  loginController,
  roleController,
};
