import {configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../src/features/atists/artistsSlice.ts";
import {albumsReducer} from "../src/features/album/albumsSlice.ts";
import {tracksReducer} from "../src/features/tracks/tracksSlice.ts";
import {usersReducer} from "../src/features/users/usersSlice.ts";
import {trackHistoryReducer} from "../src/features/track_history/track_historyStore.ts";

export const store = configureStore({
    reducer:{
        artists: artistsReducer,
        albums: albumsReducer,
        tracks: tracksReducer,
        users: usersReducer,
        track_history: trackHistoryReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;