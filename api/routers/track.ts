import express from "express";
import Track from "../models/Track";
import {Error} from "mongoose";
import {ITrackWithoutId} from "../types";

const trackRouter = express.Router();

trackRouter.get('/', async (req, res, next) => {
    try {
        const filter: {[key: string]: string} = {};
        if(req.query.album) {
            filter["album"] = String(req.query.album)
        }
        const track = await Track.find(filter).populate("album").sort({numberTrack: 1});
        res.send(track);
    } catch (e) {
        console.error(e);
    }
});

trackRouter.post("/", async (req, res, next) => {
    try {
        const newTrack: ITrackWithoutId = {
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            numberTrack: req.body.numberTrack,
        }

        const track = new Track(newTrack);
        await track.save();
        res.send(track);
    } catch (error) {
        if( error instanceof Error.ValidationError || error instanceof Error.CastError){
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

export default trackRouter;
