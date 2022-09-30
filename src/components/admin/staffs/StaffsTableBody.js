import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Box,
  Stack,
  Avatar,
  Button
} from "@mui/material";
import EditStaffModal from "./EditStaffModal";
import DeleteStaffModal from "./DeleteStaffModal";
import moment from "moment/moment";

export default function StaffsTableBody(props) {
  const { emptyRows, rowsPerPage, page, rows, getStafflist } = props;

  return (
    <TableBody>
      {!!rows && (rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row, index) => (
        <TableRow key={index} hover={true} className="row-hover">
          <TableCell style={{ width: '22%' }} component="th" scope="row">
            <Stack direction="row" spacing={0}>
              <Avatar alt={row.name} src="" />
              <Button
                className="name-detail normal-text"
                variant="text"
              >
                {row.name}
              </Button>
            </Stack>
          </TableCell>
          <TableCell style={{ width: '22%' }}>{moment(row.birthday).format('YYYY-MM-DD')}</TableCell>
          <TableCell style={{ width: '23%' }}>{row.telephone}</TableCell>
          <TableCell style={{ width: '23%' }}>{row.description}</TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <EditStaffModal getStafflist={getStafflist} row={row} />
            </Box>
          </TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <DeleteStaffModal row={row} getStafflist={getStafflist} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 83 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
}
