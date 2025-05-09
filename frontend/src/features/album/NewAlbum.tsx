import {useAppDispatch} from "../../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {AlbumMutation} from "../../types";
import {toast} from "react-toastify";
import {createAlbum} from "./albumsThunks.ts";
import {Typography} from "@mui/material";
import AlbumForm from "./AlbumForm/AlbumForm.tsx";

const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const onCreateNewAlbum = async (album: AlbumMutation) => {
        try {
            await dispatch(createAlbum(album));
            toast.success("Create new album!");
            navigate('/');
        } catch (e) {
            toast.error("Album was not successfully created");
            console.error(e);
        }
    }

    return (
        <div>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px", marginTop: "30px"}}>
                New Album
            </Typography>
            <AlbumForm onSubmitAlbum={onCreateNewAlbum} />
        </div>
    );
};

export default NewAlbum;