import React from 'react';
import { Box, Grid, Typography, FormControl, InputBase, InputLabel } from '@mui/material';


const ReviewForm = ({ form }) => {

    React.useEffect(() => {
    }, [form]);

    return (
        <>
            <Typography variant="h6" mt={5} mb={3} gutterBottom>
                Booking Detail
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={6}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="component-simple">Date</InputLabel>
                        <Box mb="1rem" />
                        <InputBase id="date" defaultValue={form.dateText} disabled />
                    </FormControl>
                </Grid>

                {!!form.menu?.id && (
                    <Grid item xs={12} md={12} lg={6}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="component-simple">Service name</InputLabel>
                            <Box mb="1rem" />
                            <InputBase id="menu" defaultValue={form.menu.name} disabled />
                        </FormControl>
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                        <InputLabel htmlFor="component-simple">User name</InputLabel>
                        <Box mb="1rem" />
                        <InputBase id="userName" defaultValue={form.user.email} disabled />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                        <InputLabel htmlFor="component-simple">Telephone</InputLabel>
                        <Box mb="1rem" />
                        <InputBase id="tel" defaultValue={form.user.telephone} disabled />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="component-simple">Price</InputLabel>
                        <Box mb="1rem" />
                        <InputBase id="price" defaultValue={form.priceText} disabled />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="component-simple">Request</InputLabel>
                        <Box mb="1rem" />
                        <InputBase
                            id="request"
                            defaultValue={form.request}
                            multiline
                            rows={3}
                            disabled />
                    </FormControl>
                </Grid>
            </Grid>
        </>
    );
}

export default ReviewForm