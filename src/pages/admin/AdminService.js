
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
import ServicesTableBody from "../../components/admin/services/ServicesTableBody";
import AddServiceModal from "../../components/admin/services/AddServiceModal";

export default function AdminService() {
    const tableHeader = ["Name", "description"];
    const [servicelist, setServicelist] = React.useState([]);
    const [addUserOpen, setAddUserOpen] = React.useState(false);
    const getServicelist = async () => {
        const res = await API.get(`/service/list`);
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
                <Typography ml={1}> Service </Typography>
            </ListItem>
            <Divider />
            <TableBox>
                <Box className="user-admin-console-container">
                    <Toolbar className="user-admin-console-toolbar">
                        <Typography className="user-admin-console-typography">
                            Currently showing all service
                        </Typography>
                    </Toolbar>
                    <Box className="admin-user-console-choose">
                        <Box onClick={handleClick} className="user-admin-console-add-filters">
                            <AddIcon />
                            Add service
                        </Box>
                    </Box>
                    <AddServiceModal open={addUserOpen} handleClose={handleClose} getServicelist={getServicelist} />
                    <TableContainer component={Paper}>
                        <Table>
                            <CustomTableHeadWithTwoActions name={tableHeader} />
                            <ServicesTableBody rows={servicelist} getServicelist={getServicelist} />
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
