import express from "express";
import User from "../models/User";
import {Error} from "mongoose";
import TrackHistory from "../models/TrackHistory";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", async (req, res, next) => {
    try {
        const token = req.get("Authorization");

        if(!token) {
            res.status(401).send("Token not found");
            return;
        }

        const user = await User.findOne({token});

        if(!user) {
            res.status(401).send("Wrong token or track");
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: req.body.track,
        });

        res.send({trackHistory});
    } catch (error) {
        if(error instanceof  Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

export default trackHistoryRouter;