import React from 'react';
import { Typography, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
const BookingForm = ({ register, errors, form, control }) => {
    return (
        <>
            <Typography variant="h6" mt={5} mb={3} gutterBottom>
                Booking Detail
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField
                        id="date"
                        name="date"
                        label="Date"
                        value={form.dateText}
                        fullWidth
                        disabled
                    />
                </Grid>
                {!!form.menu?.name && (
                    <Grid item xs={12} md={12}>
                        <TextField
                            id="serviceName"
                            name="serviceName"
                            label="Service Name"
                            defaultValue={form.menu.name}
                            fullWidth
                            disabled
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        defaultValue={form.user.email}
                        fullWidth
                        disabled
                        // inputRef={register({ required: true })}
                        // error={Boolean(errors.userName)}
                        // helperText={errors.userName && "入力してください"}
                        autoComplete="booking-name"
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="tel"
                        name="tel"
                        label="Tel"
                        defaultValue={form.user.telephone}
                        fullWidth
                        disabled
                        // inputRef={register({
                        //     required: true,
                        //     pattern: {
                        //         value: /^[0-9]{10,11}$/i
                        //     }
                        // })}
                        // helperText={errors.tel && "数値のみで入力してください(10-11桁)"}
                        // error={Boolean(errors.tel)}
                        autoComplete="booking-tel"
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    {/* <TextField
                        id="request"
                        name="request"
                        label="Request"
                        defaultValue={form.request}
                        fullWidth
                        multiline
                        rows={3}
                        //inputRef={register}
                        autoComplete="booking-request"
                    /> */}
                    <Controller
                        name='request'
                        render={({ field }) => <TextField fullWidth multiline rows={3} label='Request' {...field} />}
                        control={control}
                    />

                </Grid>
            </Grid>
        </>
    );
}

export default BookingForm