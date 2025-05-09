import {createAsyncThunk} from "@reduxjs/toolkit";
import {Artist, ArtistMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const fetchAllArtists = createAsyncThunk<Artist[], void>(
    'artists/fetchAllArtists',
    async () => {
        const response = await axiosApi.get<Artist[]>('/artists');
        return response.data;
    }
);

export const createArtist = createAsyncThunk<void, ArtistMutation, { state: RootState }>(
    'artists/createArtist',
    async (artistToAdd,{getState}) => {
        const token = getState().users.user?.token;
        const formData = new FormData();

        formData.append('name', artistToAdd.name);
        formData.append('information', artistToAdd.information);

        if (artistToAdd.image) {
            formData.append('image', artistToAdd.image);
        }

        await axiosApi.post('/artists', formData, {
            headers: {
                'Authorization': token,
            },
        });

    }
);

