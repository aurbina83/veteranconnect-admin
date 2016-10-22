import * as express from 'express';
import * as mongoose from 'mongoose';
import { User, IUserModel} from './model';


export function find(req: express.Request, res: express.Response, next: Function) {
    console.log(req.query);
    User.find({firstName: req.query.first, lastName: req.query.last, verified: null})
    .exec((err, user)=>{
        if (err) next (err);
        res.json(user);
    })
}

export function verify(req: express.Request, res: express.Response, next: Function) {
    User.update({_id: req.body._id}, {$set: {verified: true}}, (err, numRows: any) =>{
        if(err) return next (err);
        if (numRows.nModified === 0) return next ({message: "Could not update"});
        res.json({message: "Updated"});
    })
}
