import express = require('express');
import controller from '../controllers/matchesController';
import validation from '../services/jwtServicer';

const router = express.Router();

router.get('/', controller.list);
router.post('/', validation, controller.create);
router.patch('/:id/finish', controller.progress);
export default {
  router,
};
