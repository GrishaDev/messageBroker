const express = require('express');
const Controller = require('./controller');
const wa = require('../utils/wrapAsync');
const { isValidMessage, isValidSubscribe } = require('./validator');

const router = express.Router();

router.post('/message', isValidMessage, wa(Controller.publishMessage));
router.post('/subscribe', isValidSubscribe, wa(Controller.subscribe));
router.post('/unsubscribe', isValidSubscribe, wa(Controller.unsubscribe));

router.post('/listen', wa(Controller.listen));

module.exports = router;