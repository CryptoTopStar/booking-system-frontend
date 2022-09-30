
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
import UsersTableBody from "../../components/admin/users/UsersTableBody";
import { API } from "../../api";
import AddUserModal from "../../components/admin/users/AddUserModal";
import usePagination from "../../hooks/usePagination";

export default function AdminUser() {
  const tableHeader = ["Name", "Email", "Telephone", "Point"];
  const [userlist, setUserlist] = React.useState([]);
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const getUserlist = async () => {
    const res = await API.get(`/admin/user/list`);
    setUserlist(res.data);
  }
  React.useEffect(() => {
    getUserlist();
  }, []);
  //const rows = data;

  //handle event
  const handleClick = () => {
    setAddUserOpen(true);
  };
  const handleClose = () => {
    setAddUserOpen(false);
  }
  const { emptyRows, setPage, setRowsPerPage, rowsPerPage, page } = usePagination(userlist);
  console.log(emptyRows);
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
              Currently showing all users
            </Typography>
          </Toolbar>
          <Box className="admin-user-console-choose">
            <Box onClick={handleClick} className="user-admin-console-add-filters">
              <AddIcon />
              Add user
            </Box>
          </Box>
          <AddUserModal open={addUserOpen} handleClose={handleClose} getUserlist={getUserlist} />
          <TableContainer component={Paper}>
            <Table>
              <CustomTableHeadWithTwoActions name={tableHeader} />
              <UsersTableBody rows={userlist} getUserlist={getUserlist} emptyRows={emptyRows} rowsPerPage={rowsPerPage} page={page} />
              <TableFooter>
                <Pagination rows={userlist} setPage={setPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} page={page} />
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </TableBox>
    </>
  )
}
