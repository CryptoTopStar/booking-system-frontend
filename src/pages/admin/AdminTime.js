import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { Grid, Typography, Box, Button } from '@mui/material';
import { API } from '../../api';
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';

export default function AdminTime() {
	let id = 0;
	let check = false;
	const [from, setFrom] = React.useState(dayjs());
	const [to, setTo] = React.useState(dayjs());
	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();
	React.useEffect(() => {
		API.get('/time').then((res) => {
			if (res.data.length != 0) {
				check = true
				id = res.data[0].id
				let prevFrom = res.data[0].from;
				let prevTo = res.data[0].to;
				setFrom(dayjs(prevFrom));
				setTo(dayjs(prevTo));
			}
		})
	}, [])
	React.useEffect(() => {
		API.get('/time').then((res) => {
			if (res.data.length != 0) {
				check = true
				id = res.data[0].id
			}
		})
	}, [from, to])
	const saveTime = () => {
		if (check) {
			API.post(`/admin/time/update/${id}`, {
				from: from,
				to: to,
			}).then(() => {
				enqueueSnackbar('Success', { variant: 'success' });
				navigate('/admin')
			})
		}
		else {
			API.post(`/admin/time/add`, {
				from: from,
				to: to,
			}).then(() => {
				enqueueSnackbar('Success', { variant: 'success' });
				navigate('/admin')

			})
		}
	}

	return (
		<Box >
			<Typography variant='h4' display='flex' justifyContent="center" marginTop='100px'>Set the reservation time</Typography>
			<br />
			<Grid container spacing={5} >
				<Grid item xs={12} sm={6} md={6} sx={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center'
				}}>
					<StaticTimePicker
						displayStaticWrapperAs="mobile"
						value={from}
						minutesStep={30}
						onChange={(newValue) => {
							setFrom(newValue);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={6}
					sx={{
						alignItems: 'center',
						display: 'flex',
						justifyContent: 'center'
					}}>
					<StaticTimePicker
						displayStaticWrapperAs="mobile"
						value={to}
						minutesStep={30}
						minTime={from}
						onChange={(newValue) => {
							setTo(newValue);
						}}
						renderInput={(params) => <TextField {...params} />}
					/>
				</Grid>
			</Grid>
			<br />
			<br />

			<Box display='flex' justifyContent="center">
				<Button variant='contained' onClick={saveTime}>Save the reservation time</Button>
			</Box>
		</Box >


	);
}
