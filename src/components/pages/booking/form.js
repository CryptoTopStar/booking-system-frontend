import React from 'react';
import { Typography, Grid, TextField, Button, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import useConfirm from '../../../hooks/useConfirm';
import { useSnackbar } from "notistack";
const BookingForm = ({ register, errors, form, control }) => {
	const confirm = useConfirm();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [price, setPrice] = React.useState(form.menu.price);
	const discountClick = () => {
		confirm({ description: 'Are you sure to use 2 points' }).
			then(() => {
				enqueueSnackbar(`Price changet to ${form.menu.price * 0.9}`, { variant: 'success' });
				setPrice(form.menu.price * 0.9)
			})
	}
	return (
		<>
			<Typography variant="h6" mt={5} mb={3} gutterBottom>
				Booking Detail
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={12}>
					<Controller
						name='date'
						defaultValue={form.dateText}
						render={({ field }) => <TextField fullWidth id='date' label='Date' disabled  {...field} />}
						control={control}
					/>
				</Grid>
				{!!form.service?.name && (
					<Grid item xs={12} md={6}>
						<Controller
							name='servicename'
							defaultValue={form.service.name}
							render={({ field }) => <TextField fullWidth id='serviceName' label='Service name' disabled  {...field} />}
							control={control}
						/>
					</Grid>
				)}
				{!!form.menu?.name && (
					<Grid item xs={12} md={6}>
						<Controller
							name='optionname'
							value={form.menu.name}
							render={({ field }) => <TextField fullWidth id='optionName' label='Option name' disabled  {...field} />}
							control={control}
						/>
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
						// inputRef={register({ required: true })}
						// error={Boolean(errors.userName)}
						// helperText={errors.userName && "入力してください"}
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
		</>
	);
}

export default BookingForm