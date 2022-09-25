import React from 'react';
import moment from 'moment';
import { Typography, Grid, TextField, FormControl, NativeSelect, InputLabel, Select, MenuItem } from '@mui/material';
import Const from '../../../const'
import BookingService from '../../../services/booking';
import StaffService from '../../../services/staff';
import { Controller } from 'react-hook-form';
import { MobileDatePicker } from '@mui/x-date-pickers';
const UpdateForm = ({ register, setValue, form, control }) => {
	const [menulist, setMenulist] = React.useState([]);
	const [stafflist, setStafflist] = React.useState([]);
	React.useEffect(() => {
		const func = async () => {
			let menulist = await BookingService.menulist();
			setMenulist(menulist.data);
			let stafflist = await StaffService.list();
			setStafflist(stafflist.data);
		}
		func();
	}, []);
	const [reservationDate, setReservationDate] = React.useState(new Date());
	const handleChange = (newValue) => {
		setReservationDate(newValue);
	};
	return (
		<>
			<Typography variant="h6" marginTop={5} gutterBottom>
				Change Booking
			</Typography>
			<br />
			<Grid container spacing={3}>
				<Grid item xs={12} md={12}>
					<FormControl fullWidth>
						<MobileDatePicker
							minDate={moment().format('YYYY-MM-DD')}
							maxDate={moment().add(Const.reservableRange, 'days').format("YYYY-MM-DD")}
							label="Reservation date"
							inputFormat="YYYY-MM-DD"
							value={reservationDate}
							onChange={handleChange}
							renderInput={(params) => <TextField {...params} />}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<FormControl fullWidth>
						<InputLabel htmlFor="uncontrolled-native">Service name</InputLabel>
						{!!form.servicename && (
							<Select
								value={form.serviceId}
								label="Service name"
								id="menuId"
								onChange={e => setValue("menuId", e.target.value)}
							>
								{menulist.map(menu => (
									<MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>
								))}
							</Select>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6} md={6} lg={6}>
					<FormControl fullWidth>
						<InputLabel htmlFor="uncontrolled-native">Staff name</InputLabel>
						{!!form.staffname && (
							<Select
								label="Staff name"
								value={form.staffId}
								id="staffId"
								onChange={e => setValue("staffId", e.target.value)}
							>
								{stafflist.map(staff => (
									<MenuItem key={staff.id} value={staff.id}>{staff.name}</MenuItem>
								))}
							</Select>
						)}
					</FormControl>
				</Grid>
				<Grid item xs={6} md={6}>
					<FormControl fullWidth>
						<InputLabel htmlFor="uncontrolled-native">Hour</InputLabel>
						<NativeSelect
							defaultValue={moment(form.reservation_date, 'YYYY-MM-DD HH:mm').format('HH')}
							id="hour"
							onChange={e => setValue("hour", e.target.value)}
						>
							{[10, 11, 12, 13, 14, 15, 16, 17, 18].map(hour => (
								<option key={hour} value={hour}>{hour}</option>
							))}
						</NativeSelect>
					</FormControl>
				</Grid>
				<Grid item xs={6} md={6}>
					<FormControl fullWidth>
						<InputLabel htmlFor="uncontrolled-native">Time</InputLabel>
						<NativeSelect
							defaultValue={moment(form.reservation_date, 'YYYY-MM-DD HH:mm').format('mm')}
							id="time"
							onChange={e => setValue("time", e.target.value)}
						>
							{['00', '30'].map(time => (
								<option key={time} value={time}>{time}</option>
							))}
						</NativeSelect>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={12}>
					<Controller
						name='request'
						render={({ field }) => <TextField fullWidth multiline rows={3} label='Request' {...field} autoComplete="booking-request" />}
						control={control}
					/>
				</Grid>
			</Grid>
		</>
	);
}

export default UpdateForm