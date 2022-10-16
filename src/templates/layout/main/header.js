import React, { lazy, Suspense } from 'react'
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MediaQuery from 'react-responsive'
import { Tooltip, Box, Stack, } from '@mui/material';
import GlobalContext from '../../../context/global-context'
import {
	Home as HomeIcon,
	Clock as ClockIcon,
	Info as InfoIcon,
	LogIn as LogInIcon,
} from 'react-feather';
import { useNavigate } from 'react-router-dom';
import MyInfoHeader from '../myInfoHeader';
const BookingForm = lazy(() => import('../../../components/pages/booking'));
const SignInForm = lazy(() => import('../../../components/pages/auth/signin'));
const Header = () => {

	const [openBooking, setOpenBooking] = React.useState(false)
	const navigate = useNavigate();
	const handleClickOpenBooking = () => {
		setOpenBooking(true);
	};
	const handleCloseBooking = () => {
		setOpenBooking(false);
	};

	// For Sign in
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	// For Logout
	const context = React.useContext(GlobalContext);
	let currentUser = {};
	if (context.signedIn) currentUser = context.state.session;
	else currentUser = JSON.parse(localStorage.getItem('user'));
	const [value, setValue] = React.useState('1');
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (

		<header className="header">
			<Suspense fallback={<></>}>
				<BookingForm open={openBooking} handleClose={handleCloseBooking} />
				<SignInForm open={open} handleClose={handleClose} />
			</Suspense>
			<div className="container">
				<div style={{ display: 'flex' }} >
					<Box onClick={() => navigate('/')}>
						<img id="logoImage" src="https://demo.myherothemes.com/nancy/wp-content/themes/nancy/images/logo.png" alt="" title="" />
					</Box>
				</div>
				<Stack direction='row' spacing={5}>
					<div>
						<PhoneIcon sx={{ color: '#f798aa' }} />
						<div style={{ fontSize: "13px", color: "#aaa" }}>

							Phone number</div>
						<div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>06-1234-0000</div>
					</div>
					<div>
						<AccessTimeIcon sx={{ color: '#f798aa' }} />
						<div style={{ fontSize: "13px", color: "#aaa" }}>
							Working Hours</div>
						<div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>07:00am-05:00pm</div>
					</div>
					<div>
						<LocationOnIcon sx={{ color: '#f798aa' }} />
						<div style={{ fontSize: "13px", color: "#aaa" }}>
							Location</div>
						<div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>大阪府大阪市</div>
					</div>
				</Stack>
			</div>
			<nav className="nav">
				{/* iPhoneX以下 */}
				<MediaQuery maxDeviceWidth={412}>
					<ul>
						<li >
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
							{!!currentUser ? <MyInfoHeader /> : <Tooltip title='sign in' >
								<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpen} >
									<LogInIcon />
								</Box>
							</Tooltip>}

						</li>
					</ul>
				</MediaQuery>
				{/* iPhoneX Plus以上 */}
				<MediaQuery minDeviceWidth={413}>
					<div style={{ display: 'flex' }}>
						<ul className='menu-ul'>
							<li className='menu-li'>
								<Tooltip title="Home">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/')}>
										Home
									</Box>
								</Tooltip>
							</li>
							<li className='menu-li'>
								<Tooltip title="About">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/about')}>
										About
									</Box>
								</Tooltip>
							</li>
							<li className='menu-li'>
								<Tooltip title="Contact">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={() => navigate('/contact')}>
										Contact
									</Box>
								</Tooltip>
							</li>

						</ul>
						<ul className='menu-ul'>
							<li className='menu-li-booking'>
								<Tooltip title="Booking">
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpenBooking}>
										MAKE AN APPOINTMENT
									</Box>
								</Tooltip>
							</li>
							<li className='menu-li'>
								{!!currentUser ? <MyInfoHeader /> : <Tooltip title='sign in' >
									<Box sx={{ cursor: 'pointer' }} color="inherit" onClick={handleClickOpen} >
										Sign in
									</Box>
								</Tooltip>}
							</li>
						</ul>
					</div>

				</MediaQuery>
			</nav>
		</header>
	)
}

export default Header