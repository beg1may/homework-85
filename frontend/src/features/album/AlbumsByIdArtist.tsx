import {
    Box,
    Card, CardActions,
    CardContent,
    CardMedia,
    Grid, IconButton,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {selectAlbumByIdArtist} from "./albumsSlice.ts";
import {fetchAlbumByIdArtist} from "./albumsThunks.ts";


const AlbumsByIdArtist = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbumByIdArtist);

    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(fetchAlbumByIdArtist(id));
        }
    }, [id, dispatch]);
    return (
        <Box sx={{ padding: 4 }}>
            {albums[0]?.artist?.name && (
                <Typography gutterBottom variant="h4" component="div">
                    {albums[0].artist.name}
                </Typography>
            )}
            {albums.length === 0 ? (
                <Typography variant='h4'>No album yet</Typography>
            ) : (
                <Grid container spacing={4} justifyContent="center">
                    {albums.map(album => (
                        <Grid key={album._id} size={{xs:12, sm:6, md:4, lg:3}}>
                            <Card sx={{borderRadius: 3}}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={album.image || undefined}
                                    alt={album.name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {album.name}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {album.yearOfManufacture}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <IconButton component={Link} to={'/tracks/' + album._id}>
                                        Перейти
                                    </IconButton>
                                </CardActions>
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

export default AlbumsByIdArtist;