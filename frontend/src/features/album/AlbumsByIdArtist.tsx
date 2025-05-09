import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {selectAlbumByIdArtist} from "./albumsSlice.ts";
import {albumDeleted, albumIsPublished, fetchAlbumByIdArtist} from "./albumsThunks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {apiUrl} from "../../../globalConstants.ts";


const AlbumsByIdArtist = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbumByIdArtist);

    const {id} = useParams();

    useEffect(() => {
        if(id) {
            dispatch(fetchAlbumByIdArtist(id));
        }
    }, [id, dispatch]);

    const handlePublish = async (album_id: string) => {
        if(id) {
            await dispatch(albumIsPublished(album_id));
            dispatch(fetchAlbumByIdArtist(id));
        }
    };

    const handleAlbumDelete  = async (album_id: string) => {
        if(id) {
            await dispatch(albumDeleted(album_id));
            dispatch(fetchAlbumByIdArtist(id));
        }
    };

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
                    {albums.map(album => {
                        if (!album.isPublished && user?.role !== 'admin') {
                            return null;
                        }
                        return (
                        <Grid key={album._id} size={{xs:12, sm:6, md:4, lg:3}}>
                            <Card sx={{borderRadius: 3}}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={`${apiUrl}/${album.image}` || undefined}
                                    alt={album.name}
                                />
                                <CardContent>
                                    <Grid style={{display: 'flex'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {album.name}
                                        </Typography>
                                        {!album.isPublished && user && user.role === 'admin' &&
                                            (
                                                <span style={{color: 'red', marginLeft: '15px'}}> (неопубликовано)</span>
                                            )
                                        }
                                    </Grid>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {album.yearOfManufacture}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button type='submit' component={Link} to={'/tracks/' + album._id}>
                                        Треки
                                    </Button>
                                    {!album.isPublished && user && user.role === 'admin' &&
                                        (
                                            <Button type='submit' onClick={() => handlePublish(album._id)}>Опубликовать</Button>
                                        )
                                    }
                                    {user && user.role === 'admin' &&
                                        (
                                            <Button type='submit' style={{color: 'red'}} onClick={() => handleAlbumDelete(album._id)}>Удалить</Button>
                                        )
                                    }
                                </CardActions>
                            </Card>
                        </Grid>
                    )})
                    }
                </Grid>
            )
            }
        </Box>
    );
};

export default AlbumsByIdArtist;