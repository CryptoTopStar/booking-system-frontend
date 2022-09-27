
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
import { API } from "../../api";
import { CustomTableHeadWithTwoActions, TableBox } from "../../commonStyle/CommonStyle";
import MenusTableBody from "../../components/admin/menus/MenusTableBody";
import AddMenuModal from "../../components/admin/menus/AddMenuModal";

export default function AdminMenu() {
	const tableHeader = ["Name", "Created Time", "Price", "description", "Time Slot"];
	const [servicelist, setServicelist] = React.useState([]);
	const [addUserOpen, setAddUserOpen] = React.useState(false);
	const getServicelist = async () => {
		const res = await API.get(`/menu/list`);
		setServicelist(res.data);
	}
	React.useEffect(() => {
		getServicelist();
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
				<Typography ml={1}> Service options </Typography>
			</ListItem>
			<Divider />
			<TableBox>
				<Box className="user-admin-console-container">
					<Toolbar className="user-admin-console-toolbar">
						<Typography className="user-admin-console-typography">
							Currently showing all service options
						</Typography>
					</Toolbar>
					<Box className="admin-user-console-choose">
						<Box onClick={handleClick} className="user-admin-console-add-filters">
							<AddIcon />
							Add service option
						</Box>
					</Box>
					<AddMenuModal open={addUserOpen} handleClose={handleClose} getServicelist={getServicelist} />
					<TableContainer component={Paper}>
						<Table>
							<CustomTableHeadWithTwoActions name={tableHeader} />
							<MenusTableBody rows={servicelist} getServicelist={getServicelist} />
							<TableFooter>
								<Pagination rows={servicelist} />
							</TableFooter>
						</Table>
					</TableContainer>
				</Box>
			</TableBox>
		</>
	)
}
