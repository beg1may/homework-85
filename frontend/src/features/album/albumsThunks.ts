import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumByIdArtistInfo, AlbumMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";
import {RootState} from "../../../app/store.ts";

export const fetchAlbumByIdArtist = createAsyncThunk<AlbumByIdArtistInfo[], string>(
    'albums/fetchAlbumByIdArtist',
    async (artist_id) => {
        const response = await axiosApi.get<AlbumByIdArtistInfo[]>(`/albums?artist=${artist_id}`);
        return response.data;
    }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation, { state: RootState }>(
    'albums/createAlbum',
    async (albumToAdd,{getState}) => {
        const token = getState().users.user?.token;
        const formData = new FormData();

        formData.append('name', albumToAdd.name);
        formData.append('yearOfManufacture', albumToAdd.yearOfManufacture.toString());
        formData.append('artist', albumToAdd.artist);

        if (albumToAdd.image) {
            formData.append('image', albumToAdd.image);
        }

        await axiosApi.post('/albums', formData, {
            headers: {
                'Authorization': token,
            },
        });

    }
);