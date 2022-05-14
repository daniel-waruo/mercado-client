import CardContent from "@mui/material/CardContent";
import {Grid, TextField, Typography} from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import {Box} from "@mui/system";
import {CartProduct, Product} from "../../../Types";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';

type OrderCartProps = {
  cartProducts?: CartProduct[],
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  updateCart: (product: Product,quantity:number) => void
}
const OrderCart = ({cartProducts, removeFromCart,updateCart}: OrderCartProps) => {

  return (
    <>
      <div style={{textAlign: "center"}}>
        <ShoppingCartTwoToneIcon sx={{fontSize: "6rem"}}/>
      </div>
      {
        cartProducts?.map(
          (cartProduct) => {
            return (
              <Card
                key={cartProduct.product.id}
                sx={{
                  minWidth: '100%',
                  borderRadius: '1rem',
                  paddingRight: "3rem",
                  paddingLeft: "0.3rem",
                  paddingBottom: "2rem",
                  position: "relative",
                  marginY:"0.5rem"
                }}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={12} lg={8}>
                      <Typography sx={{marginTop: '1rem'}} fontSize={18}>{cartProduct.product.name}</Typography>
                      <Typography sx={{marginTop: '1rem'}} fontWeight={'bold'} fontSize={16}>Ksh.{cartProduct.product.price}</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                      <TextField type={"number"}
                                 onChange={
                                   (e)=>{
                                     const quantity = e.target.value;
                                     updateCart(cartProduct.product, quantity as unknown as number);
                                   }
                                 }
                                 value={cartProduct.quantity}
                                 inputProps={{min: 1, step: 1}}
                                 label="Quantity" variant="standard"/>
                    </Grid>
                  </Grid>
                  <Box
                    onClick={
                      ()=>removeFromCart(cartProduct.product)
                    }
                    sx={{
                      position: 'absolute',
                      top: '1.8rem',
                      right: '0.3rem',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'error.light',
                      borderRadius: '100%',
                      height: '2.3rem',
                      width: '2.3rem',
                      textAlign: 'center',
                    }}
                  >
                    <HighlightOffTwoToneIcon sx={{
                      height: '100%',
                      width: '100%',
                      padding: '4px',
                      color: 'error.main'
                    }}/>
                  </Box>
                </CardContent>
              </Card>
            )
          }
        )
      }

    </>
  )
}

export default OrderCart
