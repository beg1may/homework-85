import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrackByIdAlbum, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const fetchTracksByIdAlbum = createAsyncThunk<TrackByIdAlbum[], string>(
    'tracks/fetchTracksByIdAlbum',
    async (album_id) => {
        const response = await axiosApi.get<TrackByIdAlbum[]>(`/tracks?album=${album_id}`);
        return response.data;
    }
);

export const addingTracksToHistory = createAsyncThunk<void, { id: string, token: string }>(
    'tracks/addTracksToHistory',
    async ({id, token}) => {
        try {
            await axiosApi.post('/track_history', { track: id }, {
                headers: {
                    'Authorization': token,
                },
            });
        } catch (e) {
            console.error(e);
        }
    }
);

export const createTrack = createAsyncThunk<void, TrackMutation, { state: RootState }>(
    'tracks/createTrack',
    async (trackToAdd,{getState}) => {
        const token = getState().users.user?.token;

        await axiosApi.post('/tracks', trackToAdd, {
            headers: {
                'Authorization': token,
            },
        });

    }
);