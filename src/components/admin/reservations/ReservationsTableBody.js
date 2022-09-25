import * as React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditReservationModal from "./EditReservationModal";
import DeleteReservationModal from "./DeleteReservationModal";


export default function ReservationsTableBody(props) {
  let navigate = useNavigate();
  const rows = props.rows;
  return (
    <TableBody>
      {!!rows && rows.map((row, index) => (
        <TableRow key={index} hover={true} className="row-hover">
          <TableCell style={{ width: '20%' }} component="th" scope="row">
            {row.username}
          </TableCell>
          <TableCell style={{ width: '20%' }}>{row.reservation_date}</TableCell>
          <TableCell style={{ width: '20%' }}>{row.servicename}</TableCell>
          <TableCell style={{ width: '20%' }}>{row.staffname}</TableCell>
          <TableCell style={{ width: '20%' }}>{row.price}</TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <EditReservationModal getReservationlist={props.getReservationlist} row={row} />
            </Box>
          </TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <DeleteReservationModal row={row} getReservationlist={props.getReservationlist} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
