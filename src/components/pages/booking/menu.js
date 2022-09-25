import React from 'react';
import { Button, Box, Grid, Card, CardContent, Typography } from '@mui/material';
import BookingService from '../../../services/booking';


const MenuForm = ({ handleNext }) => {
	const [menu, setMenu] = React.useState({});
	const [menulist, setMenulist] = React.useState([]);
	React.useEffect(() => {
		const func = async () => {
			let menulist = await BookingService.menulist();
			setMenulist(menulist.data);
		}
		func();
	}, []);
	const next = menu => {
		document.getElementById("dialog-root-position").scrollIntoView(true);
		handleNext({
			menu: menu
		})
		setMenu({
			menu
		})
	};

	return (
		<Grid container spacing={3}>
			{
				!!menulist.length &&
				menulist.map((menu) =>
				(<Grid key={menu.id} item xs={12} sm={6} md={6}>
					<Card variant='outlined' style={{ marginTop: '32px' }} onClick={() => next(menu)}  >
						<CardContent>
							<Typography variant="h5" component="h2">
								{menu.name}
							</Typography>
							<br />
							<Typography variant="h6" component="h3" marginBottom="12px">
								{menu.time_slot * 30}分
							</Typography>
							<Typography variant="body2" component="p" color="textSecondary">
								{menu.description}
							</Typography>
						</CardContent>
					</Card>
				</Grid>)
				)
			}
		</Grid>
	);
}

export default MenuForm