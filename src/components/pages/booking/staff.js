import React from 'react';
import { Grid, Card, CardContent, Typography, CardMedia, Avatar } from '@mui/material';
import StaffService from '../../../services/staff';
import moment from 'moment';

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
		<>
			<div style={{ marginLeft: '40vw', marginTop: '5vh' }}>
				<div className="subtitle" >Our exports</div>
				<div className="title-border"></div>
			</div>
			<div style={{ margin: '1vh 10vw' }}>
				<Grid container spacing={3} >
					{
						!!stafflist.length &&
						stafflist.map((staff) =>
						(<Grid key={staff.id} item xs={12} sm={6} lg={3}>
							<Card className='staff-card' onClick={() => next(staff)}  >
								<div style={{ justifyContent: 'center', display: 'flex' }}>
									<Avatar
										style={{ width: '15vw', height: '15vw', }}
										alt='staff'
										src='/staff-list/kadie.jpg'
									/>
								</div>

								<CardContent style={{ textAlign: 'center' }}>
									<Typography variant="h5" component="h2">
										Name: {staff.name}
									</Typography>
									<br />
									<Typography variant="h6" component="h3" marginBottom="12px">
										Birthday: {moment(staff.birthday).format('YYYY-MM-DD')}
									</Typography>
									<Typography variant="body2" component="p" color="textSecondary">
										{staff.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						)
						)
					}
				</Grid>
			</div>

		</>
	);
}

export default Staff