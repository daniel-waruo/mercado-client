import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Card} from "@mui/material";
import {Box} from "@mui/system";
import {Product} from "../../../Types";
import {getInstance} from "../../../axios";


export default function ProductSalesTable() {
  const [products, setProducts] = useState<{
    name:any;
    total_sales: any;
    total_profit: any;
    inStock: any;
  }[]>()
  useEffect(() => {
    getInstance().get(`top-five-products`).then(
      (response) => {
        setProducts(response.data.data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setProducts]);

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
              <TableCell>Product Name </TableCell>
              <TableCell align="right">In Stock</TableCell>
              <TableCell align="right">Total Profit</TableCell>
              <TableCell align="right">Total Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product, key) => (
              <TableRow
                key={key}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.inStock}</TableCell>
                <TableCell align="right">{product.total_profit}</TableCell>
                <TableCell align="right">{product.total_sales}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

