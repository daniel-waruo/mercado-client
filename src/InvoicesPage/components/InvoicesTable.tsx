import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Chip, Grid, InputAdornment, TextField, Typography} from "@mui/material";
import {Box} from "@mui/system";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {Order} from "../../../Types";
import {getInstance} from "../../../axios";
import SearchIcon from '@mui/icons-material/Search';
import OrderStatus from "./OrderStatus";
import PaymentStatus from "./PaymentStatus";
import PaymentMethod from "./PaymentMethod";
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {deleteItems, protocolFix} from "../../utils";
import DeleteIcon from "@mui/icons-material/Delete";
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
type OrdersTableProps = {
  toggleFunction: (order: Order) => void,
  status?: 'fin' | 'prep' | 'ship' | 'can'
}

export default function InvoicesTable({toggleFunction, status}: OrdersTableProps) {
  const [invoices, setInvoices] = useState<Order[]>()
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  const fetchInvoices = (link?: string) => {
    const baseUrl = `${getInstance().defaults.baseURL}invoices/`
    let href = link ? new URL(link) : new URL(baseUrl);
    if (status)
      href.searchParams.set('status', status);
    const url = protocolFix(href.toString())
    getInstance().get(url).then(
      (response) => {
        const data = response.data.results
        setInvoices(data)
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
    fetchInvoices()
  }, []);
  return (
    <>
      <TextField
        sx={{
          marginBottom: '2rem'
        }}
        label="Search"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        fullWidth/>
      <TableContainer sx={{width: '100%'}} component={Box}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"}>
                <Typography fontWeight={'bold'}>id</Typography>
              </TableCell>
              <TableCell align="left">Items</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left" colSpan={2}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices?.map((row) => (
              <TableRow
                key={row.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">
                  <Grid container spacing={0.2} justifyContent={'left'} sx={{minWidth: '1px'}}>
                    {
                      row.items.map(
                        ({id, quantity, product: {name}}) => (
                          <Grid key={id} item xs={12} sx={{paddingY: '0.1rem'}}>
                            <Chip label={
                              `${name} - ${quantity}`
                            } variant="outlined" sx={{paddingX: '0.3rem'}}/>
                          </Grid>
                        )
                      )
                    }
                  </Grid>
                </TableCell>
                <TableCell align="left">Ksh. {row.total}</TableCell>
                <TableCell align="left">
                  <OrderStatus status={row.status}/>
                </TableCell>
                <TableCell align="left">
                  <PaymentMethod status={row.payment_method}/>
                </TableCell>
                <TableCell align="left">
                  <PaymentStatus status={row.payment_status}/>
                </TableCell>
                <TableCell align="left">{row.buyer?.name}</TableCell>
                <TableCell align="left">
                  <Link passHref href={'/invoices/[id]'} as={`/invoices/${row.id}`}>
                    <Button startIcon={<VisibilityIcon/>}>
                      View
                    </Button>
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Button startIcon={<ModeEditOutlinedIcon/>} onClick={() => toggleFunction(row)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    startIcon={<DeleteIcon/>}
                    color={"warning"}
                    onClick={
                      () => deleteItems('invoices', row.id as number)
                    }
                  >
                    DELETE
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
                fetchInvoices(previous)
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
                fetchInvoices(next)
              }
            }
            endIcon={<ArrowForwardIcon/>}>
            Next
          </Button>
          }
        </Grid>
      </Grid>
    </>
  );
}

