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
import PhoneTwoToneIcon from '@mui/icons-material/PhoneTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

type OrdersTableProps = {
  toggleFunction: (order: Order) => void,
  status?: 'fin' | 'prep' | 'ship' | 'can'
}

export default function OrdersTable({toggleFunction, status}: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>()
  useEffect(() => {
    let url = 'orders/'
    if (status) url += `?status=${status}`
    getInstance().get(url).then(
      (response) => {
        const data = response.data
        setOrders(data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setOrders, status]);
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
              <TableCell align="left">Products</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Order Status</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Customer Phone</TableCell>
              <TableCell align="left" colSpan={2}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((row) => (
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
                  {
                    row.buyer?.phone ?
                      <a href={`tel:${row.buyer?.phone}`}>
                        <Chip icon={<PhoneTwoToneIcon/>} label={row.buyer?.phone} variant="outlined"
                              sx={{paddingX: '0.3rem'}}/>
                      </a> : null
                  }
                </TableCell>
                <TableCell align="left">
                  <Button onClick={() => toggleFunction(row)}>
                    <ModeEditOutlinedIcon/>
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Link passHref href={'/orders/[id]'} as={`/orders/${row.id}`}>
                    <Button>
                      <VisibilityIcon/>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

