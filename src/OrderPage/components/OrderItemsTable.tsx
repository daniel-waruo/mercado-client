import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Chip} from "@mui/material";
import {Box} from "@mui/system";
import {OrderItem} from "../../../Types";

type TableProps = {
  items: OrderItem[]
}

export default function OrderItemsTable({items}: TableProps) {

  return (
    <Box sx={{paddingY: "3rem"}}>
      <TableContainer component={Box}>
        <Table sx={{width: '100%'}} aria-label="simple table">
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
            {items?.map((item) => (
              <TableRow
                key={item.id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell align="left">{item.product.sku}</TableCell>
                <TableCell align="left">{item.product.name}</TableCell>
                <TableCell align="left">
                  <Chip label={item.product.categoryName} variant="outlined" sx={{paddingX: '0.3rem'}}/>
                </TableCell>
                <TableCell align="left">Ksh {item.cost}</TableCell>
                <TableCell align="left">Ksh {item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

