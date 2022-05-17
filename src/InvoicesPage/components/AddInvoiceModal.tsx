import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Modal from '@mui/material/Modal';
import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  lighten,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  TextFieldProps,
  Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {Customer, InvoiceItem} from "../../../Types";
import {Box} from "@mui/system";
import {PlusOne} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import {protocolFix} from "../../utils";
import {getInstance} from "../../../axios";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  overflow: 'auto',
  height: '95vh',
  backgroundColor: 'primary.light',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',
};


type AddInvoiceModalProps = {
  open: boolean,
  handleClose: () => void
}
const defaultInvoiceItem = {
  cost: 0,
  description: "",
  id: 0,
  invoice: 0,
  price: 0,
  product: undefined,
  quantity: 0
}

function AddInvoiceModal({open, handleClose}: AddInvoiceModalProps) {
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem []>([]);
  const [newInvoiceItem, setNewInvoiceItem] = useState<InvoiceItem>();
  const descriptionRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const invoiceText = {fontWeight: "lighter", color: lighten('rgb(0,0,0)', 0.5), fontSize: "1.5rem"};
  const [customers, setCustomers] = useState<Customer[]>([]);

  const fetchData = (link?: string) => {
    if (link) {
      link = protocolFix(link)
    }
    getInstance().get(link || 'customers').then(
      (response) => {
        setCustomers(response.data.results)
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

  const updateItem = (item: InvoiceItem, index: number) => {
    const updatedItems = invoiceItems;
    updatedItems[index] = item;
    setInvoiceItems(
      updatedItems
    )
  }
  const deleteItem = (index: number) => {
    const updatedItems = invoiceItems.filter((value, updateIndex, arr) => {
      console.log("update index " + updateIndex)
      console.log("normal index " + index)
      return index != updateIndex;
    });
    setInvoiceItems([
        ...updatedItems
      ]
    )
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={false}
          >
            <CircularProgress color="inherit"/>
          </Backdrop>
          <Box sx={{}}>
            <Typography variant={"h3"}
                        sx={{textAlign: "center", fontWeight: "lighter", paddingTop: "1.8rem"}}>Invoice</Typography>

            <Grid container justifyContent={"space-between"}>
              <Grid item md={4}>
                <Box sx={{paddingTop: "2rem"}}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={customers.map(
                      (customer) => ({
                        ...customer,
                        label: customer.name
                      })
                    )}
                    sx={{width: 300}}
                    renderInput={
                      (params: JSX.IntrinsicAttributes & TextFieldProps) => (
                        <TextField {...params} label={"Customer"} variant={"standard"} fullWidth>
                          <SearchIcon/>
                        </TextField>
                      )}
                  />
                </Box>
              </Grid>
            </Grid>
            <TableContainer component={Paper} sx={{
              backgroundColor: lighten("#f5f6fa", 0.6),
              marginY: "3rem",
              borderRadius: "1rem",
              boxShadow: "none",
              border: "none"
            }}>
              <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    invoiceItems.map(
                      (invoiceItem, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              onChange={
                                (e) => {
                                  updateItem({...invoiceItem, description: e.target.value}, index)
                                }
                              } defaultValue={invoiceItem.description} variant={"standard"}/>
                          </TableCell>
                          <TableCell>
                            <TextField onChange={
                              (e) => {
                                updateItem({...invoiceItem, price: Number(e.target.value)}, index)
                              }
                            } defaultValue={invoiceItem.price} variant={"standard"}/>
                          </TableCell>
                          <TableCell>
                            <TextField
                              onChange={
                                (e) => {
                                  updateItem({...invoiceItem, quantity: Number(e.target.value)}, index)
                                }
                              } defaultValue={invoiceItem.quantity} variant={"standard"}/>
                          </TableCell>
                          <TableCell>
                            <Button variant={"outlined"}
                                    color={"warning"}
                                    startIcon={<DeleteIcon/>}
                                    onClick={() => {
                                      deleteItem(index)
                                    }}>
                              DELETE
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  }
                  <TableRow>
                    <TableCell>
                      <TextField
                        inputProps={{
                          ref: descriptionRef,
                          className: "add-invoice-text"
                        }}
                        onChange={
                          (input) => {
                            let updatedItem = newInvoiceItem || defaultInvoiceItem
                            updatedItem.description = input.target.value
                            setNewInvoiceItem({...updatedItem});
                          }} label={'Item Description'} size={"small"}/>
                    </TableCell>
                    <TableCell>
                      <TextField
                        inputProps={{
                          ref: priceRef,
                          min: 0,
                        }}
                        onChange={
                          (input) => {
                            let updatedItem = newInvoiceItem || defaultInvoiceItem
                            updatedItem.price = Number(input.target.value)
                            setNewInvoiceItem({...updatedItem});
                          }} label={'Price'} type={"number"} size={"small"}/>
                    </TableCell>
                    <TableCell>
                      <TextField
                        inputProps={{
                          ref: numberRef,
                          min: 0,
                          step: 1,
                        }}
                        onChange={
                          (input) => {
                            let updatedItem = newInvoiceItem || defaultInvoiceItem
                            updatedItem.quantity = Number(input.target.value)
                            setNewInvoiceItem({...updatedItem});
                          }} label={'Quantity'} type={"number"} size={"small"}/>
                    </TableCell>
                    <TableCell>
                      <Button variant={"outlined"}
                              disabled={!newInvoiceItem}
                              startIcon={<PlusOne/>}
                              onClick={() => {
                                if (!newInvoiceItem) return
                                setInvoiceItems([
                                  ...invoiceItems,
                                  {
                                    description: newInvoiceItem.description,
                                    price: newInvoiceItem.price,
                                    quantity: newInvoiceItem.quantity,
                                  }
                                ])
                                if (descriptionRef.current) {
                                  descriptionRef.current.value = ""
                                }
                                if (priceRef.current) {
                                  priceRef.current.value = ""
                                }
                                if (numberRef.current) {
                                  numberRef.current.value = ""
                                }
                              }}>
                        ADD
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Grid container justifyContent={"right"}>
              <Grid item>
                <Box
                  sx={{
                    margin: "2rem",
                    fontSize: "1.5rem"
                  }}>
                  SubTotal - Ksh.1000
                </Box>
                <Box sx={{margin: "2rem"}}>
                  <TextField defaultValue={0} type={"number"} label={"Tax"} variant={"outlined"}/>
                </Box>
                <Box sx={{margin: "2rem"}}>
                  <TextField defaultValue={0} type={"number"} label={"Discount"} variant={"outlined"}/>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
}


export default AddInvoiceModal;
