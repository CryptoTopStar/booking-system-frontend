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
import { useNavigate } from "react-router-dom";
import EditServiceModal from "./EditServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";


export default function ServicesTableBody(props) {
  let navigate = useNavigate();
  const rows = props.rows;
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index} hover={true} className="row-hover">
          <TableCell style={{ width: '16%' }} component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell style={{ width: '16%' }}>{row.time}</TableCell>
          <TableCell style={{ width: '16%' }}>{row.price}</TableCell>
          <TableCell style={{ width: '16%' }}>{row.description}</TableCell>
          <TableCell style={{ width: '16%' }}>{row.time_slot ? parseInt(row.time_slot) * 30 : 0} 分</TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <EditServiceModal getServicelist={props.getServicelist} row={row} />
            </Box>
          </TableCell>
          <TableCell align="right">
            <Box className="hidden">
              <DeleteServiceModal row={row} getServicelist={props.getServicelist} />
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
