import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {artistsReducer} from "../src/features/atists/artistsSlice.ts";
import {albumsReducer} from "../src/features/album/albumsSlice.ts";
import {tracksReducer} from "../src/features/tracks/tracksSlice.ts";
import {usersReducer} from "../src/features/users/usersSlice.ts";
import {trackHistoryReducer} from "../src/features/track_history/track_historyStore.ts";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";

const usersPersistConfig = {
    key: 'store:users',
    storage,
    whitelist: ['user'],
}

const rootReduser = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    track_history: trackHistoryReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
    reducer: rootReduser,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;