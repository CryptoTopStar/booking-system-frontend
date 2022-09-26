import React from "react"
import { IconButton, AppBar, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Header = ({ title, handleClose }) => {

	return (
		<AppBar position="relative">
			<Toolbar>
				<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
					<CloseIcon />
				</IconButton>
				<Typography ml={2} flex='1' variant="h6">
					{title}
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header