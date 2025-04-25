import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectArtist} from "./artistsSlice.ts";
import {useEffect} from "react";
import {fetchAllArtists} from "./artistsThunks.ts";
import {Card, CardHeader, CardMedia, Grid, Typography} from "@mui/material";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist);


    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);
    return (
        <Grid container direction="column" spacing={2}>
            {artists.length === 0 ? (
                    <Typography variant='h4'>No artists yet</Typography>
                ) : (
                <Grid>
                    {artists.map(artist => (
                        <Card key={artist.id}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={artist.image || undefined}
                                alt={artist.name}
                            />
                            <CardHeader title={artist.name} />
                        </Card>
                    ))
                    }
                </Grid>
                )
            }
        </Grid>
    );
};

export default Artists;