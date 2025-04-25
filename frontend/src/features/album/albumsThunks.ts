import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumByIdArtistInfo} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAlbumByIdArtist = createAsyncThunk<AlbumByIdArtistInfo[], string>(
    'albums/fetchAlbumByIdArtist',
    async (artist_id) => {
        const response = await axiosApi.get<AlbumByIdArtistInfo[]>(`/albums?artist=${artist_id}`);
        return response.data;
    }
);