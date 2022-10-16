import React from 'react';
import { Box, Grid, Typography, FormControl, InputBase, InputLabel, Card, Avatar, CardContent } from '@mui/material';
import moment from 'moment';

const ReviewForm = ({ form }) => {

	React.useEffect(() => {
	}, [form]);

	return (
		<div style={{ margin: '1vh 10vw' }}>
			<div style={{ margin: '3vh 0' }}>
				<div className="subtitle" >Booking detail</div>
				<div className="title-border"></div>
			</div>
			<div style={{ textAlign: 'center' }}>
				<div className="subtitle" >{form.dateText}</div>
				<div className="title-border"></div>
			</div>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} lg={3}>
					{!!form.staff?.id && (
						<>
							<div style={{ margin: '3vh 0' }}>
								<div className="subtitle" >Staff</div>
								<div className="title-border"></div>
							</div>
							<Card className='review-card'>
								<div style={{ justifyContent: 'center', display: 'flex' }}>
									<Avatar
										style={{ width: '200px', height: '200px', }}
										alt='staff'
										src='/staff-list/kadie.jpg'
									/>
								</div>
								<CardContent style={{ textAlign: 'center' }}>
									<Typography variant="h5" component="h2">
										Name: {form.staff.name}
									</Typography>
									<br />
									<Typography variant="h6" component="h3" marginBottom="12px">
										Birthday: {moment(form.staff.birthday).format('YYYY-MM-DD')}
									</Typography>
									<Typography variant="body2" component="p" color="textSecondary">
										{form.staff.description}
									</Typography>
								</CardContent>
							</Card></>

					)}
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					{!!form.service?.id && (
						<>
							<div style={{ margin: '3vh 0' }}>
								<div className="subtitle" >Service</div>
								<div className="title-border"></div>
							</div>
							<Card className='review-card'>
								<div style={{ justifyContent: 'center', display: 'flex' }}>
									<Avatar src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/nails-services.jpg" style={{ width: '200px', height: '200px', }} alt="nails-services" />
								</div>
								<CardContent style={{ textAlign: 'center' }}>
									<Typography variant="h5" component="h2" gutterBottom>
										Service: {form.service.name}
									</Typography>
									<Typography variant="body2" component="p" color="textSecondary">
										{form.service.description}
									</Typography>
								</CardContent>
							</Card>
						</>

					)}
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					{!!form.menu?.id && (
						<>
							<div style={{ margin: '3vh 0' }}>
								<div className="subtitle" >Option</div>
								<div className="title-border"></div>
							</div>
							<Card className='review-card'>
								<div style={{ justifyContent: 'center', display: 'flex' }}>
									<Avatar src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/nails-services.jpg" style={{ width: '200px', height: '200px', }} alt="nails-services" />
								</div>
								<CardContent style={{ textAlign: 'center' }}>
									<Typography variant="h5" component="h2">
										Option: {form.menu.name}
									</Typography>
									<Typography variant="h6" component="h3" marginBottom="12px">
										Time: {form.menu.time_slot * 30}分
									</Typography>
									<Typography variant="h6" component="h3" marginBottom="12px">
										Price: {form.priceText}$
									</Typography>
									<Typography variant="body2" component="p" color="textSecondary">
										{form.menu.description}
									</Typography>
								</CardContent>
							</Card>
						</>

					)}
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<div style={{ margin: '3vh 0' }}>
						<div className="subtitle" >Request</div>
						<div className="title-border"></div>
					</div>
					<Typography variant='h4' color="textSecondary" >{form.request}</Typography>
				</Grid>
			</Grid>
		</div>
	);
}

export default ReviewForm