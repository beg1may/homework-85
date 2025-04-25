import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../src/features/atists/artistsSlice.ts";
import {albumsReducer} from "../src/features/album/albumsSlice.ts";
import {tracksReducer} from "../src/features/tracks/tracksSice.ts";

export const store = configureStore({
    reducer:{
        artists: artistsReducer,
        albums: albumsReducer,
        tracks: tracksReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;