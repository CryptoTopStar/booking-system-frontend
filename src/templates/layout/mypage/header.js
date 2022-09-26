import React from 'react';
import { Typography, AppBar, Box, Toolbar, } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../components/Logo';
import MyInfoHeader from '../myInfoHeader';

const TopBar = ({
	...rest
}) => {
	const navigate = useNavigate();
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
				<MyInfoHeader />
			</Toolbar>
		</AppBar>
	);
};

TopBar.propTypes = {
	className: PropTypes.string,
	onMobileNavOpen: PropTypes.func
};

export default TopBar;