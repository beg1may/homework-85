import express from "express";
import Artist from "../models/Artist";
import {Error} from "mongoose";
import {imagesUpload} from "../multer";
import {IArtistWithoutId} from "../types";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const artistRouter = express.Router();

artistRouter.get("/", async (req, res, next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistRouter.post("/", auth, imagesUpload.single('image'), async  (req, res, next) => {
    try {
        const newArtist: IArtistWithoutId = {
            name: req.body.name,
            image: req.file ? 'images/' + req.file.filename : null,
            information: req.body.information,
        };

        const artist = new Artist(newArtist);
        await artist.save();
        res.send(artist);
    } catch (error) {
        if( error instanceof Error.ValidationError || error instanceof Error.CastError){
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

artistRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).send({ message: 'Artist id must be in req params' });
            return;
        }

        const artist = await Artist.findById(id);

        if (!artist) {
            res.status(404).send({ message: 'Artist not found' });
            return;
        }

        artist.isPublished = !artist.isPublished;

        await artist.save();
        res.send(artist);
    } catch (e) {
        next(e);
    }
});

artistRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        const artist = await Artist.findById(id);

        if (!artist) {
            res.status(404).send('Artist not found');
            return;
        }

        await Artist.findByIdAndDelete(id);
        res.send({message:"Artist deleted successfully."});
    } catch (error) {
        next(error);
    }
})

export default artistRouter;