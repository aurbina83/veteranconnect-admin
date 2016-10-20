"use strict";
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    password: { type: String },
    admin: { type: Boolean },
});
userSchema.method('hashPassword', function (password, done) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return done(err);
        bcrypt.hash(password, salt, function (err, hash) {
            if (err)
                return done(err);
            done(null, hash);
        });
    });
});
userSchema.method('comparePassword', function (password, done) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return done(err);
        done(null, isMatch);
    });
});
userSchema.method('generateJWT', function () {
    return jwt.sign({
        admin: this.admin
    }, process.env.JWT_SECRET);
});
exports.Admin = mongoose.model('Admin', userSchema);
