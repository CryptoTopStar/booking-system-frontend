import * as React from "react";
import { DialogTitle, Box, DialogContentText, DialogContent, DialogActions, Dialog } from "@mui/material";
import { DecideButton, MuiChip } from "../../../commonStyle/CommonStyle";
import { useSnackbar } from "notistack";
import { API } from "../../../api";

export default function DeleteMenuModal(props) {
	const { enqueueSnackbar } = useSnackbar();

	const [open, setOpen] = React.useState(false);
	//hancle show or hidden modal
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const deleteService = () => {
		API.delete(`/admin/menu/delete/${props.row.id}`).then(() => {
			enqueueSnackbar('Successfully deleted', { variant: 'success' });
			handleClose();
			props.getServicelist();
		}).catch((error) => {
			enqueueSnackbar(error.response.msg, { variant: 'error' })
		});
	}
	return (
		<div>
			<Box onClick={handleClickOpen}>
				<MuiChip label="Delete service option" />
			</Box>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle
					className='dialog-title'
				>
					Delete service option {props.row.name}
				</DialogTitle>
				<DialogContent style={{ marginTop: "20px" }}>
					<DialogContentText style={{ marginTop: "20px" }} >
						Sure you want to delete this service option?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<DecideButton onClick={handleClose} autoFocus>
						Cancel
					</DecideButton>
					<DecideButton onClick={deleteService} autoFocus>
						Delete
					</DecideButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}
