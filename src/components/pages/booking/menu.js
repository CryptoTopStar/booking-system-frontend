import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import BookingService from '../../../services/booking';


const MenuForm = ({ handleNext }) => {
	const [menulist, setMenulist] = React.useState([]);
	React.useEffect(() => {
		const func = async () => {
			let menulist = await BookingService.menulist();
			setMenulist(menulist.data);
		}
		func();
	}, []);
	const next = menu => {
		console.log(menu);
		document.getElementById("dialog-root-position").scrollIntoView(true);
		handleNext({ menu: menu })
	};

	return (
		<Grid container spacing={3}>
			{
				!!menulist.length &&
				menulist.map((menu) =>
				(<Grid key={menu.id} item xs={12} sm={6} md={6} lg={3}>
					<Card style={{ marginTop: '32px' }} onClick={() => next(menu)}  >
						<CardContent>
							<Typography variant="h5" component="h2">
								Service name: {menu.name}
							</Typography>
							<br />
							<Typography variant="h6" component="h3" marginBottom="12px">
								Service time: {menu.time_slot * 30}分
							</Typography>
							<Typography variant="h6" component="h3" marginBottom="12px">
								Price: {menu.price}$
							</Typography>
							<Typography variant="body2" component="p" color="textSecondary">
								Description: {menu.description}
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