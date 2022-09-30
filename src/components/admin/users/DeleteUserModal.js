import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Box } from "@mui/material";
import { DecideButton, MuiChip } from "../../../commonStyle/CommonStyle";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { API } from "../../../api";

export default function DeleteUserModal(props) {
	const { enqueueSnackbar } = useSnackbar();

	const [open, setOpen] = React.useState(false);
	//hancle show or hidden modal
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const deleteUser = () => {
		API.get(`/admin/user/delete/${props.row.id}`).then(result => {
			handleClose();
			props.getUserlist();
			enqueueSnackbar('ログインしました', { variant: 'success' });

		}).catch((error) => {
			enqueueSnackbar('error occured', { variant: 'error' })
		});
	}
	return (
		<div>
			<Box onClick={handleClickOpen}>
				<MuiChip label="Delete user" />
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle
					className='dialog-title'
				>
					Delete user {props.row.username}
				</DialogTitle>
				<DialogContent style={{ marginTop: "20px" }}>
					<DialogContentText style={{ marginTop: "20px" }} >
						Sure you want to delete this user?
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
