import { useAppDispatch } from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {createArtist} from "./artistsThunks.ts";
import {ArtistMutation} from "../../types";
import {toast} from "react-toastify";
import {Typography} from "@mui/material";
import ArtistForm from "./ArtistForm/ArtistForm.tsx";

const NewArtist = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onCreateNewArtist = async (artist: ArtistMutation) => {
        try {
            await dispatch(createArtist(artist));
            toast.success("Create new artist!");
            navigate('/');
        } catch (e) {
            toast.error("Artist was not successfully created");
            console.error(e);
        }
    }
    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px", marginTop: "30px"}}>
                New artist
            </Typography>
            <ArtistForm onSubmitArtist={onCreateNewArtist} />
        </>
    );
};

export default NewArtist;