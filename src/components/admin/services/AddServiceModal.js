import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
	TextField,
	Button,
	InputAdornment,
	Box,
	Dialog,
	DialogTitle
} from "@mui/material";
import { BlueButton, CustomForm } from "../../../commonStyle/CommonStyle";
import { API } from "../../../api";
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
	description: yup
		.string()
		.required("Description is required"),
	name: yup
		.string()
		.required("Username is required"),
});

export default function AddServiceModal(props) {
	const { enqueueSnackbar } = useSnackbar();

	const formik = useFormik({
		initialValues: {
			description: "",
			name: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			API.post(`/admin/service/add`, {
				description: values.description,
				name: values.name,
			}).then(result => {
				enqueueSnackbar('Successfully updated', { variant: 'success' });
				props.handleClose();
				props.getServicelist();
			}).catch((error) => console.log(error));

		},
	});

	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			maxWidth='xs'
			style={{ width: '100%' }}
		>
			<DialogTitle className='dialog-title'>Add service</DialogTitle>
			<CustomForm onSubmit={formik.handleSubmit}>
				<TextField
					id="name"
					name="name"
					label="Name"
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
				/>

				<TextField
					fullWidth
					multiline
					rows={3}
					id="description"
					name="description"
					label="Description"
					value={formik.values.description}
					onChange={formik.handleChange}
					error={formik.touched.description && Boolean(formik.errors.description)}
					helperText={formik.touched.description && formik.errors.description}
				/>
				<Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
					<Button
						className="normal-text round-button"
						onClick={props.handleClose}
						sx={{ mr: 2 }}
					>
						Cancel
					</Button>
					<BlueButton type="submit" style={{ float: "right" }}>
						Add
					</BlueButton>
				</Box>
			</CustomForm>
		</Dialog>


	);
}
