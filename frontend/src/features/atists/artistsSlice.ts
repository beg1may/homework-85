import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {artistDeleted, artistIsPublished, createArtist, fetchAllArtists} from "./artistsThunks.ts";
import {RootState} from "../../../app/store.ts";

interface ArtistsState {
    items: Artist[];
    fetchLoading: boolean;
    createLoading: boolean;
    isPublishedLoading: boolean;
    deleteLoading: boolean;
}

const initialState: ArtistsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    isPublishedLoading: false,
    deleteLoading: false,
}

export const artistsSlice = createSlice({
    name: 'artists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArtists.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllArtists.fulfilled, (state, {payload: artists}) => {
                state.items = artists;
                state.fetchLoading = false;
            })
            .addCase(fetchAllArtists.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createArtist.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createArtist.rejected, (state) => {
                state.createLoading = false;
            })

            .addCase(artistIsPublished.pending, (state) => {
                state.isPublishedLoading= true;
            })
            .addCase(artistIsPublished.fulfilled, (state) => {
                state.isPublishedLoading = false;
            })
            .addCase(artistIsPublished.rejected, (state) => {
                state.isPublishedLoading = false;
            })

            .addCase(artistDeleted.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(artistDeleted.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(artistDeleted.rejected, (state) => {
                state.deleteLoading = false;
            });
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtist = (state: RootState) => state.artists.items;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;