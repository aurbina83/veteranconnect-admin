"use strict";
var model_1 = require('./model');
function login(req, res, next) {
    if (!req.body.name)
        return next({ message: 'An email is required to login.' });
    if (!req.body.password)
        return next({ message: 'A password is required to login.' });
    model_1.Admin.findOne({ name: req.body.name })
        .exec(function (err, user) {
        if (err)
            return next(err);
        if (!user)
            return next({ message: 'Incorrect email/password combination.' });
        user.comparePassword(req.body.password, function (err, isMatch) {
            if (err)
                return next(err);
            if (!isMatch)
                return next({ message: 'Incorrect email/password combination.' });
            else
                res.json({ token: user.generateJWT() });
        });
    });
}
exports.login = login;
