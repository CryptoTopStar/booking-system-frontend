import React from 'react';
import { Typography, Grid, TextField, Button, Stack } from '@mui/material';
import { Controller } from 'react-hook-form';
import useConfirm from '../../../hooks/useConfirm';
const BookingForm = ({ register, errors, form, control }) => {
	const confirm = useConfirm();
	const [price, setPrice] = React.useState(0);
	const discountClick = () => {
		confirm({ description: 'Are you sure to use 2 points' }).
			then(() => {
				setPrice(form.menu.price * 0.9)
			})
		console.log(price);
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
							defaultValue={form.menu.name}
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
								//defaultValue={form.menu.price}
								render={({ field }) => <TextField fullWidth id='price' label='Price' value="3"  {...field} />}
								control={control}
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
						// inputRef={register({
						//     required: true,
						//     pattern: {
						//         value: /^[0-9]{10,11}$/i
						//     }
						// })}
						// helperText={errors.tel && "数値のみで入力してください(10-11桁)"}
						// error={Boolean(errors.tel)}
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