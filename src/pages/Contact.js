import React, { lazy, Suspense } from "react"
import { Title } from "../commonStyle/CommonStyle"
import { Grid, Stack, Typography } from "@mui/material"
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const BookingForm = lazy(() => import('../components/pages/booking'));


const Contact = () => {
  const [openBooking, setOpenBooking] = React.useState(false)
  const handleClickOpenBooking = () => {
    setOpenBooking(true);
  };
  const handleCloseBooking = () => {
    setOpenBooking(false);
  };

  return <>
    <Suspense fallback={<></>}>
      <BookingForm open={openBooking} handleClose={handleCloseBooking} />
    </Suspense>
    <div className="eyecatch">
      <div className="page-title-wrapper">
        <Title>
          <h2>Contact</h2>
        </Title>
      </div>
      <div className="container" >
        <div style={{ textAlign: 'center' }}>
          <h1>Contact us</h1>
          <div>Check where to find us. You can call us or send a message.</div>
        </div>
        <br />

        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4} >
              <div>
                <div className="subtitle">Contact info</div>
                <div className="title-border"></div>
              </div>
              <Stack spacing={4}>
                <div style={{ display: 'flex' }}>
                  <LocationOnIcon sx={{ color: '#f798aa', marginRight: '20px' }} />
                  <div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>大阪府大阪市</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <PhoneIcon sx={{ color: '#f798aa', marginRight: '20px' }} />
                  <div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>06-1234-0000</div>
                </div>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={4} >
              <div>
                <div className="subtitle">Working hours</div>
                <div className="title-border"></div>
              </div>
              <Typography gutterBottom style={{ fontSize: "14px", color: "#aaa" }}>
                If you have any <span style={{ fontWeight: 'bold', color: '#000000' }}>special event</span> we can come to your place and make you beautiful.
              </Typography>
              <br />
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#444', textTransform: 'uppercase' }}>
                  MONDAY – Sunday
                </div>
                <p style={{ marginBottom: '10px', color: '#aaa' }}>
                  07:00am-05:00pm
                </p>
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#444', textTransform: 'uppercase' }}>
                  Wednesday
                </div>
                <p style={{ marginBottom: '10px', color: '#aaa' }}>
                  Closed
                </p>
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div>
                <div className="subtitle">Contact info</div>
                <div className="title-border"></div>
              </div>
              <Stack spacing={4}>
                <div style={{ display: 'flex' }}>
                  <LocationOnIcon sx={{ color: '#f798aa', marginRight: '20px' }} />
                  <div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>大阪府大阪市</div>
                </div>
                <div style={{ display: 'flex' }}>
                  <PhoneIcon sx={{ color: '#f798aa', marginRight: '20px' }} />
                  <div style={{ color: "#444", fontWeight: '600', fontSize: '16px' }}>06-1234-0000</div>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="appointment-quote">
        <div className="appointment_quote_content">
          <div className="content_part1">
            Make an appointment
          </div>
          <br />
          <div className="content_part2">
            <p>
              Book now and you will enjoy your life.
            </p>
          </div>
        </div>
        <div className="appointment_quote_button">
          <div id="trigger-overlay2" onClick={handleClickOpenBooking}>Book now</div>
        </div>
        <div className="appointment_quote_phone_number">
          <div className="appointment_quote_phone_number_icon">
            <PhoneIcon fontSize="large" />
          </div>
          <div className="appointment_quote_phone_number_content">06-1234-0000</div>
        </div>
      </div>
    </div>

  </>;
}

export default Contact