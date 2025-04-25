import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {selectTracksByIdAlbum} from "./tracksSice.ts";
import {fetchTracksByIdAlbum} from "./tracksTunks.ts";

const TracksByIdAlbum = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracksByIdAlbum);

    const {id} = useParams();

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