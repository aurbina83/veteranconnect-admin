import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface IAdminModel extends app.i.IAdmin, mongoose.Document {
    hashPassword(password: string, cb: (err, hash: string) => any);
    generateJWT(): string;
    comparePassword(password: string, cb: (err, isMatch: boolean) => any);
}

let userSchema = new mongoose.Schema({
    name: { type: String, lowercase: true, trim: true, unique: true, sparse: true },
    password: { type: String },
    admin: {type: Boolean},
});

userSchema.method('hashPassword', function(password, done) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return done (err);
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) return done (err);
            done(null, hash);
        });
    });
});

userSchema.method('comparePassword', function(password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return done(err);
    done(null, isMatch);
  });
});

userSchema.method('generateJWT', function() {
  return jwt.sign({
    admin: this.admin
  }, process.env.JWT_SECRET);
});

export let Admin = mongoose.model<IAdminModel>('Admin', userSchema);
