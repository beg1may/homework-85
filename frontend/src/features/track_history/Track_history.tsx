import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectUser} from "../users/usersSlice.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {selectTrackHistory, selectTrackHistoryLoading} from "./track_historyStore.ts";
import {fetchTrackHistory} from "./track_historyThunks.ts";
import {Box, List, ListItem, ListItemText, Typography} from "@mui/material";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import dayjs from "dayjs";

const TrackHistory = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(selectUser);
    const tracks_history = useAppSelector(selectTrackHistory);
    const loading = useAppSelector(selectTrackHistoryLoading);

    useEffect(() => {
        if (user) {
            dispatch(fetchTrackHistory(user.token));
        } else {
            navigate('/login');
        }
    }, [user, dispatch, navigate]);

    return (
        <Box sx={{p: 4}}>
            <Typography variant="h4" gutterBottom>Track History</Typography>

            {loading ? (
                <Spinner />
            ) : tracks_history.length === 0 ? (
                <Typography>No track history yet</Typography>
            ) : (
                <List>
                    {tracks_history.map((item) => (
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemText
                                    primary={dayjs(item.datetime).format("D MMMM YYYY, HH:mm")}
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            sx={{ color: 'text.primary', display: 'inline' }}
                                        >
                                            {item.track.name} - {item.artist}
                                        </Typography>
                                }
                                />
                            </ListItem>
                        </>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default TrackHistory;