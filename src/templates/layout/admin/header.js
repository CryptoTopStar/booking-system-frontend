import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import MyInfoHeader from "../myInfoHeader";


export default function AdminHeader() {
	const navigate = useNavigate();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar sx={{ backgroundColor: "#336def" }}>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1, marginLeft: "-5px", marginTop: "2px", cursor: 'pointer' }}
						onClick={() => navigate('/admin')}
					>
						Salon Admin
					</Typography>
					<MyInfoHeader />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
