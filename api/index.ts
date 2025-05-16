import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import trackRouter from "./routers/track";
import usersRouter from "./routers/users";
import trackHistoryRouter from "./routers/trackHistory";
import cookieParser from 'cookie-parser';
import config from "./config";

const app = express();
const port = 8000;

app.use(cors({
    origin: 'http://localhost:5177',
    credentials: true,
}));

app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use('/artists', artistRouter);
app.use('/albums', albumsRouter);
app.use('/tracks', trackRouter);
app.use('/users', usersRouter);
app.use('/track_history', trackHistoryRouter);

const run = async () => {
    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
}

run().catch(console.error);
