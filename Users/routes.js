"use strict";
var express = require('express');
var ctrl = require('./controller');
var jwt = require('express-jwt');
var router = express.Router();
var auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});
router.get('/find', ctrl.find);
router.put('/verify', ctrl.verify);
module.exports = router;
