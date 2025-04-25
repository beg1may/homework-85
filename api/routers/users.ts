import express from "express";
import User from "../models/User";
import {Error} from "mongoose";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateToken();
        await user.save();
        res.send(user);
    } catch (error) {
        if(error instanceof  Error.ValidationError) {
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

usersRouter.post('/session', async (req, res, next) => {
    try {
        if(!req.body.username || !req.body.password) {
            res.status(401).send('Username and password are required');
            return;
        }

        const user = await User.findOne({username: req.body.username});

        if(!user) {
            res.status(401).send('Username not found');
            return;
        }

        const isMath = await user.checkPassword(req.body.password);

        if(!isMath) {
            res.status(401).send({error: 'Password in incorrect'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: 'Username and password incorrect', user});
    } catch (e) {
        next(e);
    }
})

export default usersRouter;