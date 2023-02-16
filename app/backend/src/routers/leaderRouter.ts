import express = require('express');
import controller from '../controllers/leaderController';

const router = express.Router();

router.get('/home', controller.listHome);
router.get('/away', controller.listAway);
router.get('/', controller.list);

export default {
  router,
};
