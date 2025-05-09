import {Button, Grid, TextField } from "@mui/material";
import FileInput from "../../../components/UI/FileInput/FileInput";
import { useState } from "react";
import {ArtistMutation} from "../../../types";

interface Props {
    onSubmitArtist: (artist: ArtistMutation) => void;
}

const initial = {
    name: "",
    image: null,
    information: '',
}

const ArtistForm: React.FC<Props> = ({onSubmitArtist}) => {
    const [form, setForm] = useState<ArtistMutation>(initial);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmitArtist({...form});
        setForm(initial);
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
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
                        id="information"
                        label="Information"
                        name="information"
                        value={form.information}
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

export default ArtistForm;