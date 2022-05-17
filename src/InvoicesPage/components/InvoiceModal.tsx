import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import {Order} from "../../../Types";
import {getInstance} from "../../../axios";
import Router from "next/router";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 300,
  overflow: 'auto',
  maxHeight: '95vh',
  backgroundColor: 'primary.light',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',
};


type OrderModalProps = {
  open: boolean,
  handleClose: () => void,
  order?: Order
}

function InvoiceModal({open, handleClose, order: initialOrder}: OrderModalProps) {
  let [order, setOrder] = useState<Order | undefined>(initialOrder);
  let [loading,setLoading] = useState(false)
  useEffect(
    () => {
      setOrder(initialOrder)
    }, [initialOrder?.id]
  )
  if (!open) return null

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
            setLoading(true)
            getInstance().put(`orders/${order?.id}/`, order).then(
              (response) => {
                handleClose()
                Router.reload();
              }
            ).catch(
              (error) => {
                const res = error.response.data;
                setOrder(res.data);
              }
            ).finally(
              ()=>setLoading(false)
            )
            e.preventDefault();
          }}
        >
          <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit"/>
          </Backdrop>
          <Box sx={style}>
            <Typography textAlign={'center'} fontWeight={'light'} variant={'h4'}>Update Order</Typography>
            <div style={{padding: '1rem'}}/>
            <FormControl fullWidth>
              <InputLabel id="select-status-label">Payment Method</InputLabel>
              <Select
                labelId="select-status-label"
                id="select-status"
                value={order?.payment_method}
                label="Payment Method"
                variant={'outlined'}
                onChange={
                  (e) => {
                    // @ts-ignore
                    setOrder({
                      ...order,
                      payment_method: e.target.value as string
                    })
                  }
                }
              >
                <MenuItem value={'m-pesa'}>M-Pesa</MenuItem>
                <MenuItem value={'on-delivery'}>On Delivery</MenuItem>
              </Select>
            </FormControl>
            <div style={{padding: '1rem'}}/>
            <FormControl fullWidth>
              <InputLabel id="select-status-label">Payment Status</InputLabel>
              <Select
                labelId="select-status-label"
                id="select-status"
                value={order?.payment_status}
                label="Payment Status"
                variant={'outlined'}
                onChange={
                  (e) => {
                    // @ts-ignore
                    setOrder({
                      ...order,
                      payment_status: e.target.value as string
                    })
                  }
                }
              >
                <MenuItem value={'success'}>Success</MenuItem>
                <MenuItem value={'failed'}>Failed</MenuItem>
                <MenuItem value={'pending'}>Pending</MenuItem>
              </Select>
            </FormControl>
            <div style={{padding: '1rem'}}/>
            <FormControl fullWidth>
              <InputLabel id="select-status-label">Order Status</InputLabel>
              <Select
                labelId="select-status-label"
                id="select-status"
                value={order?.status}
                label="Order Status"
                variant={'outlined'}
                onChange={
                  (e) => {
                    // @ts-ignore
                    setOrder({
                      ...order,
                      status: e.target.value as string
                    })
                  }
                }
              >
                <MenuItem value={'prep'}>Preparing</MenuItem>
                <MenuItem value={'ship'}>On Transit</MenuItem>
                <MenuItem value={'fin'}>Complete</MenuItem>
                <MenuItem value={'can'}>Cancelled</MenuItem>
              </Select>
            </FormControl>

            <Grid container justifyContent={'center'} paddingY={'1rem'}>
              <Grid item>
                <Button type={"submit"} variant={'contained'}>
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


export default InvoiceModal;
