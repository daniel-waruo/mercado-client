import * as React from 'react';
import {useState} from 'react';
import Modal from '@mui/material/Modal';
import {Backdrop, CircularProgress, Fab, Grid} from "@mui/material";
import {CartProduct, Customer, Product} from "../../../Types";
import {Box} from "@mui/system";
import OrderCart from "./OrderCart";
import ChooseCustomer from "./ChooseCustomer";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChooseProduct from "./ChooseProduct";
import {getInstance} from "../../../axios";
import Router from "next/router";

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


type AddOrderModalProps = {
  open: boolean,
  handleClose: () => void
}

function AddOrderModal({open, handleClose}: AddOrderModalProps) {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [customer, setCustomer] = useState<Customer>()
  const [showCustomer, setShowCustomer] = useState<boolean>()

  let [loading, setLoading] = useState(false)

  const addToCart = (product: Product) => {
    if (cartProducts.find(({product: {id}}) => id == product.id)) {
      return
    }
    setCartProducts([
      ...cartProducts,
      {
        product: product,
        quantity: 1
      }
    ])
  }
  const removeFromCart = (product: Product) => {
    setCartProducts([
      ...cartProducts.filter(
        ({product: {id}}) => id != product.id
      )
    ])
  }
  const updateCart = (product: Product, quantity: number) => {
    let products = [
      ...cartProducts.filter(
        ({product: {id}}) => id != product.id
      )
    ]
    products.push(
      {
        product: product,
        quantity
      })
    setCartProducts([...products])
  }
  if (!open) return null

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Backdrop
            sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={loading}
          >
            <CircularProgress color="inherit"/>
          </Backdrop>
          <Box sx={{

          }}>
            <Grid container spacing={2}>
              <Grid item xs={9}>
                {
                  cartProducts.length && showCustomer ?
                    <ChooseCustomer customer={customer} setCustomer={setCustomer}/>
                    :
                    <ChooseProduct cartProducts={cartProducts}
                                   addToCart={addToCart}
                                   removeFromCart={removeFromCart}/>
                }
              </Grid>
              <Grid item xs={3}>
                <OrderCart cartProducts={cartProducts}
                           updateCart={updateCart}
                           addToCart={addToCart}
                           removeFromCart={removeFromCart}/>
              </Grid>
            </Grid>
          </Box>
          {
            cartProducts.length && showCustomer ?
              <Fab
                onClick={
                  () => {
                    setShowCustomer(false)
                    setCustomer(undefined)
                  }
                }
                sx={{
                  position: "fixed",
                  left: 10,
                  bottom: 10,
                  margin: "2rem"
                }} color="secondary" aria-label="add">
                <ArrowBackIosIcon/>
              </Fab>
              : null
          }
          {
            cartProducts.length && !showCustomer ?
              <Fab
                onClick={
                  () => {
                    setShowCustomer(true)
                  }
                }
                sx={{
                  position: "fixed",
                  right: 10,
                  bottom: 10,
                  margin: "2rem"
                }} color="primary" aria-label="add">
                <ArrowForwardIosIcon/>
              </Fab>
              : null
          }
          {
            customer?.id ?
              <Fab
                onClick={
                  () => {
                    setLoading(true)
                    getInstance().post(
                      '/orders/',
                      {
                        items: cartProducts,
                        buyer: customer
                      }
                    ).then(
                      (response) => {
                        const data = response.data.results
                        Router.reload();
                      }
                    ).catch(
                      (error) => {
                        console.error(error)
                      }
                    ).finally(
                      () => setLoading(false)
                    )
                  }
                }
                sx={{
                  position: "fixed",
                  right: 10,
                  bottom: 10,
                  margin: "2rem"
                }} color="primary" aria-label="add">
                <ArrowForwardIosIcon/>
              </Fab>
              : null
          }
        </Box>
      </Modal>
    </>
  );
}


export default AddOrderModal;
