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

