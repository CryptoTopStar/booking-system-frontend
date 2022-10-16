import React from 'react';
import { Typography, Grid, TextField, Button, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import useConfirm from '../../../hooks/useConfirm';
import { useSnackbar } from "notistack";
import GlobalContext from '../../../context/global-context';

const BookingForm = ({ form, control, setValue }) => {
	const confirm = useConfirm();
	const context = React.useContext(GlobalContext);
	let currentUser = {};
	if (context.signedIn) currentUser = context.state.session;
	else currentUser = JSON.parse(localStorage.getItem('user'));
	const { enqueueSnackbar } = useSnackbar();
	React.useEffect(() => {
		setValue('price', form.menu.price)
		setValue('check', false)
	}, [])
	const [price, setPrice] = React.useState(form.menu.price);
	const discountClick = () => {
		confirm({ description: 'Are you sure to use 2 points?' })
			.then(() => {
				if (currentUser.data[0].point < 2)
					enqueueSnackbar('Your points are less than 2', { variant: 'error' });
				else {
					enqueueSnackbar(`Price changet to ${form.menu.price * 0.9}`, { variant: 'success' });
					setValue('price', form.menu.price * 0.9)
					setValue('check', true)
					setPrice(form.menu.price * 0.9)
				}

			})
	}
	return (
		<>
			<div style={{ margin: '1vh 10vw' }}>
				<div style={{ margin: '3vh 0' }}>
					<div className="subtitle" >Booking Request</div>
					<div className="title-border"></div>
				</div>
				<Grid container spacing={3}>
					<Grid item xs={12} md={12}>
						<TextField
							fullWidth
							id='date'
							label='Date'
							disabled
							defaultValue={form.dateText}
						/>
					</Grid>
					{!!form.service?.name && (
						<Grid item xs={12} md={6}>
							<TextField fullWidth id='serviceName' label='Service name' disabled defaultValue={form.service.name} />
						</Grid>
					)}
					{!!form.menu?.name && (
						<Grid item xs={12} md={6}>
							<TextField fullWidth id='optionName' label='Option name' disabled defaultValue={form.menu.name} />
						</Grid>
					)}
					{!!form.menu?.name && (
						<Grid item xs={12} md={12} >
							<Stack direction='row' spacing={3}>
								<Controller
									name='price'
									control={control}
									render={() => <TextField fullWidth disabled id='price' value={price} label='Price' />}
								/>
								<Button variant='contained' onClick={discountClick}>Use 2 points to discount</Button>
							</Stack>
						</Grid>
					)}
					<Grid item xs={12} md={6}>
						<TextField
							required
							id="email"
							name="email"
							label="Email"
							defaultValue={form.user.email}
							fullWidth
							disabled
							autoComplete="booking-name"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							required
							id="tel"
							name="tel"
							label="Tel"
							defaultValue={form.user.telephone}
							fullWidth
							disabled
							autoComplete="booking-tel"
						/>
					</Grid>
					<Grid item xs={12} md={12}>
						<Controller
							name='request'
							render={({ field }) => <TextField fullWidth multiline rows={3} label='Request' {...field} />}
							control={control}
						/>

					</Grid>
				</Grid>
			</div>
		</>
	);
}

export default BookingForm