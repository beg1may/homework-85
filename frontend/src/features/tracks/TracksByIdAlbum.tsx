import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Box, Button, Card, CardContent, Grid, Typography} from "@mui/material";
import {selectTracksByIdAlbum} from "./tracksSlice.ts";
import {addingTracksToHistory, fetchTracksByIdAlbum} from "./tracksTunks.ts";
import {selectUser} from "../users/usersSlice.ts";

const TracksByIdAlbum = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracksByIdAlbum);
    const user = useAppSelector(selectUser);

    const {id} = useParams();
    const token = user?.token;

    const handle = (id: string) => {
        if(token) {
            dispatch(addingTracksToHistory({id, token}));
            console.log({token, id})
        }
    }

    useEffect(() => {
        if(id) {
            dispatch(fetchTracksByIdAlbum(id));
        }
    }, [id, dispatch]);

    return (
        <Box sx={{ padding: 4 }}>
            {tracks.length === 0 ? (
                <Typography variant='h4'>No tracks yet</Typography>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {tracks[0]?.album?.name && (
                        <Typography gutterBottom variant="h4" component="div">
                            {tracks[0].album.name}
                        </Typography>
                    )}
                    {tracks.map(track => (
                        <Grid key={track._id} size={{xs:12, sm:6, md:4, lg:3}}>
                            <Card sx={{borderRadius: 3}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {track.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {track.duration}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Номер трека: {track.numberTrack}
                                    </Typography>
                                    {user ?
                                        <Button color="inherit" onClick={() => handle(track._id)}>Play</Button>
                                        : ''
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                    }
                </Grid>
            )
            }
        </Box>
    );
};

export default TracksByIdAlbum;