import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Avatar, Button, Card, Chip} from "@mui/material";
import {Box} from "@mui/system";
import {Customer, Product} from "../../../Types";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {getInstance} from "../../../axios";
import {deleteItems} from "../../utils";

type TableProps = {
  toggleFunction: (product: Product) => void
}

export default function InventoryTable({toggleFunction}: TableProps) {
  const [products, setProducts] = useState<Product[]>()
  useEffect(() => {
    getInstance().get('products').then(
      (response) => {
        setProducts(response.data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setProducts]);

  return (
    <>
      <TableContainer component={Box}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"}>Sku</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Cost</TableCell>
              <TableCell align="left">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products?.map((product) => (
              <TableRow
                key={product.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">{product.sku}</TableCell>
                <TableCell align="left">{product.name}</TableCell>
                <TableCell align="left">
                  <Chip label={product.categoryName} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                </TableCell>
                <TableCell align="left">Ksh {product.cost}</TableCell>
                <TableCell align="left">Ksh {product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

