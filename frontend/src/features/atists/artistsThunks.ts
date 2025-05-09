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

export const artistIsPublished = createAsyncThunk<void, string, { state: RootState }>(
    'artists/artistIsPublished',
    async (artist_id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.patch(`/artists/${artist_id}/togglePublished`, null, {
            headers: {
                'Authorization': token,
            },
        });
    }
);

export const artistDeleted = createAsyncThunk<void, string, { state: RootState }>(
    'artists/artistDeleted',
    async (artist_id, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete(`/artists/${artist_id}`, {
            headers: {
                'Authorization': token,
            },
        });
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

