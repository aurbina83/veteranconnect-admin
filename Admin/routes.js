"use strict";
var express = require('express');
var ctrl = require('./controller');
var router = express.Router();
router.post('/login', ctrl.login);
module.exports = router;
