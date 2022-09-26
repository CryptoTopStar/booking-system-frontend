
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
import { API } from "../../api";
import AddIcon from "@mui/icons-material/Add";
import Pagination from "../../components/admin/Pagination";
import { CustomTableHeadWithTwoActions, TableBox } from "../../commonStyle/CommonStyle";
import StaffsTableBody from "../../components/admin/staffs/StaffsTableBody";
import AddStaffModal from "../../components/admin/staffs/AddStaffModal";


export default function AdminStaff() {
	const tableHeader = ["Name", "Birthday", "Telephone", "Description"];
	const [stafflist, setStafflist] = React.useState([]);
	const [addUserOpen, setAddUserOpen] = React.useState(false);
	const getStafflist = async () => {
		const res = await API.get(`/admin/staff/list`);
		setStafflist(res.data);
	}
	React.useEffect(() => {
		getStafflist();
	}, []);
	//const rows = data;

	//handle event
	const handleClick = () => {
		setAddUserOpen(true);
	};
	const handleClose = () => {
		setAddUserOpen(false);
	}

	return (
		<>
			<ListItem>
				<Typography ml={1}> Users </Typography>
			</ListItem>
			<Divider />
			<TableBox>
				<Box className="user-admin-console-container">
					<Toolbar className="user-admin-console-toolbar">
						<Typography className="user-admin-console-typography">
							Currently showing all staffs
						</Typography>
					</Toolbar>
					<Box className="admin-user-console-choose">
						<Box onClick={handleClick} className="user-admin-console-add-filters">
							<AddIcon />
							Add staff
						</Box>
					</Box>
					<AddStaffModal open={addUserOpen} handleClose={handleClose} getStafflist={getStafflist} />
					<TableContainer component={Paper}>
						<Table>
							<CustomTableHeadWithTwoActions name={tableHeader} />
							<StaffsTableBody rows={stafflist} getStafflist={getStafflist} />
							<TableFooter>
								<Pagination rows={stafflist} />
							</TableFooter>
						</Table>
					</TableContainer>
				</Box>
			</TableBox>
		</>
	)
}
