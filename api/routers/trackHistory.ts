import express from "express";
import {Error} from "mongoose";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";
import Track from "./../models/Track";
import Album from "../models/Album";
import Artist from "../models/Artist";
const trackHistoryRouter = express.Router();

trackHistoryRouter.post("/", auth, (async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        const track = await Track.findById(req.body.track);
        if (!track) {
            res.status(404).send({ error: 'Track not found' });
            return;
        }

        const album = await Album.findById(track.album);
        if (!album) {
            res.status(404).send({ error: 'Album not found' });
            return;
        }

        const artist = await Artist.findById(album.artist);
        if (!artist) {
            res.status(404).send({ error: 'Artist not found' });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: req.body.track,
            artist: artist.name,
        });

        await trackHistory.save();
        res.send({ trackHistory });
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
}));

trackHistoryRouter.get('/', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user._id;
        const track = await TrackHistory.find({user: user}).populate("track", "name").sort({datetime: -1});
        res.send(track);
    } catch (e) {
        console.error(e);
    }
});

export default trackHistoryRouter;