import React, {useEffect, useState} from "react";
import {CartProduct, Product} from "../../../Types";
import {protocolFix} from "../../utils";
import {getInstance} from "../../../axios";
import {Grid, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";

type ChooseCustomerProps = {
  cartProducts: CartProduct[]
  addToCart: (product: Product) => void,
  removeFromCart: (product: Product) => void
}

const ChooseProduct = ({cartProducts, addToCart, removeFromCart}: ChooseCustomerProps) => {
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
    <>
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
    </>
  )
}

export default ChooseProduct;
