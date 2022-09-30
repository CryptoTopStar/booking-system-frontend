
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
import Pagination from "../../components/admin/Pagination";
import { CustomTableHeadWithOneActions, TableBox } from "../../commonStyle/CommonStyle";
import { API } from "../../api";
import ReservationsTableBody from "../../components/admin/reservations/ReservationsTableBody";
import Star from "@mui/icons-material/Star";
import usePagination from "../../hooks/usePagination";

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
	const { emptyRows, setPage, setRowsPerPage, rowsPerPage, page } = usePagination(reservationlist);
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
							<Star />
							All bookings here
						</Box>
					</Box>
					{/* <AddServiceModal open={addUserOpen} handleClose={handleClose} getServicelist={getServicelist} /> */}
					<TableContainer component={Paper}>
						<Table>
							<CustomTableHeadWithOneActions name={tableHeader} />
							<ReservationsTableBody rows={reservationlist} getReservationlist={getReservationlist} emptyRows={emptyRows} rowsPerPage={rowsPerPage} page={page} />
							<TableFooter>
								<Pagination rows={reservationlist} setPage={setPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} page={page} />
							</TableFooter>
						</Table>
					</TableContainer>
				</Box>
			</TableBox>
		</>
	)
}
