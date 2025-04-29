import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const UserMenu = () => {
    return (
        <>
            <Button component={Link} to="/track_history"  color="inherit">
                Track History
            </Button>

        </>
    );
};

export default UserMenu;