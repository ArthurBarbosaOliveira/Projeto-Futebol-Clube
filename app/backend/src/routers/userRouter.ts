import express = require('express');
import userController from '../controllers/userController';
import validationUser from '../services/userValidation';
import validationJwt from '../services/jwtServicer';

const router = express.Router();

router.post('/', validationUser.validationUser, userController.loginController);
router.get('/validate', validationJwt, userController.roleController);

export default {
  router,
};
