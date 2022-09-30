import * as React from "react";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  InputAdornment
} from "@mui/material";
import { BlueButton, CustomForm, MuiChip } from "../../../commonStyle/CommonStyle";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { API } from "../../../api";


const validationSchema = yup.object({
  description: yup
    .string()
    .required("Email is required"),
  name: yup
    .string()
    .required("Username is required"),
});


export default function EditServiceModal(props) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      description: `${props.row.description}`,
      name: `${props.row.name}`,
      price: `${props.row.price}`,
      timeSlot: `${props.row.time_slot}`
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      API.post(`/admin/service/update/${props.row.id}`, {
        description: values.description,
        name: values.name,
      },).then(result => {
        handleClose();
        props.getServicelist();
        enqueueSnackbar('Successfully updated', { variant: 'success' });
      }).catch((error) => {
        enqueueSnackbar('error occured', { variant: 'error' })
      });

    },
  });
  //handle functions
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box onClick={handleClickOpen}>
        <MuiChip label="Edit service" />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='xs'
        style={{ width: '100%' }}
      >
        <DialogTitle className='dialog-title'>Edit service</DialogTitle>
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
          <Divider />
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
              onClick={handleClose}
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <BlueButton type="submit" style={{ float: "right" }}>
              Edit
            </BlueButton>
          </Box>
        </CustomForm>
      </Dialog>
    </Box >
  );
}
