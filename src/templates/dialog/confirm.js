import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ConfirmationDialog = ({ open, options, onCancel, onConfirm, onClose }) => {
	const {
		html,
		alert,
		title,
		description,
		confirmationText,
		cancellationText,
		dialogProps,
		confirmationButtonProps,
		cancellationButtonProps,
	} = options;

	return (
		<Dialog fullWidth {...dialogProps} open={open} onClose={onClose}>
			{title && (
				<DialogTitle>{title}</DialogTitle>
			)}
			{description && (
				<DialogContent>
					{!html && (<DialogContentText>{description}</DialogContentText>)}
					{!!html && (<>{description}</>)}
				</DialogContent>
			)}
			<DialogActions>
				{!!alert && (
					<Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
						Close
					</Button>)}
				{!alert && (
					<>
						<Button {...cancellationButtonProps} onClick={onCancel}>
							{cancellationText}
						</Button>
						<Button color="primary" {...confirmationButtonProps} onClick={onConfirm}>
							{confirmationText}
						</Button>
					</>)}
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;