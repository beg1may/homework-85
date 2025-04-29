import {TrackByIdAlbum} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store.ts";
import {addingTracksToHistory, fetchTracksByIdAlbum} from "./tracksTunks.ts";
interface TracksState {
    items: TrackByIdAlbum[];
    fetchLoading: boolean;
    trackHistoryLoading: boolean;
}

const initialState: TracksState = {
    items: [],
    fetchLoading: false,
    trackHistoryLoading: false,
}

export const tracksSlice = createSlice({
    name: 'tracks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTracksByIdAlbum.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchTracksByIdAlbum.fulfilled, (state, {payload: tracks}) => {
                state.items = tracks;
                state.fetchLoading = false;
            })
            .addCase(fetchTracksByIdAlbum.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(addingTracksToHistory.pending, (state) => {
                state.trackHistoryLoading = true;
            })
            .addCase(addingTracksToHistory.fulfilled, (state) => {
                state.trackHistoryLoading = false;
            })
            .addCase(addingTracksToHistory.rejected, (state) => {
            state.trackHistoryLoading = false;
            });
    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracksByIdAlbum = (state: RootState) => state.tracks.items;
export const selectFetchLoading = (state: RootState) => state.tracks.fetchLoading;
