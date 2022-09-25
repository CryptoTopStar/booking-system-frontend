import React, { lazy, Suspense } from 'react'
import MediaQuery from 'react-responsive'
import {
	Tooltip, Box, MenuItem,
	Menu,
	MenuList,
	ListItemText,
	Divider,
	IconButton
} from '@mui/material';
import AccountCircle from "@mui/icons-material/AccountCircle";

import GlobalContext from '../../../context/global-context'
import {
	Home as HomeIcon,
	Clock as ClockIcon,
	Info as InfoIcon,
	LogIn as LogInIcon,
	// User as UserIcon,
	LogOut as LogOutIcon,
} from 'react-feather';
import AuthService from "../../../services/auth";
import useConfirm from '../../../hooks/useConfirm';
import { useNavigate } from 'react-router-dom';
const BookingForm = lazy(() => import('../../../components/pages/booking'));
const SignInForm = lazy(() => import('../../../components/pages/auth/signin'));

const Header = () => {
	// const goMypage = () => navigate('/mypage') disable

	// For booking
	const [openBooking, setOpenBooking] = React.useState(false)
	const navigate = useNavigate();
	const handleClickOpenBooking = () => {
		setOpenBooking(true);
	};
	const handleCloseBooking = () => {
		setOpenBooking(false);
	};
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	// For Sign in
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	// For Logout
	const confirm = useConfirm();
	const context = React.useContext(GlobalContext);
	let currentUser = {};
	if (context.signedIn) currentUser = context.state.session;
	else currentUser = JSON.parse(localStorage.getItem('user'));
	const role = currentUser ? currentUser.role : '';
	console.log(currentUser);
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
	const userClick = () => {
		setAnchorEl(null);
	};
	const reservationClick = () => {
		setAnchorEl(null);
		navigate('/my-page')
	}
	const settingsClick = () => {
		setAnchorEl(null);
		navigate('/settings/personal')
	}
	const AdminClick = () => {
		setAnchorEl(null);
		navigate('/admin/')
	}
	return (

		<header className="header">
			<Suspense fallback={<></>}>
				<BookingForm open={openBooking} handleClose={handleCloseBooking} />
				<SignInForm open={open} handleClose={handleClose} />
			</Suspense>
			<div className="container">
				<div className="site">
					<Box onClick={() => navigate('/')}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="225.65"
							height="46.59"
						>
							<defs></defs>
							<desc>ESSENTIALS</desc>
							<path
								fill="#477294"
								d="M52.6 25.36h8.2v-4.7h-8.2V18.4h9.34v-4.93H46.2v19.4h16.1V27.9h-9.7v-2.54zm17.77-6.16c0-.67.6-1.22 2.52-1.22a12 12 0 0 1 5.4 1.44l2-4.74A15.58 15.58 0 0 0 73 13c-6 0-9 2.94-9 6.54 0 7.23 10.7 5.27 10.7 7.7 0 .67-.66 1.06-2.52 1.06a13.25 13.25 0 0 1-6.4-1.78l-2.1 4.77a17.37 17.37 0 0 0 8.45 2c6 0 9-3 9-6.54-.05-7.15-10.77-5.2-10.77-7.54zm18.2 0c0-.67.6-1.22 2.52-1.22a12 12 0 0 1 5.4 1.44l2-4.74A15.62 15.62 0 0 0 91.14 13c-6 0-9 2.94-9 6.54 0 7.23 10.72 5.27 10.72 7.7 0 .67-.66 1.06-2.52 1.06a13.25 13.25 0 0 1-6.4-1.78l-2.1 4.77a17.37 17.37 0 0 0 8.45 2c6 0 9-3 9-6.54 0-7.15-10.72-5.2-10.72-7.54zm19.1 6.16h8.2v-4.7h-8.2V18.4H117v-4.93h-15.77v19.4h16.12V27.9h-9.7v-2.54zm24.96-3.1l-7.37-8.8h-5.37v19.4h6.37v-8.8l7.36 8.8h5.4v-19.4h-6.37v8.8zm8.06-3.74h5.68v14.32h6.54V18.52h5.67v-5.07h-17.9v5.07zm19.6-5.07h6.54v19.4h-6.54zm16.06 0l-8.47 19.4h6.65l1.3-3.38h7.36l1.3 3.38h6.76l-8.48-19.4zm1.28 11.3l1.88-4.88 1.88 4.88zm21.22-11.3h-6.54v19.4h15.3v-5.07h-8.75V13.45zm16.1 5.75c0-.67.6-1.22 2.52-1.22a12 12 0 0 1 5.4 1.44l2-4.74A15.62 15.62 0 0 0 217.5 13c-6 0-9 2.94-9 6.54 0 7.23 10.72 5.27 10.72 7.7 0 .67-.66 1.06-2.52 1.06a13.22 13.22 0 0 1-6.4-1.78l-2.1 4.77a17.37 17.37 0 0 0 8.45 2c6 0 9-3 9-6.54 0-7.15-10.72-5.2-10.72-7.54zM40.75 11.65c-1.23-2.14-4.73-2.43-10.3.8a35.76 35.76 0 0 0-6.29 4.65A35.67 35.67 0 0 0 25 9.32C25 2.9 23 0 20.58 0S16.1 2.9 16.1 9.32a35.67 35.67 0 0 0 .89 7.77 35.76 35.76 0 0 0-6.29-4.65C5.13 9.22 1.63 9.5.4 11.65S.67 17 6.24 20.18a36 36 0 0 0 7.18 3.12 35.47 35.47 0 0 0-7.18 3.12C.67 29.64-.83 32.8.4 35s4.73 2.42 10.3-.8a35.27 35.27 0 0 0 6.3-4.7 35.74 35.74 0 0 0-.88 7.77c0 6.44 2 9.32 4.47 9.32s4.4-2.9 4.4-9.32a35.74 35.74 0 0 0-.88-7.77 35.27 35.27 0 0 0 6.29 4.65c5.57 3.22 9.07 2.93 10.3.8s-.27-5.3-5.84-8.53a35.47 35.47 0 0 0-7.18-3.12 36 36 0 0 0 7.18-3.12c5.6-3.18 7.13-6.4 5.88-8.53zm-18 11.26a2.33 2.33 0 0 1-2.33 2.33h0a2.33 2.33 0 1 1 2.33-2.33z"
							/>
						</svg>
					</Box>
				</div>
				<nav className="nav">
					{/* iPhoneX以下 */}
					<MediaQuery maxDeviceWidth={412}>
						<ul style={{ display: 'flex', alignItems: 'center' }}>
							<li>
								<Tooltip title="Home">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/')}>
										<HomeIcon />
									</Box>
								</Tooltip>
							</li>
							<li>
								<Tooltip title="Booking">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpenBooking}>
										<ClockIcon />
									</Box>
								</Tooltip>
							</li>
							<li>
								<Tooltip title="About">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/about')}>
										<InfoIcon />
									</Box>
								</Tooltip>
							</li>
							<li>
								{!!currentUser ? <>
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
										onClose={userClick}
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
												{currentUser.username}
												<br />
												{currentUser.email}
											</ListItemText>
											<Divider />

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
								</> : <Tooltip title='sign in' >
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpen} >
										<LogInIcon />
									</Box>
								</Tooltip>}

							</li>
						</ul>
					</MediaQuery>
					{/* iPhoneX Plus以上 */}
					<MediaQuery minDeviceWidth={413}>
						<ul style={{ display: 'flex', alignItems: 'center' }}>
							<li>
								<Tooltip title="Home">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/')}>
										Home
									</Box>
								</Tooltip>
							</li>
							<li>
								<Tooltip title="Booking">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpenBooking}>
										Booking
									</Box>
								</Tooltip>
							</li>
							<li>
								<Tooltip title="About">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/about')}>
										About
									</Box>
								</Tooltip>
							</li>
							<li>
								{!!currentUser ? <>
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
										onClose={userClick}
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
								</> : <Tooltip title='sign in' >
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpen} >
										Sign in
									</Box>
								</Tooltip>}

							</li>
						</ul>
					</MediaQuery>
				</nav>
			</div>
		</header>
	)
}

export default Header