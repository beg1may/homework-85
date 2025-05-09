import {AlbumByIdArtistInfo} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../app/store.ts";
import {createAlbum, fetchAlbumByIdArtist, fetchAlbums} from "./albumsThunks.ts";

interface AlbumsState {
    items: AlbumByIdArtistInfo[];
    albumByIdArtist: AlbumByIdArtistInfo[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: AlbumsState = {
    items: [],
    albumByIdArtist: [],
    fetchLoading: false,
    createLoading: false,
}

export const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
                state.items = albums;
                state.fetchLoading = false;
            })
            .addCase(fetchAlbums.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(fetchAlbumByIdArtist.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAlbumByIdArtist.fulfilled, (state, {payload: artist}) => {
                state.albumByIdArtist = artist;
                state.fetchLoading = false;
            })
            .addCase(fetchAlbumByIdArtist.rejected, (state) => {
                state.fetchLoading = false;
            })

            .addCase(createAlbum.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createAlbum.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createAlbum.rejected, (state) => {
                state.createLoading = false;
            })

    }
});

export const albumsReducer = albumsSlice.reducer;

export const selectAlbumByIdArtist = (state: RootState) => state.albums.albumByIdArtist;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectFetchLoading = (state: RootState) => state.albums.fetchLoading;