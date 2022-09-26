import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { FormBox } from "../../commonStyle/CommonStyle";
import GlobalContext from '../../context/global-context'

export default function MyInfo() {
	const context = React.useContext(GlobalContext);

	let user = {};
	if (context.signedIn) user = context.state.session;
	else user = JSON.parse(localStorage.getItem('user'));
	return (
		<FormBox>
			<Grid container spacing={3} >
				<Grid item xs={12} lg={4}>
					<Paper>
						<Avatar />
						<Button>Upload new photo</Button>

					</Paper>
				</Grid>
				<Grid item xs={12} lg={8}>
					<Paper>
						<TextField
							label="Username"
							fullWidth
							defaultValue={user.data[0].username} />
					</Paper>

					<Typography>
						{user.data[0].email}
					</Typography>
					<Typography>
						{user.data[0].telephone}
					</Typography>
					<Typography>
						{user.data[0].point}
					</Typography>
				</Grid>
			</Grid>
		</FormBox>

	)


}