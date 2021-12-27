import * as React from 'react';
import {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Card, Chip, Grid} from "@mui/material";
import {Box} from "@mui/system";
import {Product} from "../../../Types";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {getInstance} from "../../../axios";
import {deleteItems, protocolFix} from "../../utils";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type TableProps = {
  toggleFunction: (product: Product) => void
}

export default function InventoryTable({toggleFunction}: TableProps) {
  const [products, setProducts] = useState<Product[]>()
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  const fetchData = (link?: string) => {
    if (link) {
      link = protocolFix(link)
    }
    getInstance().get(link || 'products').then(
      (response) => {
        setProducts(response.data.results)
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
  }, [setProducts]);

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
              <TableCell align={"left"}>Sku</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Cost</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">In Stock</TableCell>
              <TableCell align="left" colSpan={2}/>
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
                <TableCell align="left">{product.inStock}</TableCell>
                <TableCell align="left">
                  <Button variant={'outlined'} onClick={() => toggleFunction(product)}>
                    <ModeEditOutlinedIcon/>
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant={'outlined'}
                    onClick={
                      () => {
                        if (product?.id) {
                          deleteItems('products', product.id)
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

