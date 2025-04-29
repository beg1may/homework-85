import {TrackHistory} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchTrackHistory} from "./track_historyThunks.ts";
import {RootState} from "../../../app/store.ts";

interface trackHistoryState {
    items: TrackHistory[];
    loading: boolean;
}

const initialState: trackHistoryState = {
    items: [],
    loading: false,
};

const trackHistorySlice = createSlice({
    name: 'track_history',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrackHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTrackHistory.fulfilled, (state, {payload: track_history}) => {
                state.items = track_history;
                state.loading = false;
            })
            .addCase(fetchTrackHistory.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const selectTrackHistory = (state: RootState) => state.track_history.items;
export const selectTrackHistoryLoading = (state: RootState) => state.track_history.loading;