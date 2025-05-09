import {Button, Grid, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {toast} from "react-toastify";
import {logout} from "../../../features/users/usersThunks.ts";
import {selectUser, unsetUsers} from "../../../features/users/usersSlice.ts";
import {useState} from "react";

const UserMenu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUsers());
        toast.success("Logout successfully");
    }

    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    }

    const handleClose = () => {
        setUserOptionsEl(null);
    }
    return (
        <Grid>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                menu
            </Button>
            <Menu
                keepMounted
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
            >
                {user &&
                    <MenuItem>
                        <Button component={NavLink} to='/artists/new'>Add artist</Button>
                    </MenuItem>
                }
                <MenuItem>
                    <Button component={NavLink} to='/track_history'>  Track History </Button>
                </MenuItem>
                <MenuItem>
                    <Button component={NavLink}  to='/' onClick={handleLogout}>Logout</Button>
                </MenuItem>
            </Menu>
        </Grid>
    );
};

export default UserMenu;