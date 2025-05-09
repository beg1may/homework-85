import { Button, Grid, MenuItem, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {useEffect, useState } from "react";
import {AlbumMutation} from "../../../types";
import {fetchAllArtists} from "../../atists/artistsThunks.ts";
import {selectArtist} from "../../atists/artistsSlice.ts";

interface Props {
    onSubmitAlbum: (album: AlbumMutation) => void;
}

const initial = {
    name: "",
    artist: "",
    yearOfManufacture: 0,
    image: null,
}

const AlbumForm: React.FC<Props> = ({onSubmitAlbum}) => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist);
    const [form, setForm] = useState<AlbumMutation>(initial);

    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmitAlbum({...form});
        setForm(initial);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="name"
                        label="Name"
                        name="name"
                        value={form.name}
                        onChange={onChangeInput}
                        required
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        type={'number'}
                        id="yearOfManufacture"
                        label="YearOfManufacture"
                        name="yearOfManufacture"
                        InputProps={{inputProps: {min: 1}}}
                        value={form.yearOfManufacture}
                        onChange={onChangeInput}
                        required
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        style={{width: '100%'}}
                        id="artist"
                        label="Artist"
                        name="artist"
                        value={form.artist}
                        onChange={onChangeInput}
                        required
                    >
                        <MenuItem defaultValue='' disabled>Select category</MenuItem>
                        {artists.map(artist => (
                            <MenuItem value={artist._id} key={artist._id}>{artist.name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{width: '100%'}}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;