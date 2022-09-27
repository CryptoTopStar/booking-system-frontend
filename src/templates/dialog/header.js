import React from "react"
import { IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GlobalContext from '../../context/global-context'
import StarIcon from '@mui/icons-material/Star';
const Header = ({ title, handleClose }) => {
	const context = React.useContext(GlobalContext);
	let currentUser = {};
	if (context.signedIn) currentUser = context.state.session;
	else currentUser = JSON.parse(localStorage.getItem('user'));
	return (
		<AppBar position="relative">
			<Toolbar>
				<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
					<CloseIcon />
				</IconButton>
				<Typography ml={2} flex='1' variant="h6">
					{title}
				</Typography>
				{!!currentUser &&
					<Typography>
						<StarIcon color="red" />
						{currentUser.data[0].point}
					</Typography>}
			</Toolbar>
		</AppBar>
	)
}

export default Header