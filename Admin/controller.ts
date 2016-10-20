import * as express from "express";
import * as mongoose from 'mongoose';
import {Admin, IAdminModel } from './model';

export function login(req: express.Request, res: express.Response, next: Function) {
  if (!req.body.name) return next({ message: 'An email is required to login.' });
  if (!req.body.password) return next({ message: 'A password is required to login.' });

  Admin.findOne({ name: req.body.name })
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next({ message: 'Incorrect email/password combination.' });
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch) return next({ message: 'Incorrect email/password combination.' });
        else res.json({ token: user.generateJWT() });
      });
    });
}
