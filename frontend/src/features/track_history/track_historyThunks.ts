import axiosApi from "../../axiosApi.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrackHistory} from "../../types";

export const fetchTrackHistory = createAsyncThunk<TrackHistory[], string>(
    'tracks/fetchTrackHistory',
    async (token) => {
        const response = await axiosApi.get('/track_history', {
            headers: {
                Authorization: token,
            },
        });
        return response.data;
    }
);