import * as React from 'react';
import {useEffect, useState} from 'react';
import Modal from '@mui/material/Modal';
import {Backdrop, CircularProgress, Fab, Grid, InputAdornment, TextField} from "@mui/material";
import {CartProduct, Product} from "../../../Types";
import {getInstance} from "../../../axios";
import {protocolFix} from "../../utils";
import ProductCard from "./ProductCard";
import {Box} from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import OrderCart from "./OrderCart";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';

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
  const [products, setProducts] = useState<Product[]>()
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  let [loading, setLoading] = useState(false)

  const fetchData = (link?: string) => {
    if (link) {
      link = protocolFix(link)
    }
    getInstance().get(link || 'products').then(
      (response) => {
        setProducts(response.data.results.slice(1, 3))
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
  const updateCart = (product: Product, quantity: int) => {
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
    setCartProducts([
      ...cartProducts.filter(
        ({product: {id}}) => id != product.id
      )
    ])
  }
  if (!open) return null

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={
          (e) => {
            setLoading(true)
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
            <Grid container spacing={2}>
              <Grid item xs={9}>
                <h1 style={{
                  textAlign: 'center',
                  fontWeight: 150
                }}>Order Products</h1>
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
                  style={{
                    width: "40%"
                  }}/>
                <Grid container spacing={2}>
                  {products?.map(
                    (product, index) => {
                      return (
                        <Grid item xs={6} md={3} key={index}>
                          <ProductCard product={product}
                                       selected={
                                         Boolean(cartProducts.find(({product: {id}}) => id == product.id))
                                       }
                                       removeFromCart={removeFromCart}
                                       addToCart={addToCart}/>
                        </Grid>
                      )
                    }
                  )}
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <OrderCart products={cartProducts}
                           addToCart={addToCart}
                           removeFromCart={removeFromCart}/>
              </Grid>
            </Grid>
            <Fab
              onClick={
                () => {
                  console.log(cartProducts)
                }
              }
              sx={{
                position: "fixed",
                right: 10,
                bottom: 10,
                margin: "2rem"
              }} color="primary" aria-label="add">
              <SendTwoToneIcon/>
            </Fab>
          </Box>
        </form>
      </Modal>
    </>
  );
}


export default AddOrderModal;
