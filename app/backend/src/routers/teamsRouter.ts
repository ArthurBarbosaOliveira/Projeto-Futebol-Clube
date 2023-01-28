import express = require('express');
import teamController from '../controllers/teamsController';

const router = express.Router();

router.get('/', teamController.teamsAll);
router.get('/:id', teamController.teamsId);

export default {
  router,
};
