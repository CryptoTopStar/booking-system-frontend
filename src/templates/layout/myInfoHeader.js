import React from "react";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import GlobalContext from '../../context/global-context'
import AuthService from "../../services/auth";
import useConfirm from '../../hooks/useConfirm';

export default function MyInfoHeader() {
	const context = React.useContext(GlobalContext);
	let currentUser = {};
	if (context.signedIn) currentUser = context.state.session;
	else currentUser = JSON.parse(localStorage.getItem('user'));
	const confirm = useConfirm();
	const role = currentUser ? currentUser.role : '';
	const [anchorEl, setAnchorEl] = React.useState(null);
	const navigate = useNavigate();
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const signOut = async () => {
		await AuthService.signOut()
		setAnchorEl(null);
		navigate('/');
		context.updateState({
			signedIn: false,
			session: {}
		})
		confirm({ alert: true, description: 'ログアウトしました' })
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const reservationClick = () => {
		setAnchorEl(null);
		navigate('/my-page')
	}
	const settingsClick = () => {
		setAnchorEl(null);
		navigate('/my-info')
	}
	const AdminClick = () => {
		setAnchorEl(null);
		navigate('/admin')
	}
	const homeClick = () => {
		setAnchorEl(null);
		navigate('/')
	}
	return (
		<div>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle style={{ width: "30px", height: "30px" }} />
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
					sx={{ width: "250px", maxWidth: "100%", padding: "0px" }}
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
					{role === 'admin' ? <MenuItem style={{ padding: "15px" }} onClick={AdminClick}>Admin panel</MenuItem> : <div></div>}
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
		</div>
	)
}