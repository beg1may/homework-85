import {useAppDispatch} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createTrack} from "./tracksThunks.ts";
import {TrackMutation} from "../../types";
import {Typography} from "@mui/material";
import TrackForm from "./TrackForm/TrackForm.tsx";

const NewTrack = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onCreateNewTrack = async (track: TrackMutation) => {
        try {
            await dispatch(createTrack(track));
            toast.success("Create new track!");
            navigate('/');
        } catch (e) {
            toast.error("Track was not successfully created");
            console.error(e);
        }
    }

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px", marginTop: "30px"}}>
                New Track
            </Typography>
            <TrackForm onSubmitTrack={onCreateNewTrack} />
        </>
    );
};

export default NewTrack;