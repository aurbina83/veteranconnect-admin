import * as express from 'express';
import * as ctrl from './controller';
import { User } from './model';
import * as jwt from 'express-jwt';

const router = express.Router();

const auth = jwt({
    userProperty: 'payload',
    secret: process.env.JWT_SECRET
});

// get: /api/v1/users/login
router.get('/find', ctrl.find);
router.put('/verify', ctrl.verify);

export = router;
