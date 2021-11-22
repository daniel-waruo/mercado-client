import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button, Grid, TextField, Typography} from "@mui/material";
import {Customer} from "../../../Types";
import {getInstance} from "../../../axios";
import Router from "next/router";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  backgroundColor: 'primary.light',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem'
};


type OrderModalProps = {
  open: boolean,
  handleClose: () => void,
  initialCustomer?: Customer
}

function CustomerModal({open, handleClose, initialCustomer}: OrderModalProps) {
  let [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    email: '',
    businessName: '',
    location: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  useEffect(
    () => {
      // set initial product to state
      if (initialCustomer) setCustomer(initialCustomer)
    }, [setCustomer, initialCustomer?.id]
  )
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={
          (e) => {
            // @ts-ignore
            customer['business_name'] = customer.businessName
            if (!initialCustomer) {
              getInstance().post('customers/', customer).then(
                (response) => {
                  handleClose();
                  Router.reload();
                }
              ).catch(
                (error) => {
                  const res = error.response;
                  setErrors(res.data.non_field_errors);
                }
              )
            } else {
              getInstance().put(`customers/${initialCustomer.id}/`, customer).then(
                (response) => {
                  handleClose()
                  Router.reload();
                }
              ).catch(
                (error) => {
                  const res = error.response.data;
                  setErrors(res.data);
                }
              )
            }
            e.preventDefault();
          }
        }>
          <Box sx={style}>
            <Typography textAlign={'center'} fontWeight={'light'} sx={{paddingBottom: '2rem'}} variant={'h4'}>
              {initialCustomer ? 'Update Customer' : 'New Customer'}
            </Typography>
            <TextField
              fullWidth
              id="customer-name"
              sx={{marginY: '0.5rem'}}
              label="Name"
              defaultValue={initialCustomer?.name}
              onChange={
                (e) => {
                  // @ts-ignore
                  customer.name = e.target.value as string
                  setCustomer(customer)
                }
              }
              variant="outlined"/>
            <TextField
              fullWidth
              id="customer-business-name"
              sx={{marginY: '0.5rem'}}
              label="Business Name"
              defaultValue={initialCustomer?.businessName}
              onChange={
                (e) => {
                  // @ts-ignore
                  customer.businessName = e.target.value as string
                  setCustomer(customer)
                }
              }
              variant="outlined"/>
            <TextField
              fullWidth
              type={"email"}
              id="customer-email"
              sx={{marginY: '0.5rem'}}
              label="Email"
              defaultValue={initialCustomer?.email}
              onChange={
                (e) => {
                  // @ts-ignore
                  customer.email = e.target.value as string
                  setCustomer(customer)
                }
              }
              variant="outlined"/>
            <TextField
              fullWidth
              id="customer-phone"
              sx={{marginY: '0.5rem'}}
              label="Phone Number"
              defaultValue={initialCustomer?.phone}
              onChange={
                (e) => {
                  // @ts-ignore
                  customer.phone = e.target.value as string
                  setCustomer(customer)
                }
              }
              variant="outlined"/>
            <TextField
              fullWidth
              sx={{marginY: '0.5rem'}}
              id="customer-location"
              label="Location"
              defaultValue={initialCustomer?.location}
              onChange={
                (e) => {
                  // @ts-ignore
                  customer.location = e.target.value as string
                  setCustomer(customer)
                }
              }
              variant="outlined"/>
            <Grid container justifyContent={'center'} paddingY={'1rem'}>
              <Grid item>
                <Button type={'submit'} variant={'contained'}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </>
  );
}


export default CustomerModal;
