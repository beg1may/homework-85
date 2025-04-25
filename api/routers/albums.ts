import express from "express";
import Album from "../models/Album";
import {IAlbumWithoutId} from "../types";
import {imagesUpload} from "../multer";
import {Error} from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res, next) => {
    try {
        const filter: {[key: string]: string} = {};

        if(req.query.artist) {
            filter['artist'] = String(req.query.artist);
        }

        console.log(filter);

        const album = await Album.find(filter);
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;

        const album = await Album.findById(id).populate("artist");

        if(!album) {
            res.status(404).send("No album Found");
            return;
        }
        res.send(album);
    } catch (e) {
        next(e);
    }
});

albumsRouter.post("/", imagesUpload.single('image'), async (req, res, next) => {
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
})

export default albumsRouter;