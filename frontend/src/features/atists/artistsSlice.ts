import {AlbumByIdArtistInfo, Artist} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAlbumByIdArtist, fetchAllArtists} from "./artistsThunks.ts";
import {RootState} from "../../../app/store.ts";

interface ArtistsState {
    items: Artist[];
    item: AlbumByIdArtistInfo[];
    fetchLoading: boolean;
}

const initialState: ArtistsState = {
    items: [],
    item: [],
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

            .addCase(fetchAlbumByIdArtist.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAlbumByIdArtist.fulfilled, (state, {payload: artist}) => {
                state.item = artist;
                state.fetchLoading = false;
            })
            .addCase(fetchAlbumByIdArtist.rejected, (state) => {
                state.fetchLoading = false;
            })
    }
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtist = (state: RootState) => state.artists.items;
export const selectAlbumByIdArtist = (state: RootState) => state.artists.item;
export const selectFetchLoading = (state: RootState) => state.artists.fetchLoading;