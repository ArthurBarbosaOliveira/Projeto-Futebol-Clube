import express = require('express');
import controller from '../controllers/matchesController';

const router = express.Router();

router.get('/', controller.list);

export default {
  router,
};
