import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";

export default function ServicesTableBody(props) {
  const { emptyRows, rowsPerPage, page, rows, getServicelist } = props;

  return (
    <TableBody>
      {!!rows && (rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row, index) => (
        <TableRow key={index} hover={true} className="row-hover">
          <TableCell style={{ width: '16%' }} component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell style={{ width: '16%' }}>{row.description}</TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <EditServiceModal getServicelist={getServicelist} row={row} />
            </Box>
          </TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <DeleteServiceModal row={row} getServicelist={getServicelist} />
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
