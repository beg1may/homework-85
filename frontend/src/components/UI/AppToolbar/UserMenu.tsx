import {Grid, styled} from "@mui/material";
import {NavLink} from "react-router-dom";
import { useAppDispatch } from "../../../../app/hooks";
import {toast} from "react-toastify";
import {logout} from "../../../features/users/usersThunks.ts";
import {unsetUsers} from "../../../features/users/usersSlice.ts";

const StyledLink = styled(NavLink)({
    color: '#ffff'
});

const UserMenu = () => {
    const dispatch = useAppDispatch();
    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUsers());
        toast.success("Logout successfully");
    }
    return (
        <Grid>
            <StyledLink  to='/track_history'>  Track History </StyledLink >
            or
            <StyledLink to='/' onClick={handleLogout}> Logout</StyledLink >
        </Grid>
    );
};

export default UserMenu;