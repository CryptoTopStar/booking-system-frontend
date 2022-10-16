import * as React from 'react';
import dayjs from 'dayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Button, Grid } from '@mui/material';
import useReservationTable from '../../../hooks/useReservationTable'
import moment from 'moment';
import { CalendarPicker } from '@mui/x-date-pickers';

const isNotAvailable = (date) => {
	const day = date.day();
	const min = new Date();
	const max = moment().add(35, 'days');
	return day === 3 || date < min || date > max;
};
const timeAvailable = (reservationTable, from, to, checkDay) => {
	let buttons = [];
	let result = [];
	let filterButtons = [];
	let count = 0;
	if (reservationTable.length != 0 && reservationTable.timeSlot != 0) {
		while (moment(from).add((count + 1) * reservationTable.timeSlot * 30, 'minutes') < moment(to)) {
			count++;
			buttons.push(moment(from).add((count) * reservationTable.timeSlot * 30, 'minutes'))
		}
		filterButtons = buttons;
		reservationTable.data.map((item) => {
			if (moment(item.reservation_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') == checkDay.format('YYYY-MM-DD')) {
				filterButtons = buttons.filter((button) => { return button.format("HH:mm") != moment(item.reservation_date, 'YYYY-MM-DD HH:mm:ss').format('HH:mm') })
			}
		})
		filterButtons.map((item) => {
			result.push(item.format("HH:mm").toString() + ' - ' + item.add(reservationTable.timeSlot * 30, 'minutes').format("HH:mm").toString())
		})
	}

	return result;
}

export default function Available({ handleNext, form }) {
	const [value, setValue] = React.useState(dayjs());
	const { reservationTable, from, to } = useReservationTable({ menu_id: form.menu.id, staff_id: form.staff.id })
	const [buttons, setButtons] = React.useState([]);
	const changeDay = (newValue) => {
		setValue(newValue);
		setButtons(timeAvailable(reservationTable, from, to, newValue));
	}
	const dataClick = (item) => {
		let convert = value.format('YYYY-MM-DD');
		handleNext({ date: convert, at: item })
	}
	return (
		<div style={{ margin: '1vh 10vw' }}>
			<Grid container marginTop='100px' spacing={5}>
				<Grid item xs={12} sm={12} md={6} lg={6}>
					<div >
						<div className="subtitle"  >Choose available days</div>
						<div className="title-border"></div>
					</div>
					<CalendarPicker
						date={value}
						shouldDisableDate={isNotAvailable}
						onChange={changeDay}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6} lg={6} >
					<div >
						<div className="subtitle" >Time</div>
						<div className="title-border"></div>
					</div>
					<Grid container spacing={3}>
						{!!buttons &&
							buttons.map((item, index) => {
								return (
									<Grid item sx={{ display: 'flex', justifyContent: 'center' }} key={index} xs={6} md={6} lg={3}>
										<Button key={index} onClick={() => dataClick(item)} >
											{item}
										</Button>
									</Grid>
								)
							})
						}

					</Grid>

				</Grid>
			</Grid>
		</div>


	);
}
