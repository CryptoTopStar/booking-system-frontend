import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import StaffService from '../../../services/staff';

const Staff = ({ handleNext }) => {
	const [staff, setStaff] = React.useState({});
	const [stafflist, setStafflist] = React.useState([]);
	React.useEffect(() => {
		const func = async () => {
			let stafflist = await StaffService.list();
			setStafflist(stafflist.data);
		}
		func();
	}, []);

	const next = staff => {
		document.getElementById("dialog-root-position").scrollIntoView(true);
		handleNext({
			staff: staff
		})
		setStaff({
			staff
		})
	};

	return (
		<Grid container spacing={3}>
			{
				!!stafflist.length &&
				stafflist.map((staff) =>
				(<Grid key={staff.id} item xs="auto" sm="auto" md="auto">
					<Card style={{ marginTop: '32px', maxWidth: '340px', cursor: 'pointer' }} onClick={() => next(staff)}  >
						<CardMedia
							component='img'
							alt='staff'
							height='100px'
							image='/staff-list/kadie.jpg'
						/>
						<CardContent>
							<Typography variant="h5" component="h2">
								{staff.name}
							</Typography>
							<br />
							<Typography variant="h6" component="h3" marginBottom="12px">
								{staff.birthday}
							</Typography>
							<Typography variant="body2" component="p" color="textSecondary">
								{staff.description}
							</Typography>
						</CardContent>
					</Card>
				</Grid>)
				)
			}
		</Grid>
	);
}

export default Staff