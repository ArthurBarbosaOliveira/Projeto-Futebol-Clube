import express = require('express');
import controller from '../controllers/matchesController';
import validation from '../services/jwtServicer';
import validationMatches from '../services/matchesValidation';

const router = express.Router();

router.get('/', controller.list);
router.post('/', validation, validationMatches.validation, controller.create);
router.patch('/:id/finish', controller.progress);
router.patch('/:id', controller.update);
export default {
  router,
};
