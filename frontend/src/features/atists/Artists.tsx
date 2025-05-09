import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectArtist} from "./artistsSlice.ts";
import {useEffect} from "react";
import {artistDeleted, artistIsPublished, fetchAllArtists} from "./artistsThunks.ts";
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Grid,
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

    const handlePublish = async (artist_id: string) => {
        await dispatch(artistIsPublished(artist_id));
        dispatch(fetchAllArtists());
    };

    const handleArtistDelete  = async (artist_id: string) => {
        await dispatch(artistDeleted(artist_id));
        dispatch(fetchAllArtists());
    };

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
                                    <Button component={Link} to={'/albums/' + artist._id}>
                                        Альбомы
                                    </Button>
                                    {!artist.isPublished && user && user.role === 'admin' &&
                                        (
                                            <Button type='submit' onClick={() => handlePublish(artist._id)}>Опубликовать</Button>
                                        )
                                    }
                                    {user && user.role === 'admin' &&
                                        (
                                            <Button type='submit' style={{color: 'red'}} onClick={() => handleArtistDelete(artist._id)}>Удалить</Button>
                                        )
                                    }
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