import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import { DecideButton, MuiChip } from "../../../commonStyle/CommonStyle";
import { API } from "../../../api";
import { useSnackbar } from "notistack";


export default function DeleteReservationModal(props) {
	const { enqueueSnackbar } = useSnackbar();

	const [open, setOpen] = React.useState(false);
	//hancle show or hidden modal
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const deleteReservation = () => {
		API.get(`/admin/reservation/delete/${props.row.reservation_id}`).then(result => {
			enqueueSnackbar('Successfully deleted', { variant: 'success' });

			handleClose();
			props.getReservationlist();
		}).catch((error) => console.log(error));
	}
	return (
		<div>
			<Box onClick={handleClickOpen}>
				<MuiChip label="Delete reservation" />
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle
					className='dialog-title'
				>
					Delete Reservation
				</DialogTitle>
				<DialogContent style={{ marginTop: "20px" }}>
					<DialogContentText style={{ marginTop: "20px" }} >
						Sure you want to delete this reservation?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<DecideButton onClick={handleClose} autoFocus>
						Cancel
					</DecideButton>
					<DecideButton onClick={deleteReservation} autoFocus>
						Delete
					</DecideButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}
