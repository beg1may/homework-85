import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumByIdArtistInfo, Artist} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllArtists = createAsyncThunk<Artist[], void>(
    'artists/fetchAllArtists',
    async () => {
        const response = await axiosApi.get<Artist[]>('/artists');
        return response.data;
    }
);

export const fetchAlbumByIdArtist = createAsyncThunk<AlbumByIdArtistInfo[], string>(
    'artists/fetchAlbumByIdArtist',
    async (artist_id) => {
        const response = await axiosApi.get<AlbumByIdArtistInfo[]>(`/albums?artist=${artist_id}`);
        return response.data;
    }
);

