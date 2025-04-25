import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectAlbumByIdArtist} from "./artistsSlice.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchAlbumByIdArtist} from "./artistsThunks.ts";


const FullArtist = () => {
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

export default FullArtist;