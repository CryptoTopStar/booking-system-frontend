import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
	TextField,
	Button,
	Box,
	Dialog,
	DialogTitle,
	FormControl
} from "@mui/material";
import { BlueButton, CustomForm } from "../../../commonStyle/CommonStyle";
import axios from 'axios';
import { useSnackbar } from "notistack";
import { DesktopDatePicker } from "@mui/x-date-pickers";
const validationSchema = yup.object({
	staffname: yup
		.string()
		.required("Username is required"),
	telephone: yup
		.string().matches(/^[0-9]{10,11}$/i, 'Phone number is not valid')
		.required("Telephone is required"),
	description: yup
		.string()
		.required("Description is required"),
});

export default function AddStaffModal(props) {
	const BASE_URL = process.env.REACT_APP_API;
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const formik = useFormik({
		initialValues: {
			staffname: "",
			telephone: "",
			description: ""
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios.post(`${BASE_URL}/admin/staff/add`, {
				telephone: values.telephone,
				name: values.staffname,
				description: values.description,
				birthday: birthday
			}).then(result => {
				enqueueSnackbar('ログインしました', { variant: 'success' });
				props.handleClose();
				props.getStafflist();
			}).catch((error) => {
				enqueueSnackbar(error.response.data, { variant: 'error' });
			});

		},
	});
	const [birthday, setBirthday] = React.useState(new Date());
	const handleChange = (newValue) => {
		setBirthday(newValue);
	};
	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			maxWidth='xs'
			style={{ width: '100%' }}
		>
			<DialogTitle className='dialog-title'>Add Staff</DialogTitle>
			<CustomForm onSubmit={formik.handleSubmit}>
				<TextField
					id="staffname"
					name="staffname"
					label="Staffname"
					value={formik.values.staffname}
					onChange={formik.handleChange}
					error={formik.touched.staffname && Boolean(formik.errors.staffname)}
					helperText={formik.touched.staffname && formik.errors.staffname}
				/>
				<FormControl fullWidth>
					<DesktopDatePicker
						label="Birthday"
						inputFormat="YYYY-MM-DD"
						value={birthday}
						onChange={handleChange}
						renderInput={(params) => <TextField {...params} />}
					/>
				</FormControl>
				<TextField
					id="telephone"
					name="telephone"
					label="Telephone"
					value={formik.values.telephone}
					onChange={formik.handleChange}
					error={formik.touched.telephone && Boolean(formik.errors.telephone)}
					helperText={formik.touched.telephone && formik.errors.telephone}
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
						Register
					</BlueButton>
				</Box>
			</CustomForm>
		</Dialog >


	);
}
