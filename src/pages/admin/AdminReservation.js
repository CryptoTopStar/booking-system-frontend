
import * as React from "react";
import {
	Table,
	TableContainer,
	TableFooter,
	Paper,
	Typography,
	Toolbar,
	Box,
	Divider,
	ListItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "../../components/admin/Pagination";
import { CustomTableHeadWithTwoActions, TableBox } from "../../commonStyle/CommonStyle";
import { API } from "../../api";
import ReservationsTableBody from "../../components/admin/reservations/ReservationsTableBody";

export default function AdminReservation() {
	const tableHeader = ["Username", "Booking Time", "Service name", "Staff name", "Price($)"];
	const [reservationlist, setReservationlist] = React.useState([]);
	// const [addUserOpen, setAddUserOpen] = React.useState(false);
	const getReservationlist = async () => {
		const res = await API.get(`/admin/reservation/list`);
		setReservationlist(res.data);
	}
	React.useEffect(() => {
		getReservationlist();
	}, []);

	return (
		<>
			<ListItem>
				<Typography ml={1}> Booking </Typography>
			</ListItem>
			<Divider />
			<TableBox>
				<Box className="user-admin-console-container">
					<Toolbar className="user-admin-console-toolbar">
						<Typography className="user-admin-console-typography">
							Currently showing all bookings
						</Typography>
					</Toolbar>
					<Box className="admin-user-console-choose">
						<Box className="user-admin-console-add-filters">
							<AddIcon />
							Add booking
						</Box>
					</Box>
					{/* <AddServiceModal open={addUserOpen} handleClose={handleClose} getServicelist={getServicelist} /> */}
					<TableContainer component={Paper}>
						<Table>
							<CustomTableHeadWithTwoActions name={tableHeader} />
							<ReservationsTableBody rows={reservationlist} getReservationlist={getReservationlist} />
							<TableFooter>
								<Pagination rows={reservationlist} />
							</TableFooter>
						</Table>
					</TableContainer>
				</Box>
			</TableBox>
		</>
	)
}
