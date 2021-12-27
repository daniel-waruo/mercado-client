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
import {deleteItems, protocolFix} from "../../utils";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type OrdersTableProps = {
  toggleFunction: (customer: Customer) => void
}

export default function CustomersTable({toggleFunction}: OrdersTableProps) {
  const [customers, setCustomers] = useState<Customer[]>()
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  const fetchData = (link?: string) => {
    if (link) {
      link = protocolFix(link)
    }
    getInstance().get(link || 'customers').then(
      (response) => {
        setCustomers(response.data.results)
        setNext(response.data.next)
        setPrevious(response.data.previous)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }
  useEffect(() => {
    fetchData()
  }, [setCustomers]);

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
      <Grid container>
        <Grid item xs={6} sx={{textAlign: 'center'}}>
          {previous &&
          <Button
            onClick={
              () => {
                fetchData(previous)
              }
            }
            startIcon={<ArrowBackIcon/>}>Previous</Button>
          }
        </Grid>

        <Grid item xs={6} sx={{textAlign: 'center'}}>
          {next &&
          <Button
            onClick={
              () => {
                fetchData(next)
              }
            }
            endIcon={<ArrowForwardIcon/>}>
            Next
          </Button>
          }
        </Grid>
      </Grid>
    </Card>
  );
}

