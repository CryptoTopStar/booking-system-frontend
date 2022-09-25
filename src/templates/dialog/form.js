import React from 'react';
import { Dialog, DialogActions, DialogContent, Box, Grid } from '@mui/material';

import Header from './header'
import Submit from "../../components/atoms/submit";

const FormDialog = ({ open, title, fields, submitContext = {}, handleClose }) => {

    return (
        <>
            <Dialog
                maxWidth='sm'
                open={open}
                onClose={handleClose}
            >
                <Header title={title} handleClose={handleClose} />
                <Box mb="1.5rem" />  
                <form>
                    <DialogContent>
                        <Grid container spacing={3}>
                            {fields}
                        </Grid>
                    </DialogContent>
                    <Box mb="0.5rem" />
                    <DialogActions>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb="1rem">
                                    <Submit
                                        fullWidth
                                        onClick={submitContext.handleSubmit}
                                    >
                                        {submitContext.text ? submitContext.text : '更新'}
                                    </Submit>
                                </Box>
                                {!!submitContext.aditional && (<>{submitContext.aditional}</>)}
                            </Grid>
                        </Grid>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default FormDialog