import {Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllArtists} from "./artistsThunks.ts";
import {RootState} from "../../../app/store.ts";

interface ArtistsState {
    items: Artist[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    items: [],
    fetchLoading: false,
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
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtist = (state: RootState) => state.artists.items;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;