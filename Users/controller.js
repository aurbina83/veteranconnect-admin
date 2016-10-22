"use strict";
var model_1 = require("./model");
function find(req, res, next) {
    console.log(req.query);
    model_1.User.find({ firstName: req.query.first, lastName: req.query.last, verified: null })
        .exec(function (err, user) {
        if (err)
            next(err);
        res.json(user);
    });
}
exports.find = find;
function verify(req, res, next) {
    model_1.User.update({ _id: req.body._id }, { $set: { verified: true } }, function (err, numRows) {
        if (err)
            return next(err);
        if (numRows.nModified === 0)
            return next({ message: "Could not update" });
        res.json({ message: "Updated" });
    });
}
exports.verify = verify;
