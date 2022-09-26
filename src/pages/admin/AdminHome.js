import React from "react";
import { Avatar, Grid, Stack, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  width: 'fit-content',
  color: theme.palette.text.secondary,
  // position: "relative",

  cursor: "pointer",
  ":hover": {
    boxShadow: "7em rgba(0, 0, 0, 0.4)",
    transform: "scale(1.05)",
    backgroundColor: "lightgray",
  },
}));

const data = [
  {
    title: "User",
    details: "Manage and search users",
    url: "/admin/users",
    src: "/user.jpg"
  },
  {
    title: "Service option",
    details: "Add and Delete the service option",
    url: "/admin/services",
    src: "/option.jpg"
  },
  {
    title: "Reservation detail",
    details: "Show all the reservation details",
    url: "/admin/bookings",
    src: "/reservations.jpg"

  },
  {
    title: "Staff",
    details: "Manage staff list",
    url: "/admin/staffs",
    src: "/staff.jpg"

  },
  {
    title: "Reservation time",
    details: "Manage reservation time",
    url: "/admin/times",
    src: "/time.jpg"

  },
  {
    title: "Service",
    details: "Add and Delete the service",
    url: "/admin/services",
    src: "/service.jpg"
  },
];

export default function AdminHome() {
  const navigate = useNavigate();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '100px',
          alignItems: 'center',
          marginBottom: '50px'
        }}>
        <Grid container justifyContent="center" spacing={4}>
          {data.map((item) => (
            <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={12} sm={6} md={6} lg={4} key={item.title}>
              <Item onClick={() => navigate(item.url)}>
                <Box sx={{
                  height: '300px',
                  width: '400px'
                }}>
                  <img style={{ height: '100%' }} src={item.src} />
                </Box>
                <br />
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "14px" }}
                  gutterBottom
                >
                  {item.title}
                </Typography>
                {item.details}
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
