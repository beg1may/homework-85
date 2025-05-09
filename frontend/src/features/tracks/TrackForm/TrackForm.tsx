import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {TrackMutation} from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {selectAlbums} from "../../album/albumsSlice.ts";
import {useEffect, useState} from "react";
import {fetchAlbums} from "../../album/albumsThunks.ts";

interface Props {
    onSubmitTrack: (track: TrackMutation) => void;
}

const initial = {
    name: '',
    album: '',
    duration: '',
    numberTrack: 0,
}

const TrackForm: React.FC<Props> = ({onSubmitTrack}) => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const [form, setForm] = useState<TrackMutation>(initial);

    useEffect(() => {
        dispatch(fetchAlbums());
    }, [dispatch]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmitTrack({...form});
        setForm(initial);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({ ...form, [name]: value });
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
                        id="duration"
                        label="Duration"
                        name="duration"
                        value={form.duration}
                        onChange={onChangeInput}
                        required
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        type={'number'}
                        id="numberTrack"
                        label="NumberTrack"
                        name="numberTrack"
                        InputProps={{inputProps: {min: 1}}}
                        value={form.numberTrack}
                        onChange={onChangeInput}
                        required
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        style={{width: '100%'}}
                        id="album"
                        label="Album"
                        name="album"
                        value={form.album}
                        onChange={onChangeInput}
                        required
                    >
                        <MenuItem defaultValue='' disabled>Select category</MenuItem>
                        {albums.map(album => (
                            <MenuItem value={album._id} key={album._id}>{album.name}</MenuItem>
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

export default TrackForm;