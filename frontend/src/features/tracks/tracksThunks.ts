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

export const trackIsPublished = createAsyncThunk<void, string, { state: RootState }>(
    'tracks/trackIsPublished',
    async (track_id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.patch(`/tracks/${track_id}/togglePublished`, null, {
            headers: {
                'Authorization': token,
            },
        });
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

export const trackDeleted = createAsyncThunk<void, string, { state: RootState }>(
    'tracks/trackDeleted',
    async (track_id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete(`/tracks/${track_id}`, {
            headers: {
                'Authorization': token,
            },
        });
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