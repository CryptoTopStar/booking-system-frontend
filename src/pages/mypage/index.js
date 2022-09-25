import React from "react"
import { Box, Button, Grid, Card, CardActions, CardContent, Typography } from "@mui/material";
import useBooking from '../../hooks/useBooking'
import useConfirm from '../../hooks/useConfirm'
import GlobalContext from '../../context/global-context'
import ChangeForm from '../../components/pages/booking/change';
import Progress from "../../components/Progress";

const MyPage = () => {
	const context = React.useContext(GlobalContext);
	let user = {};
	let userId = 0;
	if (context.signedIn) user = context.state.session;
	else user = JSON.parse(localStorage.getItem('user'));
	userId = user.data[0].id;
	const confirm = useConfirm();
	const { bookings, cancel } = useBooking(userId);
	const [selected, setSelected] = React.useState({});

	const handleCancel = booking => {
		confirm({ description: '本当にキャンセルしますか？' })
			.then(async () => {
				await cancel(booking.reservation_id, userId)
				confirm({ alert: true, description: 'キャンセルが正常終了しました' })
					.then(() => {
						// const fetchAll = async () => {
						//     const response = await BookingService.list(userId)
						//     setBookings(response.data)
						// }
						// fetchAll()
					});
			})
			.catch(() => {/* キャンセルを踏みとどまりました */ })
	};

	// for update
	const [open, setOpen] = React.useState(false);

	const handleOpen = booking => {
		setSelected(booking)
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Progress processing={bookings === null} />
			<ChangeForm booking={selected} open={open} handleClose={handleClose} />
			{bookings !== null && bookings.length !== 0 && (
				<>
					<h3 style={{ margin: '10px 0', textAlign: "center" }}>予約状況</h3>
					<Grid container spacing={3}>
						{bookings.map((booking) =>
						(<Grid key={booking.reservation_id} marginTop={3} item xs='auto' sm='auto' md='auto'>
							<Card>
								<CardContent>
									<Typography variant="subtitle1">
										予約日時: {booking.reservation_date}
									</Typography>
									<Box mb="0.25rem" />
									<Typography variant="subtitle1">
										Service name: {booking.servicename}
									</Typography>
									<Typography variant="subtitle1">
										Staff name: {booking.staffname}
									</Typography>
								</CardContent>
								<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Button onClick={() => handleCancel(booking)} size="small">キャンセル</Button>
									{/* <Button onClick={() => handleOpen(booking)} size="small" color="primary">
										変更する
									</Button> */}
								</CardActions>
							</Card>
							<Box mb="1rem" />
						</Grid>)
						)}
					</Grid>
				</>)}
			{bookings !== null && bookings.length === 0 && (<>予約なし</>)}
		</>)
}

export default MyPage