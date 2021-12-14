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
      businessName: 'Egg Suppliers 1',
      phone:'254797792447',
      email:'waruodaniel@gmail.com',
      ownerName:'John Doe'
    }
  ]
}



export default function SuppliersTable() {
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
              <TableCell align="left">Supplier ID</TableCell>
              <TableCell align="left">Business Name</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Owner Name</TableCell>
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
                <TableCell align="left">{row.businessName}</TableCell>
                <TableCell align="left">
                  <Chip label={row.phone} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                </TableCell>
                <TableCell align="left">
                  <Chip label={row.email} color={"primary"} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                </TableCell>
                <TableCell align="left">{row.ownerName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

