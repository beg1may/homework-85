import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrackByIdAlbum} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchTracksByIdAlbum = createAsyncThunk<TrackByIdAlbum[], string>(
    'tracks/fetchTracksByIdAlbum',
    async (album_id) => {
        const response = await axiosApi.get<TrackByIdAlbum[]>(`/tracks?album=${album_id}`);
        return response.data;
    }
);