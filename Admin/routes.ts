import * as express from 'express';
import * as ctrl from './controller';
import { Admin } from './model';

const router = express.Router();

// POST: /api/v1/users/login
router.post('/login', ctrl.login);

export = router;
