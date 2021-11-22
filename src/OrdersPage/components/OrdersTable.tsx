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
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import {Order} from "../../../Types";
import {getInstance} from "../../../axios";


type OrdersTableProps = {
  toggleFunction: (order: Order) => void
}

export default function OrdersTable({toggleFunction}: OrdersTableProps) {
  const [orders, setOrders] = useState<Order[]>()
  useEffect(() => {
    getInstance().get('orders/').then(
      (response) => {
        const data = response.data
        setOrders(data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setOrders]);
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
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Customer Phone</TableCell>
              <TableCell align="left">Products</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Payment Method</TableCell>
              <TableCell align="left">Payment Status</TableCell>
              <TableCell align="left">Order Status</TableCell>
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
                <TableCell align="left">{row.buyer?.name}</TableCell>
                <TableCell align="left">
                  <a href={`tel:${row.buyer?.phone}`}>
                    <Chip label={row.buyer?.phone} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                  </a>
                </TableCell>
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
                <TableCell align="left">{row.payment_method}</TableCell>
                <TableCell align="left">{row.payment_status}</TableCell>
                <TableCell align="left">{row.status}</TableCell>
                <TableCell align="left">
                  <Button variant={'outlined'} onClick={() => toggleFunction(row)}>
                    <ModeEditOutlinedIcon/>
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

