import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Card, Chip} from "@mui/material";
import {Box} from "@mui/system";

const data = {
  rows: [
    {
      id: 1,
      totalCost: 10000,
      supplier: {
        name: 'Twiga Foods'
      },
      state: 'Ordered',
      createdAt: '20-04-2020',
      updatedAt: '21-09-2021'
    },
  ]
}


export default function ShipmentTable() {
  return (
    <Card sx={{
      minWidth: '100%',
      borderRadius: '1rem',
      padding: '1rem'
    }}>
      <TableContainer component={Box}>
        <Table sx={{width: '100%'}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Shipment ID</TableCell>
              <TableCell align="left">Total Cost</TableCell>
              <TableCell align="left">Supplier</TableCell>
              <TableCell align="left">State</TableCell>
              <TableCell align="left">Created</TableCell>
              <TableCell align="left">Last Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">
                  {row.id}
                </TableCell>
                <TableCell align="left">{row.totalCost}</TableCell>
                <TableCell align="left">
                  <Chip label={row.supplier.name} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                </TableCell>
                <TableCell align="left">
                  <Chip label={row.state} color={"primary"} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                </TableCell>
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="left">{row.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

