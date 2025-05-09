import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectArtist} from "./artistsSlice.ts";
import {useEffect} from "react";
import {fetchAllArtists} from "./artistsThunks.ts";
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import {apiUrl} from "../../../globalConstants.ts";
import {selectUser} from "../users/usersSlice.ts";

const Artists = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtist);

    useEffect(() => {
        dispatch(fetchAllArtists());
    }, [dispatch]);
    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 10 }} style={{marginTop: "20px"}}>
                {artists.length === 0 ? (
                    <Typography variant='h4'>No artists yet</Typography>
                ) : (
                    <Grid>
                        {artists.map(artist => {
                            if (!artist.isPublished && user?.role !== 'admin') {
                            return null;
                        }
                            return (
                            <Card key={artist._id}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${apiUrl}/${artist.image}` || undefined}
                                    alt={artist.name}
                                />
                                <Grid style={{display: 'flex', alignItems: 'center'}}>
                                    <CardHeader title={artist.name} />
                                    {!artist.isPublished && user && user.role === 'admin' &&
                                        (
                                            <span style={{color: 'red'}}> (неопубликовано)</span>
                                        )
                                    }
                                </Grid>
                                <CardActions>
                                    <IconButton component={Link} to={'/albums/' + artist._id}>
                                        Перейти
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )})
                        }
                    </Grid>
                )
                }
            </Grid>
        </Grid>
    );
};

export default Artists;