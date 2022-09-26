import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import { DecideButton, MuiChip } from "../../../commonStyle/CommonStyle";
import { useSnackbar } from "notistack";
import { API } from "../../../api";

export default function DeleteStaffModal(props) {
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const [open, setOpen] = React.useState(false);
	//hancle show or hidden modal
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const deleteUser = () => {
		API.get(`/admin/staff/delete/${props.row.id}`).then(result => {
			handleClose();
			props.getStafflist();
			enqueueSnackbar('ログインしました', { variant: 'success' });

		}).catch((error) => {
			enqueueSnackbar('error occured', { variant: 'error' })
		});
	}
	return (
		<div>
			<Box onClick={handleClickOpen}>
				<MuiChip label="Delete staff" />
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle
					className='dialog-title'
				>
					Delete staff {props.row.name}
				</DialogTitle>
				<DialogContent style={{ marginTop: "20px" }}>
					<DialogContentText style={{ marginTop: "20px" }} >
						Sure you want to delete this staff?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<DecideButton onClick={handleClose} autoFocus>
						Cancel
					</DecideButton>
					<DecideButton onClick={deleteUser} autoFocus>
						Delete
					</DecideButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}
