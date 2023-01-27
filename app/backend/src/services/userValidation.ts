import { Request, Response, NextFunction } from 'express';

const validationUser = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400)
      .json({ message: 'All fields must be filled' });
  }
  next();
};

export default {
  validationUser,
};
