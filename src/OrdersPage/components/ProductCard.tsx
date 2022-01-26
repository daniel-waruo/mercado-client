import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Grid, lighten, Typography} from "@mui/material";
import {Box} from "@mui/system";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import {Product} from "../../../Types";

type DashboardCardProps = {
  product: Product
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  selected: boolean
}


export default function ProductCard({product,addToCart,removeFromCart,selected}: DashboardCardProps) {
  return (
    <Card
      onClick={() => {
        if (!selected) {
          addToCart(product)
        }
        else
          removeFromCart(product)
      }}
      sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        height: '100%',
        padding: "1rem"
      }}>
      <CardContent>
        <Box>
          <Grid container>
            <Grid item xs={11} >
              <Box sx={{padding: '1rem'}}>
                <Typography fontWeight={'light'} fontSize={12}>{product.name}</Typography>
                <Typography fontWeight={1000} fontSize={20}>{product.price}</Typography>
              </Box>
            </Grid>
            <Grid item xs={1} >
              <div style={{position: 'relative', height: '3rem'}}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '0',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'primary.light',
                    borderRadius: '100%',
                    height: '2.8rem',
                    width: '2.8rem',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircleTwoToneIcon sx={{
                    height: '100%',
                    width: '100%',
                    padding: '9px',
                    color: lighten('#9b7ddf', selected ? 0 : 0.6)
                  }}/>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
