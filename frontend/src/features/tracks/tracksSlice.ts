import {TrackByIdAlbum} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store.ts";
import {
    addingTracksToHistory,
    createTrack,
    fetchTracksByIdAlbum,
    trackDeleted,
    trackIsPublished
} from "./tracksThunks.ts";

interface TracksState {
    items: TrackByIdAlbum[];
    fetchLoading: boolean;
    createLoading: boolean;
    trackHistoryLoading: boolean;
    isPublishedLoading: boolean;
    deleteLoading: boolean;
}

const initialState: TracksState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    trackHistoryLoading: false,
    isPublishedLoading: false,
    deleteLoading: false,
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
            })

            .addCase(createTrack.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createTrack.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createTrack.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(trackIsPublished.pending, (state) => {
                state.isPublishedLoading= true;
            })
            .addCase(trackIsPublished.fulfilled, (state) => {
                state.isPublishedLoading = false;
            })
            .addCase(trackIsPublished.rejected, (state) => {
                state.isPublishedLoading = false;
            })

            .addCase(trackDeleted.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(trackDeleted.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(trackDeleted.rejected, (state) => {
                state.deleteLoading = false;
            });

    }
});

export const tracksReducer = tracksSlice.reducer;

export const selectTracksByIdAlbum = (state: RootState) => state.tracks.items;
export const selectFetchLoading = (state: RootState) => state.tracks.fetchLoading;
