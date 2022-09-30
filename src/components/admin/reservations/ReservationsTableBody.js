import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import DeleteReservationModal from "./DeleteReservationModal";

export default function ReservationsTableBody(props) {
  const { emptyRows, rowsPerPage, page, rows, getReservationlist } = props;
  return (
    <TableBody>
      {!!rows && (rowsPerPage > 0
        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : rows
      ).map((row, index) => (
        <TableRow key={index} hover={true} className="row-hover">
          <TableCell style={{ width: '20%' }} component="th" scope="row">
            {row.username}
          </TableCell>
          <TableCell style={{ width: '20%' }}>{row.reservation_date}</TableCell>
          <TableCell style={{ width: '20%' }}>{row.servicename}</TableCell>
          <TableCell style={{ width: '20%' }}>{row.staffname}</TableCell>
          <TableCell style={{ width: '20%' }}>{row.price}</TableCell>
          {/* <TableCell align="right">
            <Box className="hidden">
              <EditReservationModal getReservationlist={props.getReservationlist} row={row} />
            </Box>
          </TableCell> */}
          <TableCell align="right">
            <Box className="hidden">
              <DeleteReservationModal row={row} getReservationlist={getReservationlist} />
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
