import React from 'react';
import {
    Typography,
    AppBar,
    Box,
    Hidden,
    IconButton,
    Toolbar,
    MenuItem,
    Menu,
    MenuList,
    ListItemText
} from '@mui/material';
import PropTypes from 'prop-types';
import Divider from "@mui/material/Divider";
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../../components/Logo';
import AccountCircle from "@mui/icons-material/AccountCircle";
import GlobalContext from '../../../context/global-context'

import AuthService from "../../../services/auth";
import useConfirm from '../../../hooks/useConfirm';


const TopBar = ({
    onMobileNavOpen,
    ...rest
}) => {
    const context = React.useContext(GlobalContext);
    let currentUser = {};
    if (context.signedIn) currentUser = context.state.session;
    else currentUser = JSON.parse(localStorage.getItem('user'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navigate = useNavigate();
    const confirm = useConfirm();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const homeClick = () => {
        setAnchorEl(null);
        navigate('/');
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const settingsClick = () => {
        setAnchorEl(null);
        navigate('/settings/personal')
    }
    const reservationClick = () => {
        setAnchorEl(null);
        navigate('/my-page')
    }
    const signOut = async () => {
        await AuthService.signOut()
        navigate('/');
        context.updateState({
            signedIn: false,
            session: {}
        })
        confirm({ alert: true, description: 'ログアウトしました' })
    };
    return (
        <AppBar
            elevation={0}
            {...rest}
        >
            <Toolbar>
                <Logo onClick={() => navigate('/')} />
                <Typography variant="h6" marginLeft={2} >
                    予約状況
                </Typography>
                <Box flexGrow={1} />
                {/* <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onMobileNavOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden> */}
                {!!currentUser && <>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <AccountCircle style={{ width: "40px", height: "40px" }} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuList
                            sx={{ width: "250px", maxWidth: "100%" }}
                        >
                            <ListItemText
                                sx={{
                                    flexGrow: 1,
                                    alignItems: "center",
                                    textAlign: "center",
                                }}
                            >
                                {currentUser.data[0].username}
                                <br />
                                {currentUser.data[0].email}
                            </ListItemText>
                            <Divider />
                            <MenuItem style={{ padding: "15px" }} onClick={homeClick}>
                                Home
                            </MenuItem>
                            <MenuItem style={{ padding: "15px" }} onClick={reservationClick}>
                                予約状況
                            </MenuItem>
                            <MenuItem style={{ padding: "15px" }} onClick={settingsClick}>
                                My Info
                            </MenuItem>
                            <MenuItem style={{ padding: "15px" }} onClick={signOut}>
                                Sign out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </>}

            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func
};

export default TopBar;