import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Card, Chip, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {Customer} from "../../../Types";
import {getInstance} from "../../../axios";
import {deleteItems} from "../../utils";


type OrdersTableProps = {
  toggleFunction: (customer: Customer) => void
}

export default function CustomersTable({toggleFunction}: OrdersTableProps) {
  const [customers, setCustomers] = useState<Customer[]>()
  useEffect(() => {
    getInstance().get('customers').then(
      (response) => {
        setCustomers(response.data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setCustomers]);

  return (
    <Card sx={{
      minWidth: '100%',
      borderRadius: '1rem',
      padding: '1rem'
    }}>
      <TableContainer component={Box}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"}>
                <Typography fontWeight={'bold'}>id</Typography>
              </TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Business Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left" colSpan={2}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">{customer.id}</TableCell>
                <TableCell align="left">{customer.name}</TableCell>
                <TableCell align="left">{customer.businessName}</TableCell>
                <TableCell align="left">{customer.email}</TableCell>
                <TableCell align="left">
                  <Grid container spacing={0.2} justifyContent={'left'}>
                    <Grid item xs={12} sx={{paddingY: '0.1rem'}}>
                      <Chip label={customer.phone} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align="left">{customer.location}</TableCell>
                <TableCell align="left">
                  <Button variant={'outlined'} onClick={() => toggleFunction(customer)}>
                    <ModeEditOutlinedIcon/>
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant={'outlined'}
                    onClick={
                      () => {
                        if (customer?.id) {
                          deleteItems('customers', customer.id)
                        }
                      }
                    }
                    color={"warning"}>
                    <DeleteOutlineOutlinedIcon/>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

