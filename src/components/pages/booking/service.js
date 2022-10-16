import React from 'react';
import { Button, Box, Grid, Card, CardContent, Typography } from '@mui/material';
import Service from '../../../services/service';


const ServiceForm = ({ handleNext }) => {
	const [service, setService] = React.useState({});
	const [servicelist, setServicelist] = React.useState([]);
	React.useEffect(() => {
		const func = async () => {
			let servicelist = await Service.list();
			setServicelist(servicelist.data);
		}
		func();
	}, []);
	const next = service => {
		document.getElementById("dialog-root-position").scrollIntoView(true);
		handleNext({
			service: service
		})
		setService({
			service
		})
	};

	return (
		<>
			<div style={{ marginLeft: '40vw', marginTop: '5vh' }}>
				<div className="subtitle" >Our Services</div>
				<div className="title-border"></div>
			</div>
			<div style={{ margin: '1vh 10vw' }}>
				<Grid container spacing={3}>
					{
						!!servicelist.length &&
						servicelist.map((service) =>
						(<Grid key={service.id} item xs={12} sm={6} md={6} lg={3}>
							<Card className='staff-card' style={{ marginTop: '32px' }} onClick={() => next(service)}  >
								<div style={{ justifyContent: 'center', display: 'flex' }}>
									<img src="https://demo.myherothemes.com/nancy/wp-content/uploads/sites/23/2015/08/nails-services.jpg" width="300" height="300" alt="nails-services" />
								</div>
								<CardContent style={{ textAlign: 'center' }}>
									<Typography variant="h5" component="h2">
										Service name: {service.name}
									</Typography>
									<Typography variant="body2" component="p" color="textSecondary">
										Description: {service.description}
									</Typography>
								</CardContent>
							</Card>
						</Grid>)
						)
					}
				</Grid>
			</div>

		</>

	);
}

export default ServiceForm