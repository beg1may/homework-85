import express from "express";
import Track from "../models/Track";
import {Error} from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

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

trackRouter.post("/", auth, async (req, res, next) => {
    try {
        const track = new Track ({
            name: req.body.name,
            album: req.body.album,
            duration: req.body.duration,
            numberTrack: req.body.numberTrack,
        })

        await track.save();
        res.send(track);
    } catch (error) {
        if( error instanceof Error.ValidationError || error instanceof Error.CastError){
            res.status(400).send(error);
            return;
        }
        next(error);
    }
});

trackRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).send({ message: 'Track id must be in req params' });
            return;
        }

        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send({ message: 'Track not found' });
            return;
        }

        track.isPublished = !track.isPublished;

        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
});


trackRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        const track = await Track.findById(id);

        if (!track) {
            res.status(404).send('Track not found');
            return;
        }

        await Track.findByIdAndDelete(id);
        res.send({message:"Track deleted successfully."});
    } catch (error) {
        next(error);
    }
});

export default trackRouter;
