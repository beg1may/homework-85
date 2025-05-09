import express from "express";
import Album from "../models/Album";
import {IAlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";
import {Error} from "mongoose";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
    try {
        const filter: {[key: string]: string} = {};

        if(req.query.artist) {
            filter['artist'] = String(req.query.artist);
        }

        const album = await Album.find(filter).populate("artist").sort({yearOfManufacture: -1});
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const album = await Album.findById(id).populate("artists");

        if(!album) {
            res.status(404).send("No album Found");
            return;
        }
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post("/", auth, imagesUpload.single('image'), async (req, res, next) => {
    try {
        const newAlbum: IAlbumWithoutId = {
            name: req.body.name,
            artist: req.body.artist,
            yearOfManufacture: req.body.yearOfManufacture,
            image: req.file ? 'images/' + req.file.filename : null,
        };

        const album = new Album(newAlbum);
        await album.save();
        res.send(album);
    } catch (error) {
        if( error instanceof Error.ValidationError || error instanceof Error.CastError){
            res.status(400).send(error);
            return;
        }

        next(error);
    }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(404).send({ message: 'Album id must be in req params' });
            return;
        }

        const album = await Album.findById(id);

        if (!album) {
            res.status(404).send({ message: 'Album not found' });
            return;
        }

        album.isPublished = !album.isPublished;

        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
    try {
        const id = req.params.id;

        const album = await Album.findById(id);

        if (!album) {
            res.status(404).send('Album not found');
            return;
        }

        await Album.findByIdAndDelete(id);
        res.send({message:"Album deleted successfully."});
    } catch (error) {
        next(error);
    }
})

export default albumsRouter;