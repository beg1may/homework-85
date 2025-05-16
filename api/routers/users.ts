import express from "express";
import User from "../models/User";
import {Error} from "mongoose";
import crypto from "crypto";
import {OAuth2Client} from "google-auth-library";
import config from '../config';

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/google', async (req, res, next) => {
    try {
        if(!req.body.credential) {
            res.status(400).send({error: "Google login error"});
            return;
        }

        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: config.google.clientId,
        });


        const payload = ticket.getPayload();

        if(!payload) {
            res.status(400).send({error: 'Google login error'});
            return;
        }

        const email = payload['email'];
        const googleID = payload['sub'];
        const displayName = payload['name'];
        const avatar = payload['picture'];

        if(!email) {
            res.status(400).send({error: "No enough user data to continue!"});
            return;
        }

        let user = await User.findOne({googleID: googleID});

        let genPassword = crypto.randomUUID();
        if(!user) {
            user = new User({
                username: email,
                password: genPassword,
                confirmPassword: genPassword,
                displayName,
                googleID,
                avatar,
            })
        }

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        next(e);
    }
});

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            displayName: req.body.displayName,
            avatar: req.body.avatar,
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

usersRouter.post('/sessions', async (req, res, next) => {
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

        res.send({user});
    } catch (e) {
        next(e);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    const token = req.get('Authorization');

    if(!token){
        res.send({message: 'Success logout'});
        return;
    }

    try {
        const user = await User.findOne({token});

        if(user) {
            user.generateToken();
            await user.save();
        }

        res.send({message: 'Success logout'});
    } catch (e) {
        next(e);
    }
});

export default usersRouter;